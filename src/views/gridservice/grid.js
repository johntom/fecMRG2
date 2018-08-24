import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';

@inject(ApiService)

export class Grid {
  pageable = {
    refresh: true,
    pageSizes: true,
    buttonCount: 10
  };
  heading = 'Service Analysis...';
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        this.loadData()
          .then((inmates) => {
            console.log(' inv datasource ', inmates, inmates.length);// inv[0]);
            options.success(inmates);
          });
      },

    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        fields: {
          DOB: {
            type: "date"
          },
          bookingDate: {
            type: "date"
          },
          sentencingDate: {
            type: "date"
          },
          serviceDateFrom: {
            type: "date"
          },
          serviceDateTo: {
            type: "date"
          },
          serviceDays: {
            type: "number"
          },
          invocieinfo: {
            type: "string"
          },
          // approvedDate: {
          //   type: "date"
          // },
          // invDate: {
          //   type: "date"
          // },
          // treatmentDateFrom: {
          //   type: "date"
          // },
          // treatmentDateTo: {
          //   type: "date"
          // },


          
          // repricedAmt: {
          //   type: "number"
          // },
          // savings: {
          //   type: "number"
          // },
        }
      }
    },
    pageSize: 12,

  })
  constructor(api) {

    this.api = api


  }


  activate() {
    console.log('in activate')

  }

  loadData() {
    console.log('this.loadData ')

    let claim;
    return Promise.all([
      this.api.getInmatesServiceExpanded()

    ]).then(values => {
      this.inmates = values[0].data;
      claim = this.inmates;
      console.log('claim ', claim.length)
      return claim
    }).catch(error => {
      console.error("Error encountered while trying to get data.", error);
    });
  }
}


