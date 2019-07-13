// import moment from 'moment';

export class DateFormatisoValueConverter {
  toView(value) {
    // return moment(value).format('M/D/YYYY')// h:mm:ss a');
  // return moment(value).format('YYYY-MM-DD')// iso
return moment(value).format('MM-DD-YYYY')// iso

  }
}