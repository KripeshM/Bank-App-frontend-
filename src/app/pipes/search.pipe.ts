import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(transaction:any[],searchKey:string,propName:string): any[] {
    const result:any=[];
    if(!transaction||searchKey==''||propName==''){
      return transaction;
    }
    transaction.forEach((trans:any)=>{
      if(trans[propName].trim().toLowerCase().startsWith(searchKey.trim().toLowerCase())){
        result.push(trans)
      }
    })
    return result;
  }

}
