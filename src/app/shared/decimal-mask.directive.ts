import { Directive, HostListener, ElementRef, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[decimalMask]',
})
export class DecimalMaskDirective {

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<number | null>();

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngOnChanges() {
    // quando [value] mudar, aplica formatação
    if (this.value !== undefined && this.value !== null) {
      this.el.nativeElement.value = DecimalMaskDirective.formatToMask(this.value.toString());
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const raw = event.target.value;

    const masked = DecimalMaskDirective.formatToMask(raw);
    this.el.nativeElement.value = masked;

    // emite número
    const num = DecimalMaskDirective.maskToNumber(masked);
    this.valueChange.emit(num);
  }


  // ----- formata -----
  static formatToMask(value: string): string {
    // remove tudo exceto números e vírgula
    value = value.replace(/[^0-9,]/g, '');

    const [intPart, decPart] = value.split(',');

    // formata parte inteira
    let int = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // junta
    return decPart !== undefined ? `${int},${decPart}` : int;
  }

  // ----- converte para número -----
  static maskToNumber(value: string): number | null {
    if (!value) return null;

    // remove pontos
    let clean = value.replace(/\./g, '');

    // troca vírgula por ponto
    clean = clean.replace(',', '.');

    const parsed = parseFloat(clean);
    return isNaN(parsed) ? null : parsed;
  }
}
