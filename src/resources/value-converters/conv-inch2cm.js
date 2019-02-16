import { valueConverter } from 'aurelia-framework';

@valueConverter("convInch2cm")
export class convInch2cmValueConverter {
  toView(value) {
    console.log('value', value)
    if (value === undefined || value === '') {
      value = 'none';
    }
    (value !== 'none') ? value = value+' in '+ value * 2.54 + ' cm ' : value
    return value
  }
}


