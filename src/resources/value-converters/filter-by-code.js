import { valueConverter } from 'aurelia-framework';
@valueConverter("filterByCode")
export class filterByCodeValueConverter {
  toView(array: {}[], property: string, exp: string) {
    if (array === undefined || array === null || property === undefined || exp === undefined) {
      return array;
    }
    return array.filter((item) => item["CodeType"] === exp)

  }
}