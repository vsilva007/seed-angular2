import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'enumKeys'})
export class EnumKeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (var enumMember in value) {
      var isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
        keys.push({key: enumMember, value: value[enumMember]});
      }
    }
    return keys;
  }
}
