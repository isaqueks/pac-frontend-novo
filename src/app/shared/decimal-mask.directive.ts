import { Directive, HostListener, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[decimalMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DecimalMaskDirective),
      multi: true
    }
  ]
})
export class DecimalMaskDirective {
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.el.nativeElement.value = DecimalMaskDirective.formatToMask(value.toString());
    } else {
      this.el.nativeElement.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const raw = event.target.value;
    const masked = DecimalMaskDirective.formatToMask(raw);
    this.el.nativeElement.value = masked;

    // converte para número
    const num = DecimalMaskDirective.maskToNumber(masked);
    this.onChange(num);
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
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
