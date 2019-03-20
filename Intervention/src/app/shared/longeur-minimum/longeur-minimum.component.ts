import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ZonesValidator{
    static longueurMinimum (longeurMinimum : number): ValidatorFn{
        return (longueur: AbstractControl): {[key: string]: boolean} | null =>{
            if(longueur.value != null){
                if((longueur.value.trim().length >= longeurMinimum)){
                    return null;
                }
            }
            return {'plageInvalide' : true};
        };
    }
}