
import { inject, singleton } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client'

// sample-layout-mrg
@inject(HttpClient)
export class ApiService {

  constructor(http) {
    this.http = http;
    this.upmess = ''
   
    this.baseweb = 'https://gtztest.com/api/'
  }


  getUserJwt(username, pass) {
    var token = {};
    token.username = username;
    token.password = pass;
    var url = this.baseweb + 'v1/auth/local';
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token)
    }).then((res) => res.json());

  }

  findInventory(search) {
    // search has fullu formed query string
    var url = this.baseweb + 'v1/inventorycontent' + search
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
    //return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  }
  findInventoryKeywords(search) {
    // search has fullu formed query string 
    // can only search for mutikeywords as a sep searcg
    let url
    url = this.baseweb + 'v1/findmultikeywords' + search
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());

  }
  findInventoryOne(inventorycode) {
    // search has fullu formed query string
    var url = this.baseweb + `v1/inventory/${inventorycode}`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
    //return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  }
  findInventoryorig(search) {
    var url = this.baseweb + 'v1/inventory';
    return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  }
  
  findusers() {
    var url = this.baseweb + 'v1/findusers';
    return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }
  // http://74.114.164.24/api/v1/artist
  findArtists() {
    var url = this.baseweb + 'v1/artist';
    return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }
  //http://localhost:8080/api/v1/artist
  findCodes() {
    var url = this.baseweb + 'v1/codes';
    return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }
  findOrgs() {
    var url = this.baseweb + 'v1/orgs';
    return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }

//1
  batchTransport(rec) {
    let url = this.baseweb + `v1/inventory/batchTransport`
    console.log('url ', url)
    // return {'data': true}
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }


  batchExhibit(rec) {
    let url = this.baseweb + `v1/inventory/batchExhibit`
    console.log('url ', url)
    // return {'data': true}
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

//3
  batchReproduction(rec) {
    let url = this.baseweb + `v1/inventory/batchReproduction`
    console.log('url ', url)
    // return {'data': true}
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }
//4
  batchProvenance(rec) {
    let url = this.baseweb + `v1/inventory/batchProvenance`
    console.log('url ', url)
    // return {'data': true}
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }
//5//2
//      <button id="factsheet1" action1() >Transport</button>
		// 			<button id="factsheet2" action2()">Exhibit</button>
		// 			<button id="factsheet3" action3()">Reproduction</button>
		// 			<button id="factsheet4" action4()">Provenance</button>
		// 			<button id="factsheet5" action5()">Mrglocation</button>
		// 			<button id="factsheet6" action6()">Templocation</button>
		// 			<button id="factsheet7" action8()">Offerings</button>
  batchMrglocation(rec) {
    let url = this.baseweb + `v1/inventory/batchMrglocation`
    console.log('url ', url)
    // return {'data': true}
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }
//6
  batchTemplocation(rec) {
    let url = this.baseweb + `v1/inventory/batchTemplocation` 
    console.log('url ', url)
    // return {'data': true}
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

//7 inventory/Transport Exhibit Reproduction Provenance batchMrglocation batchTemplocation batchOfferings
  addOfferings(offerings) {

    var url = this.baseweb + 'v1/inventory/offerings';
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(offerings)

    }).then((res) => res.json());

  }
  // batchOfferings(rec) {
  //   let url = this.baseweb + `v1/inventory/batchOfferings`
  //   console.log('url ', url)
  //   // return {'data': true}
  //   return this.http.fetch(url, {
  //     method: 'put',
  //     mode: 'cors',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //       // , 'Authorization': 'JWT ' + token
  //     },
  //     body: JSON.stringify(rec)
  //   }).then((res) => res.json());
  // }



  // getUsers() {
  //     var url = baseCms + 'http://jif.bergenrisk.com:8080/api/';
  //     return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  // }

  saveinventory(rec) {
    //alert('in saveclaim')
    let url = this.baseweb + `v1/inventory/update`
    console.log('url ', url)
    //return {'data': true}
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

  findinveall() {
    var url = this.baseweb + 'v1/case/findall'
    return this.http.fetch(url).then((res) => res.json())
  }
  findcase(roles, auth) {
    let url = this.baseweb + `v1/case/find/${auth.user.id}`
    return this.http.fetch(url).then((res) => res.json())
  }

  findcontents(content, completed) {
    console.log(' content  ', content, completed)
    let url = this.baseweb + `v1/case/findcontents/${content}/${completed}`
    return this.http.fetch(url).then((res) => res.json())
  }

  updatecase(row, user) {
    let newrow = {}
    newrow._id = row._id
    newrow.assignto = row.assignto
    newrow.billedamt = row.billedamt
    newrow.completed = row.completed
    newrow.payamt = row.payamt
    newrow.savedamt = row.savedamt
    newrow.template = row.template
    newrow.type = row.type
    newrow.memo = row.memo
    newrow.filename = row.filename
    newrow.createdAt = row.createdAt
    newrow.assignfrom = user.userid // matched staffid unless we use init
    let url = this.baseweb + `v1/case/update`
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(newrow)
    }).then((res) => res.json());

  }
  deletecase(row, token) {
    console.log('this.e ', row.id)
    let pid = row.id
    let url = this.baseweb + `v1/case/deletecase`///${pid}`
    // return this.http.fetch(url).then((res) => res.json())
    return this.http.fetch(url, {
      method: 'delete',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(row)
    }).then((res) => res.json());

  }
  updateUser2(user, token) { //token, customer) {

    let url = this.baseweb + `v1/staff/update`
    let umodel = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      templates: user.templates
    }
    console.log('user', umodel)
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(umodel)
    }).then((res) => res.json())

  }


  updateUser(user) {
    let umodel = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      templates: user.templates,
      password: user.password
    }
    console.log('user ', umodel)
    //   let url = this.baseweb + `v1/staff/updateuser`
    let url = this.baseweb + `v1/case/updateuser`
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(user)
    }).then((res) => res.json());

  }

  // savedlists 
  //  { method: ['get'], path: '/api/v1/savedlists/:id', handler: 'SavedlistsController.findone' },
  //   { method: ['get'], path: '/api/v1/savedlists', handler: 'SavedlistsController.findall' },
  //   { method: ['put'], path: '/api/v1/savedlists/update', handler: 'SavedlistsController.update' },
  //   { method: ['post'], path: '/api/v1/savedlists/create', handler: 'SavedlistsController.create' },


  findSavedlists() {
    //all
    var url = this.baseweb + 'v1/savedlists';
    return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  }

  updateSavedlists(slname, slids) {
    //all   this.api.updateSavedlists(this.appService.currentsavedlist, this.selectedids).then((jsonRes) => {

    var url = this.baseweb + `v1/savedlists/update/${slname}`;
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(slids)
    }).then((res) => res.json());


  }

  createSavedlists(slname) {
    //all http://74.114.164.24/api/v1/savedlists/create/ 
    let sl = {}
    var url = this.baseweb + `v1/savedlists/create/${slname}`;
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(sl)
    }).then((res) => res.json());
  }

  createFactSheet(rt2) {

    // { method: ['get'], path: '/api/v1/docx/create/:id', handler: 'DocxController.create' },
    // http://74.114.164.24/api/v1/docx/create/HOFMAN0015 
    //http://localhost:3000/api/v1/docx/create/HOFMAN0015
    var url = this.baseweb + `v1/docx/create/${rt2}`;
    return this.http.fetch(url, {
      method: 'get'

    }).then((res) => res.json());
  }

  walkdir() {
    let url = this.baseweb + 'v1/walkdir/getFiles'
    console.log('walkdir', url)
    return this.http.fetch(url).then((res) => res.json())
  }

  walkdirQF() {
    let url = baseweb + 'v1/walkdir/getFilesQF'
    return this.http.fetch(url).then((res) => res.json())
  }


  getLiability(s1, s2, s3) {
    //  var url = `http://localhost:8080/api/v1/wc/test/${s1}/${s2}/${s3}`;
    var url = this.baseweb + `v1/wc/test/${s1}/${s2}/${s3}`;
    return this.http.fetch(url).then((res) => res.json())
  }


}
