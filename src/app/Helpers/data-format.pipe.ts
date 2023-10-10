import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFormPipe'
})
export class DataFormatPipe  extends DatePipe implements PipeTransform {

  override transform(value: any, args?: any): any {
    return super.transform(value,'DD/MM/YYYY hh:mm a');
  }

}
