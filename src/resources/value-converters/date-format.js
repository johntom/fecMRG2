// import moment from 'moment';

export class DateFormatValueConverter {
  toView(value) {
    // return moment(value).format('M/D/YYYY')// h:mm:ss a');

 let df = moment(value).format('YYYY-MM-DD') // must use
////  let df = moment(value).format('MM-DD-YYYY')
//console.log('df '+df)
    return df	
  }
}