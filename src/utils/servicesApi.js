import {  inject,  singleton} from 'aurelia-dependency-injection';
import {  HttpClient } from 'aurelia-fetch-client'
// sample-layout-mrg
@inject(HttpClient)
export class ApiService {
  constructor(http) {
    this.http = http;
    this.upmess = ''
    //    this.baseweb = 'https://gtztest.com/api/' 
    this.baseweb = 'https://artbased.com/api/'
    /// https://gtztest.com/api/v1/inmate
    // https://gtztest.com/api/v1/getonePdf/:template/:filename
    this.basewebjif = 'https://jif.bergenrisk.com/api/';
    this.baseBB = 'https://buildings-207021.appspot.com/query'// bin/1022709

  }
  // getBB(bin) {
  //   let bod = { bin: bin, name: bin }
  //   console.log(bod)
  //   // var url = this.baseBB + `/bin/${bin}`;
  //   // var url = this.baseBB + `/bin?bin=${bin}`;
  //   var url = this.baseBB + `?bin=${bin}`;
  //   //var url = this.baseBB + '/bin'
  //   return this.http.fetch(url, {
  //     method: 'get', //post
  //     mode: 'no-cors',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'encoding': "application/x-www-form-urlencoded",
  //       'enctype': "application/x-www-form-urlencoded"
  //     }
  //     //, body: JSON.stringify(bod)
  //   }).then((res) => res.json());

  // }




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

  // mrg
  // https://artbased.com/api/v1/batchupdates

