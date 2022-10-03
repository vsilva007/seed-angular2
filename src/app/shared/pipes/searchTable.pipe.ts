import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'searchTable'})
export class SearchTablePipe implements PipeTransform {
  transform(items: any, parameters: string[], search: string) : any {
    if(items === null || search === undefined || parameters === undefined) return items;
    return items.filter(item => parameters.some(k => item[k['property']].includes(search.toLowerCase())));
  }
}
