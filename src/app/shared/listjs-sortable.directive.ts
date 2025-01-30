  import {Directive, EventEmitter, Input, Output} from '@angular/core';

  export type SortColumn<T = any> = keyof T | '';
  export type SortDirection = 'asc' | 'desc' | '';
  const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

  export interface listSortEvent<T = any> {
    column: SortColumn<T>;
    direction: SortDirection;
  }

  @Directive({
    selector: 'th[listsortable]',
    host: {
      '[class.asc]': 'direction === "asc"',
      '[class.desc]': 'direction === "desc"',
      '(click)': 'rotate()'
    }
  })
  export class NgbdListSortableHeader {

    @Input() listsortable: SortColumn = '';
    @Input() direction: SortDirection = '';
    @Output() listsort = new EventEmitter<listSortEvent>();

    rotate() {
      this.direction = rotate[this.direction];
      this.listsort.emit({column: this.listsortable, direction: this.direction});
    }
  }
