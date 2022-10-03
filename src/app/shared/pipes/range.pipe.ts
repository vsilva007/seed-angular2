import {PipeTransform, Pipe} from "@angular/core";

@Pipe({name: 'range'})
export class RangePipe implements PipeTransform {
  transform(value, index: any) : any {
    let res = [];
    if(value > 7){
      let minValue = (index > 4) ? index - 4 : 0;
      let maxValue = ((index + 4 < value) ?  index + ((index < 4) ? 8 - index : 4): value);
      for (let i = minValue; i < maxValue; i++) {
        res.push(i);
      }
    }else{
      for (let i = 0; i < value; i++) {
        res.push(i);
      }
    }
    return res;
  }
}
