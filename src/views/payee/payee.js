// import { MyDataService } from "../../services/my-data-service";
// @inject(ApiService, ApplicationService, MyDataService)
// @inject(Router, ApiService, UtilService, ApplicationService, MyDataService)
// import { Router, Redirect } from 'aurelia-router';
// import { UtilService } from '../../services/util-service';
// // import moment from 'moment';
import {
  ApiService
} from '../../utils/servicesApi';
import {
  inject
} from 'aurelia-dependency-injection';
import {
  Router
} from 'aurelia-router';
import {
  ApplicationService
} from '../../services/application-service';
import {
  bindable
} from 'aurelia-framework';

@inject(Router, ApiService, ApplicationService)

export class Payee {
  @bindable searchdoc
  pageable = {
    refresh: true,
    pageSizes: true,
    buttonCount: 10
  };
  heading = 'Payees...';
  metapayees = ['payeename', 'payeefein', 'payeeaddr', 'payeecity', 'payeestate', 'payeeaddr']

  // disabledbtn=false
  constructor(router, api, appService) {
    this.api = api
    this.appService = appService
    this.router = router
    // this.disabledbtn = true // leave on
    this.currentIndex = -1
    this.payeemode = 'update'
  }
  searchdocChanged(value) {
    if (value === "") {
      this.payees = this.allpayees
    } else {
      // this.payees = this.payees.filter((item) => {
      this.payees = this.allpayees.filter((item) => {
        for (let i in this.metapayees) {
          let md = this.metapayees[i]
          if (item[md] !== undefined) {
            // if (item[md].toLowerCase().search(value.toLowerCase()) != -1) return true
            if ((item[md]).toLowerCase().search(value.toLowerCase()) != -1) return true
          }
        }
      });
    }
    return
  }
  activate() {
    console.log('in activate')
    this.payees = this.appService.payeelist
    this.allpayees = this.payees
    for (let bk of this.payees) {
      bk.edit = false
    }
  }
  updateInmates(payee) {
    console.log('in updateInmates')
    this.api.updateInmates(payee)
      .then((jsonRes) => {
        this.updateinmatesmess = 'all inmate records are updated for ' + payee.payeename
      })
  }
  // // if update is clicked editstate=false if done is clicked editstate=true
  // changeColor(item) {
  //   alert(item.new);
  //   item.isSelected = !item.isSelected;
  // }

  // testDisabled(index) {
  // console.log('index ', index)
  // if (this.currentIndex===index) console.log('A MATCH')
  // }

  cancelPayee(payee, editstate, index) {
    payee.isSelected = false
    payee.edit = false //!editstate
    this.currentIndex = -1
    // 3 below does not work
    // payee = JSON.parse(JSON.stringify(this.currentPayee));
    // payee = JSON.stringify(this.currentPayee)
    // payee = this.currentPayee
    // does not work payee
    payee.payeename = this.currentPayee.payeename
    payee.payeefein = this.currentPayee.payeefein
    payee.payeeaddr = this.currentPayee.payeeaddr
    payee.payeecity = this.currentPayee.payeecity
    payee.payeestate = this.currentPayee.payeestate
    payee.payeezip = this.currentPayee.payeezip

  }


  editPayee(payee, editstate, rowindex) {
    this.currentIndex = rowindex

    for (let bk of this.payees) {
      bk.isSelected = false
    }
    payee.isSelected = true

    if (editstate) {
      this.payees[rowindex].isSelected = false
      this.currentIndex = -1
      if (this.payeemode === 'insert') {
        // create 
        this.api.addpayee(payee)
          .then((jsonRes) => {
            this.upmess = jsonRes
          })
        console.log(' await payeelist ', this.appService.payeelist)
        this.payeemode = 'update'
      } else {
        this.payeemode = 'update'
        // console 
        this.api.updatepayee(payee)
          .then((jsonRes) => {
            this.upmess = jsonRes
          }) // not sure where this came from .log(' call save payee')
        // if (JSON.stringify(this.currentPayee) === JSON.stringify(payee)) {
        //   this.message = 'You clicked save'
        //}
        // if (payee.payeecheckbox.checked) {
        if (payee.checkbox.checked) {
          console.log('in updateInmates')
          this.api.updateInmates(payee)
            .then((jsonRes) => {
              this.updateinmatesmess = 'all inmate records are updated for ' + payee.payeename
            })

          payee.checkbox.checked = false
        } else this.updateinmatesmess = ''


      }
    } else {
      // this.currentPayee = payee deep copy below
      this.currentPayee = JSON.parse(JSON.stringify(payee));
    }
    payee.edit = !editstate
  }

  addPayee() {
    // let payee = this.currentRecord

    //let item
    //let serviceDateFrom = moment().format('YYYY-MM-DD')
    let payeerec = {
      "payeename": '',
      "payeefein": '',
      "payeeaddr": '',
      "payeecity": '',
      "payeestate": '',
      "payeezip": '',
      "payeemode": 'insert'
    }
    this.payee.payeemode = 'insert'
    this.payees.unshift(payeerec)
    this.payees[0].isSelected = true
    this.payees[0].edit = true

  }
  // savePayee() {
  //   console.log(' call save ', this.currentRecord)// JSON.stringify(this.appService.currentItem) === JSON.stringify(this.appService.testrec)) //this.appService.currentClaim)
  //   this.message = 'You clicked save'
  //   // if (this.recordId === 'create') {
  //   //   this.api.addinmate(this.currentRecord)
  //   //   Promise.all(
  //   //     this.api.saveinmate(this.currentRecord).then((res) => this.close('inmates'))
  //   //   )
  //   // } else {
  //   //   this.api.saveinmate(this.currentRecord)
  //   // }
  // }

  close(path) {


    // let tab = this.appService.tabs.find(f => f.isSelected);
    // Next, we navigate to the newly created claim

    // Finally, we close out this tab
    // this.closeTab(tab);\
    let rt2
    this.closeTab
    if (path === undefined) {
      rt2 = `#/inmates`
    } else rt2 = `#/${path}`
    this.router.navigate(rt2);
  }
}

// for (const index of [1, 2, 3, 4, 5].keys()) {
// for (const [index, value] of [1, 2, 3, 4, 5].entries()) {
// for (const [index, value] of this.payees.entries()) {
//   console.log('index value', index, value)
//   value.isSelected = false
//   //  this.disabledbtn=true
//   console.log(rowindex, index)
//   if (index === rowindex) {
//     console.log('index value equal')
//     //  value.this.disabledbtn = true // leave on
//   } //else value.this.disabledbtn = false
//   // index===rowindex ?  this.disabledbtn=true : this.disabledbtn=false // leave on
// }
// for (let bk of this.payees) {
//          console.log('bk2 ', bk)
//         bk.isSelected = false 
//       //  this.disabledbtn=true
//       //  console.log(indexe,index)
//         // index===indexe ?  this.disabledbtn=true : this.disabledbtn=false // leave on
//       }
//  editstate ? this.payees[rowindex].isSelected = false : this.payees[rowindex].isSelected = true