import { Directive, forwardRef, OnChanges, Input, SimpleChanges, ElementRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';

export const isUpperCase = (valor: string) => valor !== valor.toUpperCase();

@Directive({
  selector: '[uppercase]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UpperCaseValidator, multi: true }]
})
export class UpperCaseValidator implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
      const valor = control.value;
      if (valor) {
          return isUpperCase(valor) ? { 'uppercase': `${valor} debe estar en mayusculas` } : null;
      } else {
          return null;
      }
  }
}

export function NIFValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) { return null; }
      const err = { nif: { invalidFormat: true, invalidChar: true } };
      if (/^\d{1,8}\w$/.test(control.value)) {
          const letterValue = control.value.substr(control.value.length - 1);
          const numberValue = control.value.substr(0, control.value.length - 1);
          err.nif.invalidFormat = false;
          return letterValue.toUpperCase() === 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numberValue % 23)
              ? null : err;
      } else { return err; }
  };
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[nif][formControlName],[nif][formControl],[nif][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NIFValidatorDirective, multi: true }]
})
export class NIFValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } {
      return NIFValidator()(control);
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[type][formControlName],[type][formControl],[type][ngModel]',
  providers: [
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => TypeValidatorDirective), multi: true }
  ]
})
export class TypeValidatorDirective implements Validator {
  constructor(private elem: ElementRef) { }
  validate(control: AbstractControl): { [key: string]: any } {
      const valor = control.value;
      if (valor) {
        const dom = this.elem.nativeElement;
        if (dom.validity) { // dom.checkValidity();
          return dom.validity.typeMismatch ? { 'type': dom.validationMessage } : null;
        }
      }
      return null;
  }
}
export const MIN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidator),
  multi: true
};
@Directive({
  selector: '[min][formControlName],[min][formControl],[min][ngModel]',
  providers: [MIN_VALIDATOR],
  host: { '[attr.min]': 'min ? min : null' }
})
export class MinValidator implements Validator,
  OnChanges {
  private _validator !: ValidatorFn;
  private _onChange !: () => void;
  @Input() min !: string;
  ngOnChanges(changes: SimpleChanges): void {
      if ('min' in changes) {
          this._createValidator();
          if (this._onChange) { this._onChange(); }
      }
  }
  validate(control: AbstractControl): ValidationErrors | null {
      return this.min == null ? null : this._validator(control);
  }
  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
      this._validator = Validators.min(parseInt(this.min, 10));
  }
}

export const MAX_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidator),
  multi: true
};
@Directive({
  selector: '[max][formControlName],[max][formControl],[max][ngModel]',
  providers: [MAX_VALIDATOR],
  host: { '[attr.max]': 'max ? max : null' }
})
export class MaxValidator implements Validator,
  OnChanges {
  private _validator !: ValidatorFn;
  private _onChange !: () => void;
  @Input() max !: string;
  ngOnChanges(changes: SimpleChanges): void {
      if ('max' in changes) {
          this._createValidator();
          if (this._onChange) { this._onChange(); }
      }
  }
  validate(control: AbstractControl): ValidationErrors | null {
      return this.max == null ? null : this._validator(control);
  }
  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private _createValidator(): void {
      this._validator = Validators.max(parseInt(this.max, 10));
  }
}

export const MIS_VALIDADORES = [ UpperCaseValidator, MinValidator, MaxValidator, NIFValidatorDirective, TypeValidatorDirective ];
