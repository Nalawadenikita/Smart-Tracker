import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {

}



export function codeFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    const hasDigit = /[0-9]/.test(value);
    const hasAlphabet = /[a-zA-Z]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
    // const startsWithSpace = /^\s/.test(value);

    if (!hasDigit && !hasAlphabet && hasSpecialCharacter) {
      return { invalidCode: true };
    }

    // if (startsWithSpace) {
    //   return { startsWithSpace: true };
    // }

    return null;
  };
}

