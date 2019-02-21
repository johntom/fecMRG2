// import numeral from 'numeral';

export class NumberFormatValueConverter {
  toView(value, format) {
    if (value === null || value === undefined || isNaN(value)) {
      return null;
    }
    return 1//numeral(value).format(format);
  }
}
