 import numeral from 'numeral';

    export class RoundFormatValueConverter {
      toView(value) {
        return numeral(value).format('(0,0.00)');
      }
    }
  