  findbatchupdates() {
    // search has fullu formed query string
    var url = this.baseweb + 'v1/batchupdates'// + search
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
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



  findContact(search) {
    // search has fullu formed query string
    var url = this.baseweb + 'v1/contactcontent' + search
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



  findContactOne(contactid) {
    // search has fullu formed query string
    var url = this.baseweb + `v1/contact/${contactid}`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());

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

  // all new 2019 AA methods

// https://artbased.com/api/v1/savedlists/getinventory/ { method: ['get'], path: '/api/v1/savedlists/getinventory/:id', handler: 'SavedlistsController.getinventory' },
   async findInventorySavedLists(search) {
    var url = this.baseweb + 'v1/savedlists/getinventory/' + search
    return await this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }

  async findArtistsContent(search) {
    var url = this.baseweb + 'v1/artistcontent' + search
    return await this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }
  async findArtistid(search) {
    var url = this.baseweb + 'v1/artist/' + search
    return await this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }
  async getCatalogsent(cat) {
    var url = this.baseweb + 'v1/catalog/getcatalogsent/' + cat
    return await this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }
 
  async findTodo(search) {
    var url = this.baseweb + 'v1/todo/'  + search// + cat
    return await this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }

  async updatetodo(rec) {
    let id = rec.id
    // var url = this.baseweb + `v1/todo/:${id}` // + cat
    var url = this.baseweb + `v1/todoupdate/`
    //"never pass id to put or post",
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

  async createtodo(rec) {
    var url = this.baseweb + 'v1/todo/' // + cat

    return await this.http.fetch(url, {
      method: 'post', mode: 'cors', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }
  // { method: ['put'], path: '/api/v1/todo/:id', handler: 'TodoController.customUpdate' },
  // { method: ['post'], path: '/api/v1/todo', handler: 'TodoController.create' },

  //  { method: ['post'], path: '/api/v1/artist/create', handler: 'ArtistController.create' },
  //  { method: ['put'], path: '/api/v1/artist/update', handler: 'ArtistController.update' },
  // async  updateartist(rec) {  
  //   let url = this.baseweb + `v1/artist/update`
  //   // console.log('url ', url)
  //      return await this.http.fetch(url, { method: 'put', mode: 'cors',headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //         },
  //     body: JSON.stringify(rec) }).then((res) => res.json())
  updateartist(rec) {
    // if(rec.id==='create')// on server logic
    let url = this.baseweb + `v1/artist/update`
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


  async insertartist(findvalue) {

    let url = this.baseweb + `v1/artist/create`
    return await this.http.fetch(url, {
      method: 'post', mode: 'cors', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(findvalue)
    }).then((res) => res.json())
  }
  async updateartistAA(rec) {

    if (rec.id === 'create') {
      let url = this.baseweb + `v1/artist/create`
      return await this.http.fetch(url, {
        method: 'post', mode: 'cors', headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rec)
      }).then((res) => res.json())
    } else {
      let url = this.baseweb + `v1/artist/update`
      return await this.http.fetch(url, {
        method: 'put', mode: 'cors', headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rec)
      }).then((res) => res.json())
    }

  }

  async createartist(rec) {
    let url = this.baseweb + `v1/artist/create`
    console.log('url ', url)
    return await this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }


  async findArtistsAA1() {


    var url = this.baseweb + 'v1/artist';
    return await this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  }

  async findArtistsAA() {
    var url = this.baseweb + 'v1/artist';
    let res = await this.http.fetch(url, { mode: 'cors' })
    return res.json()
  }
  async getCatalogsAA() {
    var url = this.baseweb + 'v1/catalog';
    let res = await this.http.fetch(url, { mode: 'cors' })
    return res.json()
  }
  async findCatalog(search) {
    // var url = this.baseweb + 'v1/inventorycontent' + search
    var url = this.baseweb + `v1/catalog/find${search}`;
    let res = await this.http.fetch(url, { mode: 'cors' })
    return res.json()
  }

  async findCatalogone(id) {
    // var url = this.baseweb + 'v1/inventorycontent' + search
    var url = this.baseweb + `v1/catalog/find/${id}`;
    let res = await this.http.fetch(url, { mode: 'cors' })
    return res.json()
  }

  // let response = await this.http.get(reposUrl);
  // this.repos = response.content
  // .sort((a, b) => b.stargazers_count - a.stargazers_count);
  // { method: ['get'], path: '/api/v1/findofferings/:id', handler: 'InventoryController.findofferings' },
  // https://artbased.com/api/v1/findofferings/5c14696ba3e3847c0f5a62c3
  async findofferings(id) {
    var url = this.baseweb + `v1/findofferings/${id}`;
    let res = await this.http.fetch(url, { mode: 'cors' });//.then((res) => res.json())
    return res.json()
  }


  async saveorg(rec) {
    //alert('in saveclaim')
    let url = this.baseweb + `v1/contact/update`
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

  async findorgOne(orgid) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/orgs/${orgid}`
    let res = await this.http.fetch(url, { mode: 'cors' });
    return res.json()
    // console.log('url ', url)
    // return this.http.fetch(url, {
    //   method: 'get',
    //   mode: 'cors'
    // }).then((res) => res.json());

  }

  async findorgOnemongo(orgid) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/orgs/findonemongo/${orgid}`
    let res = await this.http.fetch(url, { mode: 'cors' });
    return res.json()


  }



  findOrgs() {
    var url = this.baseweb + 'v1/orgs';
    return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  }

  async findContact(search) {
    // search has fullu formed query string
    var url = this.baseweb + 'v1/contactcontent' + search
    let res = await this.http.fetch(url, { mode: 'cors' });
    return res.json()

  }


  async findorgContacts(orgid) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/orgs/findcontacts/${orgid}`
    let res = await this.http.fetch(url, { mode: 'cors' });
    return res.json()
  }
  async findallorgs(search) {
    var url = this.baseweb + 'v1/orgs/findall' + search
    return await this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }

  // https://artbased.com/api/v1/orgs/findcontacts/1119



  // let response = await this.http.get(reposUrl);
  // this.repos = response.content
  //   .sort((a, b) => b.stargazers_count - a.stargazers_count);

  //  findArtists() {
  //     var url = this.baseweb + 'v1/artist/'
  //     console.log('url artist ', url)
  //     return this.http.fetch(url, {
  //       method: 'get',
  //       mode: 'cors'
  //     }).then((res) => res.json());
  //   }





  //http://localhost:8080/api/v1/artist
  findCodes() {
    var url = this.baseweb + 'v1/codes';
    return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  }
  addmediumsupport(rec) {
    let url = this.baseweb + `v1/codes/create`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

async createcontact(rec) {
    let url = this.baseweb + `v1/contact/create`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }


  //1
 async  batchTransport(rec) {
    let url = this.baseweb + `v1/inventory/batchTransport`
    console.log('url ', url)
    // return {'data': true}
    return await this.http.fetch(url, {
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


 async batchExhibit(rec) {
    let url = this.baseweb + `v1/inventory/batchExhibit`
    console.log('url ', url)
    // return {'data': true}
    return await this.http.fetch(url, {
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
 async batchReproduction(rec) {
   
    let url = this.baseweb + `v1/inventory/batchReproduction`
    console.log('url ', url,rec)
    // return {'data': true}
    return await this.http.fetch(url, {
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

  async batchExhibitUpdate(rec) {
    let url = this.baseweb + `v1/inventory/batchExhibitUpdate`
    console.log('url ', url)
    // return {'data': true}
    return await this.http.fetch(url, {
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
  batchReproductionUpdate(rec) {
    let url = this.baseweb + `v1/inventory/batchReproductionUpdate`
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
  createinventory(rec) {
    //alert('in saveclaim')
    let url = this.baseweb + `v1/inventory/create`
    console.log('url ', url)
    //return {'data': true}
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }
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

  async getbatchno() {
    // search has fullu formed query string
    var url = this.baseweb + 'v1/batch/'
    console.log('url ', url)
    return await this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());

  }
  // getbatchno() {
  //   // search has fullu formed query string
  //   var url = this.baseweb + 'v1/batch/'
  //   console.log('url ', url)
  //   return this.http.fetch(url, {
  //     method: 'get',
  //     mode: 'cors'
  //   }).then((res) => res.json());

  // }
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

  deleteSavedlists(slname, slids) {
    //all   this.api.updateSavedlists(this.appService.currentsavedlist, this.selectedids).then((jsonRes) => {

    var url = this.baseweb + `v1/savedlists/delete/${slname}`;
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


  // updateSavedlists(recid, rec) {
  //   let url = this.baseweb + `v1/savedlists/update/${recid}`
  //   console.log('url ', url)

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

  //  this.api.saveMerge(this.savedlist, this.editor.value())

  saveMerge(slname, editorval) {
    //all http://74.114.164.24/api/v1/savedlists/create/ 
    // let sl = {}
    let rec = { merge: editorval }
    var url = this.baseweb + `v1/savedlists/savemerge/${slname}`;
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
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

  addcodegenre(rec) {
    let sl = {}
    var url = this.baseweb + `v1/codes`;
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
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



  // inmates


  findPayees() {
    var url = this.baseweb + 'v1/payee/'
    console.log('url payee ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }




  updateInmates(rec) {
    let url = this.baseweb + `v1/inmate/updateinmates`
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
      //   body: rec
    }).then((res) => res.json());
  }
  updatepayee(rec) {
    //alert('in saveclaim')
    let url = this.baseweb + `v1/payee/update`
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
      //   body: rec
    }).then((res) => res.json());
  }

  addpayee(rec) {
    //alert('in saveclaim')
    console.log('addinmate rec', rec)
    let url = this.baseweb + `v1/payee/create`
    console.log('url ', url)
    //return {'data': true}
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

  getInmates() {
    var url = this.baseweb + 'v1/inmate/'
    console.log('url inmate ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }
  getInmatesExpanded() {
    var url = this.baseweb + 'v1/findallexpand/'
    console.log('url inmate ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }
  getInmatesServiceExpanded() {
    var url = this.baseweb + 'v1/findallserviceexpand/'
    console.log('url inmate ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }


  savecontact(rec) {
    //alert('in saveclaim')
    let url = this.baseweb + `v1/contact/update`
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

  addcontact(rec) {
    console.log('addcontact rec', rec)
    let url = this.baseweb + `v1/contact/create`
    console.log('url ', url)
    //return {'data': true}
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

  //  uploadPARKTOWER(formData,id) {
  //     //http://arabsight.github.io/uploading-files-with-aurelia
  //      let baseweb ='http://parktowergroupmanagement.com:9002/api/v1' 

  //     // var url = baseweb + `v1/uploadinventory/${id}`
  //     //  var url = baseweb + `gym/upload`
  //        var url = baseweb + `/uploadgym`
  //     ///  var url = this.basewebjif + `v1/upload/01-03166`

  //     console.log('url ', url, formData);
  //     return this.http.fetch(url, {
  //       mode: 'cors',
  //       method: 'POST',
  //       headers: {
  //         'enctype': "multipart/form-data"
  //       },
  //       body: formData

  //       // body: JSON.stringify(formData)
  //     }).then((res) => res.json());
  //       // .then(data => console.log('data.message', data.message))
  //       // .catch(error => console.log(error));
  //   }

  // this.baseweb = 'https://artbased.com/api/'

  upload(formData, id) {
    //http://arabsight.github.io/uploading-files-with-aurelia
    var url = this.baseweb + `v1/uploadinventory/${id}`
    ///  var url = this.basewebjif + `v1/upload/01-03166`

    console.log('url ', url, formData);
    return this.http.fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'enctype': "multipart/form-data"
      },
      body: formData

      // body: JSON.stringify(formData)
    }).then((res) => res.json());
    // .then(data => console.log('data.message', data.message))
    // .catch(error => console.log(error));
  }

  uploadinvphoto(formData, id) {
    //http://arabsight.github.io/uploading-files-with-aurelia
    var url = this.baseweb + `v1/uploadinvphoto/${id}`
    ///  var url = this.basewebjif + `v1/upload/01-03166`

    console.log('url ', url, formData);
    return this.http.fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'enctype': "multipart/form-data"
      },
      body: formData

      // body: JSON.stringify(formData)
    }).then((res) => res.json());
    // .then(data => console.log('data.message', data.message))
    // .catch(error => console.log(error));
  }


  uploadInvoice(formData, invoice) {
    //http://arabsight.github.io/uploading-files-with-aurelia
    var url = this.baseweb + `v1/uploadinvoice/${invoice.invno}`
    ///  var url = this.basewebjif + `v1/upload/01-03166`
    console.log('url ', url, formData);
    return this.http.fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'enctype': "multipart/form-data"
      },
      body: formData
      //body: json(formData)
      // body: JSON.stringify(formData)
    }).then((res) => res.json())
      .then(data => console.log('data.message', data.message))
      .catch(error => console.log(error));
  }


  // ============================== \\
  arprep() {
    var url = this.baseweb + 'v1/arprep/'
    console.log('url arprep ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }
  updatecode(row) {
    let url = this.baseweb + `v1/code/update`
    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(row)
    }).then((res) => res.json());

  }


  arprepDocument() {
    var url = this.baseweb + 'v1/arprep/'
    console.log('url arprep ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then(res => res.json().then(data => {
      console.log('arprep res.json() a=', data)
      let i
      for (i = 0; i < data.data.length; i++) {
        text += data.data[i].CLAIM_NO + "<br>";
        console.log('text', text)
      }
      return data
    }));
  }

  //  { method: ['get'], path: '/api/v1/arprepone/:id', handler: 'DailyController.arprepone' },
  arprepone(claimno) {
    var url = this.baseweb + 'v1/arprepone/' + claimno
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  adjusterprep() {
    var url = this.baseweb + 'v1/adjusterprep/'
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then(res => res.json());
    // }).then((res) => res.json());
  }

  //  { method: ['get'], path: '/api/v1/arprepone/:id', handler: 'DailyController.arprepone' },
  adjusterprepone(adjuster) {
    // var url = this.baseweb + 'v1/adjusterprepone/' + adjuster
    var url = this.baseweb + 'v1/adjusterprep/' + adjuster
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  getbatchno() {
    // search has fullu formed query string
    var url = this.baseweb + 'v1/batch/'
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());

  }

  saveDaily(rec, status) {
    let url = this.baseweb + `v1/daily/update`
    let i
    for (i = 0; i < rec.length; i++) {
      if (rec[i].$isSelected === true) {
        rec[i].INV_STATUS = status //0 // approved for billing 
      }
    }
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
  saveDailyforar(rec, status) {
    let url = this.baseweb + `v1/daily/updatepdf`
    console.log('saveDaily url ', url)
    let i
    for (i = 0; i < rec.length; i++) {
      if (rec[i].$isSelected === true) {
        rec[i].INV_STATUS = 1 // approved for billing
      }
    }

    return this.http.fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json())
  }

  // { method: ['get'], path: '/api/v1/walkpayments/:id', handler: 'WalkAdjusterdirController.walkpayments' },

  walkpayments(adjusterid) {
    var url = this.baseweb + `v1/walkpayments/${adjusterid}`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  walkinvoices(claimno) {
    var url = this.baseweb + `v1/walkinvoices/${claimno}`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  findCodes() {
    var url = this.baseweb + 'v1/codes';
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json())

  }



  createAR(dailies, claim, status) {
    // saveDailyforar is run first
    let url = this.baseweb + `v1/ar/create`
    console.log('createAR url status ', status, url)

    let detail = []
    let i
    for (i = 0; i < dailies.length; i++) {
      if (dailies[i].$isSelected === true) {
        let rec = {}
        rec.CLAIM_NO = dailies[i].CLAIM_NO
        rec.BILL_TIME = dailies[i].WORKTIME_BILLEDAPPROVED * 1
        rec.EXPENSE_BILLED = dailies[i].EXPENSE_BILLEDAPPROVED * 1
        rec.MILEAGE_BILLED = dailies[i].TRAVEL_APPROVED * 1 //TRAVEL_BILLEDAPPROVED //TRAVEL_APPROVED/
        rec.SERVICE = dailies[i].SERVICE.DESCRIPTION
        rec.EXPENSE = dailies[i].EXPENSE.DESCRIPTION
        rec.WORK_DATE = dailies[i].WORK_DATE
        rec.WORK_DESCRIPTION = dailies[i].WORK_DESCRIPTION
        rec.ADJUSTER_NOTES = dailies[i].ADJUSTER_NOTES
        rec.ADJUSTER = dailies[i].ADJUSTER.ADJUSTER_NAME
        rec.INV_STATUS = status;
        rec.AR_ID = 0;

        detail.push(rec)
      }
    }
    let newmodel = {
      Head: 'test',
      status: status,
      claim,
      details: detail
    }

    // let newmodel = { Head: 'test', claim: {claim}, dailies: dailies }
    //  let newmodel = { Head: 'test', claim, dailies: dailies }
    //  let newmodel = { Head: 'test', dailies: dailies }
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newmodel)
    }).then((res) => res.json());
  }
  findAR(claimno) {
    let url = this.baseweb + `v1/ar/${claimno}`

    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  saveDailyAdjuster(dailies, status, adjno, currentpayperiod) {
    console.log('params  ', status, adjno, currentpayperiod)
    let url = this.baseweb + `v1/adjusterpayment/create`
    console.log('createAR url ', url)
    // console.log('adjuster ', adjuster)
    let rec = {}
    let detail = []
    let i
    for (i = 0; i < dailies.length; i++) {
      // WORK_TIME_PAID EXPENSE_APPROVED EXPENSE_BILLEDAPPROVED TRAVEL_APPROVED EXPENSE_BILLEDAPPROVED 
      if (dailies[i].$isSelected === true) {
        rec.CLAIM_NO = dailies[i].CLAIM_NO
        rec.WORK_TIME_PAID = dailies[i].WORK_TIME_PAID
        rec.EXPENSE_APPROVED = dailies[i].EXPENSE_APPROVED
        rec.TRAVEL_APPROVED = dailies[i].TRAVEL_APPROVED
        rec.WORK_DATE = dailies[i].WORK_DATE
        rec.WORK_DESCRIPTION = dailies[i].WORK_DESCRIPTION
        rec.ADJUSTER_NOTES = dailies[i].ADJUSTER_NOTES
        rec.ADJUSTER = dailies[i].ADJUSTER.ADJUSTER_NAME
        rec.SERVICE = dailies[i].SERVICE.DESCRIPTION
        rec.EXPENSE = dailies[i].EXPENSE.DESCRIPTION
        rec.Claim = dailies[i].CLAIM
        rec.Aduster = dailies[i].ADJUSTER

        rec.ADJ_STATUS = status;
        rec.AR_ID = 0;
        // rec.Payperiod=currentpayperiod
        // rec[i].STATUS = 0;
        detail.push(rec)
      }
    }
    // let newmodel = { Head: 'test2', claim:claim, details: detail, adjuster: adjuster }
    let newmodel = {
      status: status,
      adjno: adjno,
      payperiod: currentpayperiod,
      details: detail
    }
    console.log('===============newmodel= ', newmodel)

    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newmodel)
    }).then((res) => res.json());
  }

  addDaily(rec, batchno) {

    let newrec // = {}
    let newarray = []
    let i = 0
    //let bno = batchno
    for (i = 0; i < rec.length; i++) {
      newrec = {}
      newrec.batchno = batchno;
      newrec.SERVICE = rec[i].SERVICE;
      newrec.EXPENSE = rec[i].EXPENSE;
      newrec.WORK_TIME = rec[i].WORK_TIME * 1;
      newrec.EXPENSE_AMT = rec[i].EXPENSE_AMT * 1;
      newrec.MILEAGE = rec[i].MILEAGE * 1;
      newrec.WORK_TIME_BILLED = rec[i].WORK_TIME;
      newrec.WORK_TIME_PAID = rec[i].WORK_TIME;
      newrec.WORKTIME_BILLEDAPPROVED = rec[i].WORK_TIME;
      newrec.WORK_TIME_CARRIER = rec[i].WORK_TIME;
      newrec.EXPENSE_APPROVED = rec[i].EXPENSE_AMT;
      newrec.EXPENSE_BILLEDAPPROVED = rec[i].EXPENSE_AMT;
      newrec.TRAVEL_APPROVED = rec[i].MILEAGE;
      newrec.TRAVEL_BILLEDAPPROVED = rec[i].MILEAGE;
      newrec.ADJUSTER_PAID = 0;
      newrec.ADJ_STATUS = 0;
      newrec.INV_STATUS = 0;
      newrec.STATUS = 0;
      newrec.AR_ID = 0;
      newrec.STATUS = 0;
      newarray.push(newrec)
    }

    var url = this.baseweb + 'v1/daily/create';
    //  console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newarray)

    }).then((res) => res.json());

  }
  addDailyEmbeded(rec) {
    // sames as above but writes to one embeded record not in use
    let dailies = []
    let i = 0
    for (i = 0; i < rec.length; i++) {
      rec[i].WORK_TIME = rec[i].WORK_TIME * 1;
      rec[i].EXPENSE_AMT = rec[i].EXPENSE_AMT * 1;
      rec[i].MILEAGE = rec[i].MILEAGE * 1;
      rec[i].WORK_TIME_BILLED = rec[i].WORK_TIME;
      rec[i].WORK_TIME_PAID = rec[i].WORK_TIME;
      rec[i].WORKTIME_BILLEDAPPROVED = rec[i].WORK_TIME;
      rec[i].WORK_TIME_CARRIER = rec[i].WORK_TIME;
      rec[i].EXPENSE_APPROVED = rec[i].EXPENSE_AMT;
      rec[i].EXPENSE_BILLEDAPPROVED = rec[i].EXPENSE_AMT;
      rec[i].TRAVEL_APPROVED = rec[i].MILEAGE;
      rec[i].TRAVEL_BILLEDAPPROVED = rec[i].MILEAGE;
      rec[i].ADJUSTER_PAID = 0;
      rec[i].ADJ_STATUS = 0;
      rec[i].INV_STATUS = 0;
      rec[i].STATUS = 0;
      rec[i].AR_ID = 0;
      rec[i].STATUS = 0;
      dailies.push(rec[i])
    }
    let newmodel = {
      Head: 'test',
      dailies: dailies
    }
    var url = this.baseweb + 'v1/daily/create';
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(rec)
      body: JSON.stringify(newmodel)
    }).then((res) => res.json());

  }
  //findclaim() {
  //   // http://localhost:8080/api/v1/claim
  //   var url = this.baseweb + 'v1/claimcontent';
  //   return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  // }
  findclaim(search) {
    // search has fullu formed query string
    var url = this.baseweb + 'v1/claimcontent/' + search
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
    //return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  }

  findclaimOne(claimid) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/claim/${claimid}`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());

  }

  //this.api.updateSavedlists(appService.currentsavedlist,this.selectedids).then((jsonRes) => {
  //    { method: ['get'], path: '/api/v1/savedlists/:id', handler: 'SavedlistsController.findone' },
  // { method: ['get'], path: '/api/v1/savedlists', handler: 'SavedlistsController.findall' },
  // { method: ['put'], path: '/api/v1/savedlists/update', handler: 'SavedlistsController.update' },
  // { method: ['post'], path: '/api/v1/savedlists/create', handler: 'SavedlistsController.create' },




  saveinsco(rec) {
    let url = this.baseweb + `v1/insurancecompany/update`
    console.log('url ', url)
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

  addinsco(rec) {
    //alert('in saveclaim')
    let url = this.baseweb + `v1/insurancecompany/create`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }



  // claimant
  findclaimantOne(claimantid) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/claimant/${claimantid}`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());

  }
  saveclaimant(rec) {
    let url = this.baseweb + `v1/claimant/update`
    console.log('url ', url)
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

  addclaimant(rec) {
    let url = this.baseweb + `v1/claimant/create`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

  // insured
  findinsuredOne(id) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/insured/${id}`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());

  }
  saveinsured(rec) {
    let url = this.baseweb + `v1/insured/update`
    console.log('url ', url)
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

  addinsured(rec) {
    let url = this.baseweb + `v1/insured/create`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }

  // http://jif.bergenrisk.com:8081/api/v1/adjuster
  findAdjusters() {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/adjuster`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }
  findMasrep() {
    // search has fullu formed query string  http://jif.bergenrisk.com:8081/api/v1/masrep/
    var url = this.baseweb + `v1/masrep`
    console.log('url findMasrep ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }
  findPayperiod() {
    // search has fullu formed query string  http://jif.bergenrisk.com:8081/api/v1/masrep/
    var url = this.baseweb + `v1/payperiod`
    console.log('url payperiod ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }
  //  findmarep() {
  //     var url = this.baseweb + `v1/marep`
  //     console.log('url ', url)
  //     return this.http.fetch(url, {
  //       method: 'get',
  //       mode: 'cors'
  //     }).then((res) => res.json());
  //   }
  // new
  findinsurancecompany() {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/insurancecompany`
    console.log('url insurancecompany ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  findinsurancecompanyquery(search) {
    // search has fullu formed query string  v1/claim/
    let url = this.baseweb + `v1/insurancecompanyquery/` + search
    console.log('url insurancecompany ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }


  findinvoicequery(search) {
    let url = this.baseweb + `v1/arcontent/` + search

    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json'
      //   // , 'Authorization': 'JWT ' + token
      // },
      // body: JSON.stringify(rec)
    }).then((res) => res.json());
  }


  findinsuredquery(search) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/insuredquery/` + search
    console.log('url insuredquery ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  finddailyquery(search) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/dailyquery/` + search
    console.log('url dailyquery ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }




  findclaimantquery(search) {
    // search has fullu formed query string  v1/claim/
    var url = this.baseweb + `v1/claimantquery/` + search
    console.log('url claimantquery ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }


  // { method: ['get'], path: '/api/v1/insuredquery', handler: 'InsuredController.search' },
  //   { method: ['get'], path: '/api/v1/claimantquery', handler: 'ClaimantController.search' },


  // http://jif.bergenrisk.com:8081/api/v1/insurancecompany


  // http://jif.bergenrisk.com:8081/api/v1/claimtype
  findclaimType() {
    var url = this.baseweb + `v1/claimtype`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }

  findinsured() {
    var url = this.baseweb + `v1/insured`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
  }
  // new
  //  findclaimant() {
  //     var url = this.baseweb + `v1/claimant`
  //     console.log('url ', url)
  //     return this.http.fetch(url, {
  //       method: 'get',
  //       mode: 'cors'
  //     }).then((res) => res.json());
  //   }






  findusers() {
    var url = this.baseweb + 'v1/findusers';
    return this.http.fetch(url, {
      mode: 'cors'
    }).then((res) => res.json())

  }

  findclaimlist() {
    var url = this.baseweb + 'v1/findclaim' // findclaim
    console.log('findclaimlist ', url)
    return this.http.fetch(url, {
      mode: 'cors'
    }).then((res) => res.json())

  }
  findexpense() {
    var url = this.baseweb + 'v1/findexpense';
    return this.http.fetch(url, {
      mode: 'cors'
    }).then((res) => res.json())

  }
  findservice() {
    var url = this.baseweb + 'v1/findservice';
    return this.http.fetch(url, {
      mode: 'cors'
    }).then((res) => res.json())

  }



  // getUsers() {
  //     var url = baseCms + 'http://jif.bergenrisk.com:8080/api/';
  //     return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

  // }

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
    let url = this.baseweb + `v1/case/deletecase` ///${pid}`
    // return this.http.fetch(url).then((res) => res.json())
    return this.http.fetch(url, {
      method: 'delete',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
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


  // gail
  loadClients(search) {
    // gail p clientsall
    if (search === undefined) {

      var url = this.baseweb + 'v1/clientsall'
    } else var url = this.baseweb + 'v1/clientsall' + search
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
    //return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  }

  findClient(search) {
    // search has fullu formed query string
    var url = this.baseweb + 'v1/clientcontent' + search
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
    //return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  }

  findClientOne(id) {
    // search has fullu formed query string
    var url = this.baseweb + `v1/client/${id}`
    console.log('url ', url)
    return this.http.fetch(url, {
      method: 'get',
      mode: 'cors'
    }).then((res) => res.json());
    //return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())
  }

  saveclient(rec) {
    //alert('in saveclaim')

    let url = this.baseweb + `v1/client/update`
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
  addclient(rec) {
    let url = this.baseweb + `v1/client/create`
    console.log('url ', url)
    //return {'data': true}
    return this.http.fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // , 'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(rec)
    }).then((res) => res.json());
  }


}


