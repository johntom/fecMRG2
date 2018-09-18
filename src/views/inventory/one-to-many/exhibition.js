import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
// import { Promptyn } from '../../../services/promptyn';
// import {Prompt} from '../../../services/prompt';
import { Prompt } from '../../../services/prompt';
 
// import { ynPrompt } from '../../../services/prompt';
@inject(ApiService, ApplicationService) 
// import { ynPrompt } from '../../../services/prompt';
export class Exhibition {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  constructor(api, appService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.testrec;
    console.log('this.currentItem  Exhibition', this.appService.currentItem);
  }

  activate(params, routeConfig) {
    this.repro = this.currentItem.reproduction
  }
  // remove(item) {
  //   alert('you are about to delete ' + item.ProvMemo)
  // }
  saveitem(item,index) {
    item.edit = !item.edit
   
  }
 
  remove(item, index) {
    //import { Prompt } from '../../../services/prompt';
 
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let exhibition = this.currentItem.exhibition
        exhibition.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response)//.output);
    });
  }


  selectChanged(reproid) {
    //  let insco = this.appService.InsurancecompanyList
    let aid = this.repro.findIndex(x => x._id === reproid)
    // let item = this.repro[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    this.currentItem.reproduction[aid].ExhibitRepro = reproid
  }

  addExhibit() {
    // addExhibit ExhibitSponser  ExhibitLocation ExhibitRepro ExhibitDates ExhibitSortDate Traveled ExhibitMemo
    let exhibition = this.currentItem.exhibition
    let flag = false
    let item
        if (exhibition === undefined) {
      flag = true
      exhibition = []
    }
    item = {
      addExhibit: '', ExhibitSponser: '', ExhibitLocation: '', ExhibitRepro: '',
      ExhibitDates: '', ExhibitSortDate: '',
      Traveled: '', ExhibitMemo: '', edit: true
    }


    exhibition.unshift(item)
    if (flag) this.currentItem.exhibition = exhibition
  }

}
// export classReproToIdValueConverter {
//   toView(repro, this.currentItem.reproduction) {
//     return repro ? repro.id : null;
//   }

//   fromView(id, users) {
//     return users.find(u => u.id === id);
//   }
// }
// <template>
//   <require from="debug"></require>

//   <select value.bind="group.users[0] | userToId:userService.users">
//     <option repeat.for="user of userService.users" model.bind="user.id">
//       ${user.firstName} ${user.lastName}
//     </option>
//   </select>

//   <debug></debug>
// </template>

//  activate(params, routeConfig) {
//     let rarray = []
//     //let 
//    // this.repro = this.currentItem.reproduction
//     let repro = this.currentItem.reproduction
//     // setup insured
//     let oid,i,repoobj
    // if ((this.currentItem.ExhibitRepro === undefined) || (this.repro === null)) {
    // if (repro === null) {
    // } else {
    //   //    oid = insured.findIndex(x => x._id === this.appService.currentClaim.INSURED_ID)
    //   // chnage INSURED_ID to _id
    //   // LOOP


    //   for (i = 0; i < repro.length; i++) {
    //    oid = repro.findIndex(x => x._id === this.currentItem.reproduction[i]._id)
    //       //   this.opt = this.currentItem.reproduction[i]
    //     this.currentItem.reproduction[i].ExhibitRepro = repro[oid].ReproductionTitle + '/' +repro[oid].ReproductionName
    //     // if (repoobj !== undefined) this.currentClaim.LEGAL_NAME = insuredobj.LEGAL_NAME
    //     //   if (repoobj !== undefined) this.currentItem.ExhibitRepro = repoobj.ReproductionTitle + '/' + repoobj.ReproductionName
    //     // if (this.currentItem.reproduction[i].repoobj !== undefined) this.currentItem.reproduction[i].ExhibitRepro =
    //     //   repoobj.ReproductionTitle + '/' + repoobj.ReproductionName
    //     // this.currentItem.reproduction[i].ExhibitRepro = repro[oid]
    //   }
    // }
    // this.repro = 
    // end setup insured
    // for (i = 0; i < repro.length; i++) { 
    //   rarray.push({repro[i]. })
    // }
    //
    //  "_id" : ObjectId("59d282b9b777d41f42a4fe26"), 
    // "ID" : 1.0, 
    // "InventoryID" : 259.0, 
    // "ExhibitID" : 4.0, 
    // "ReproductionType" : 34.0, 
    // "ReproductionTitle" : "Landscapes in Watercolor", 
    // "ReproductionPage" : "3-6", 
    // "ColorBW" : 35.0, 
    // "ReproductionDate" : 1985.0, 
    // "ReproductionSortDate" : "1985-01-01", 
    // "ReproductionName" : "essay by Agnes Gund", 
    // "ReproductionAuthor" : "Museum of Modern Art", 
    // "ReproductionLocation" : ""
    // if (params.id) {
    //   this.recordId = params.id; 
    //   this.heading = `DataForm for record ${this.recordId}`;
    //   console.log('this.recordId ', this.recordId);
    //   return this.api.findInventoryOne(this.recordId)
    //     .then((jsonRes) => {
    //       console.log('jsonRes ', jsonRes);          
    //       let inv = jsonRes.data;
    //       this.currentItem = inv[0];
    //       console.log('data-form:activate - currentItem', this.currentItem);
    //       this.inv = inv[0]
    //       // console.log('this.inv loadData 0 ', inv[0].InventoryCode);
    //       return inv
    //     });
    // }
  // }