import { ZonesValidator } from "./longeur-minimum.component";
import { AbstractControl } from '@angular/forms';

describe('Zone Validator', () => {
    /* #region  test longeur minimum */
    it('une chaîne avec 10 espaces est invalide', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: "          " };
        let result = validator(control as AbstractControl);

        expect(result).toBeTruthy();
    });

    it('une phrase avec des mots est valide', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: "Vive angular" };
        let result = validator(control as AbstractControl);

        expect(result).toBeNull();
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide ', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: " je le veux " };
        let result = validator(control as AbstractControl);

        expect(result).toBeNull();
    });

    it('une phrase avec 1 espace et 2 caractères est invalide. ', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: "xx" };
        let result = validator(control as AbstractControl);

        expect(result).toBeTruthy();
    });

    it('une phrase avec 2 espaces et 1 caractère est invalide ', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: "  x" };
        let result = validator(control as AbstractControl);

        expect(result).toBeTruthy();
    });

    it('une phrase avec 3 espaces et 3 caractères est valide ', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: "   xxx" };
        let result = validator(control as AbstractControl);

        expect(result).toBeNull();
    });

    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: " xxxxx " };
        let result = validator(control as AbstractControl);

        expect(result).toBeNull();
    });

    it('valeur invalide null pour la plage entre plus de 3 caracteres', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let control = { value: null };
        let result = validator(control as AbstractControl);

        expect(result).toBeTruthy();
    });

    /* #endregion */

    /* #region  test longeur maximum */
    it('une chaîne avec 1 caractere est valide pour le nom', () => {
        let validator = ZonesValidator.longueurMaximum(50);
        let control = { value: "x" };
        let result = validator(control as AbstractControl);

        expect(result).toBeNull();
    });

    it('une chaîne avec 50 caractere est valide pour le nom', () => {
        let validator = ZonesValidator.longueurMaximum(50);
        let control = { value: "x".repeat(50) };
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('une chaîne avec 3 espace est invalide pour le nom', () => {
        let validator = ZonesValidator.longueurMaximum(50);
        let control = { value: ''.repeat(3) };
        let result = validator(control as AbstractControl);
        expect(result).toBeTruthy();
    });

    it('une chaîne avec 3 espace est invalide pour le nom', () => {
        let validator = ZonesValidator.longueurMaximum(50);
        let control = { value: ''.repeat(3) };
        let result = validator(control as AbstractControl);
        console.trace(result.error);
        expect(result).toBeTruthy();
    });
    /* #endregion */


});