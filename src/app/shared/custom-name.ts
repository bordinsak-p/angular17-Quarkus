import { AbstractControl } from '@angular/forms'

const REX_NAME = /([A-Z])([a-z])+/;

export function customeName(control: AbstractControl): { [key: string]: boolean } | null {
    const name = control.value;
    if(!REX_NAME.test(name)) {
        return { name: true }
    }
    return null
}