import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'techFormat',
  standalone: true
})
export class TechFormatPipe implements PipeTransform {
  transform(technologies: string[]): string {
    if (!technologies || technologies.length === 0) {
      return '';
    }
    
    if (technologies.length <= 3) {
      return technologies.join(', ');
    }
    
    return `${technologies.slice(0, 3).join(', ')} +${technologies.length - 3}`;
  }
}