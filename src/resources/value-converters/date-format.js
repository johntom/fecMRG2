// import moment from 'moment';

export class DateFormatValueConverter {
  toView(value) {
    // return moment(value).format('M/D/YYYY')// h:mm:ss a');

		//  let df = moment(value).format('YYYY-MM-DD')
 let df = moment(value).format('MM-DD-YYYY')

    return df	
  }
}