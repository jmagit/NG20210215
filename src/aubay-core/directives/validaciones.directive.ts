import { Directive, forwardRef, OnChanges, Input, SimpleChanges } from '@angular/core';
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

export const isEsNIF = (valor: string) => true;

@Directive({
  selector: '[esnif]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EsNIFValidator, multi: true }]
})
export class EsNIFValidator implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
      const valor = control.value;
      if (valor) {
          return isEsNIF(valor) ? { 'esnif': `${valor} no es un NIF` } : null;
      } else {
          return null;
      }
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

export const MIS_VALIDADORES = [ UpperCaseValidator, MinValidator, MaxValidator, EsNIFValidator ];
