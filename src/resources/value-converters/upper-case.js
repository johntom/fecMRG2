export class UpperCaseValueConverter {

      toView(value) {
           // return value.toUpperCase();

 if (value!==undefined) {
       console.log('case ',value)
   
       return value.toUpperCase();
      } else return value



    }
 
}