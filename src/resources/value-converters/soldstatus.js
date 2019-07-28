export class SoldstatusValueConverter {
  toView(text) {
  console.log('Sold',text)  
    if (text) {
       if (text==='-1') text='Yes'
       if (text==='0') text='No'
       if (text==='1') text='DON'
       if (text==='2') text='NFS'
       
      return text;
    }
  }
  //  count = 0;

  // increment() {
  //   this.count++;
  // }
}
// export class CapitalizeValueConverter {
//   toView(text) {
//     if (text) {
//       return text.charAt(0).toUpperCase() + text.slice(1);
//     }
//   }
// }