

import { valueConverter } from 'aurelia-framework';


@valueConverter("filterByCode") 
export class filterByCodeValueConverter {

  

  toView(array: {}[], property: string, exp: string) {

    if (array === undefined || array === null || property === undefined || exp === undefined) {
      return array;
    }
    //   console.log('exp,property', exp, property)
     // return array.filter((item) => item[property] === exp)
     return array.filter((item) =>   item["CodeType"] === exp)
    //  return array.filter((item) =>  {
    //    // console.log('ct ',item.CodeType)
    //     item.CodeType === exp
    //     })
   
  }
  }