
export class SocialFormatValueConverter {
  toView(value) {
      //console.log('ss ',value)
   
     if (value!==undefined) {
       console.log('ss ',value)
   
     return (value.slice(0,3)+'-'+value.slice(3,5)+'-'+value.slice(5,9))//.format('(000-00-0000)');
      } else return value
  }
}