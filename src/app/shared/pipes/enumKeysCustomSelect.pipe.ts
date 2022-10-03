import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'enumKeysCustom'})
export class EnumKeysCustomPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (var enumMember in value) {
      var isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
        keys.push({value: value[enumMember], label: value[enumMember]});
      }
    }
    return keys;
  }
}
