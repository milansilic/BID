import { UntypedFormGroup } from "@angular/forms";

export class ValidationFormHelper {

    static validateUserBasicInfo(form: UntypedFormGroup) {
        return form.controls.userName.valid &&
            form.controls.dateOfBirth.valid &&
            form.controls.password.valid &&
            form.controls.role.valid &&
            form.controls.firstName.valid &&
            form.controls.lastName.valid &&
            form.controls.cellNumber.valid &&
            form.controls.email.valid &&
            form.controls.parentName.valid &&
            form.controls.bankAccount.valid;
    }

    static validateVehiclesGeneralInfo(form: UntypedFormGroup) {
        return form.controls.plateNumber.valid &&
            form.controls.regDate.valid &&
            form.controls.regPlace.valid &&
            form.controls.type.valid &&
            form.controls.capacity.valid &&
            form.controls.carryCapacity.valid &&
            form.controls.regExpiryDate.valid &&
            form.controls.licenseNumber.valid
    }
}
