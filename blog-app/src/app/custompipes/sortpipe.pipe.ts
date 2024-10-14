import { Pipe, PipeTransform } from '@angular/core';
import { Blog } from '../classes/blog';

@Pipe({
  name: 'sortpipe'
})
export class SortpipePipe implements PipeTransform {

  transform(array:Blog[],order:string): Blog[] {
    console.log(array)
    let sorted;
    if(order === 'desc'){
      sorted = array.sort((a,b)=>{
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }else {
      sorted = array.sort((a,b)=>{
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
    }
    return sorted;
  }

}
