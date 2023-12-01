import { UntypedFormGroup } from "@angular/forms";
import { OrdersModel } from "src/app/components/orders/orders.model";
import { UserModel } from "src/app/components/users/users.model";
import { CmrInsuranceModel, InsurancesModel, InsuranceTypeEnum, VehiclesModel } from "src/app/components/vehicles/vehicles.model";

export class FormMapHelper {


    static mapUserFormInfo(form: UntypedFormGroup): UserModel {
        let user = new UserModel();
        user.userBasicInfo.userName = form.value.userName;
        user.userBasicInfo.dateOfBirth = form.value.dateOfBirth;
        user.userBasicInfo.password = form.value.password;
        user.userBasicInfo.role = form.value.role;
        user.userBasicInfo.firstName = form.value.firstName;
        user.userBasicInfo.lastName = form.value.lastName;
        user.userBasicInfo.cellNumber = form.value.cellNumber;
        user.userBasicInfo.email = form.value.email;
        user.userBasicInfo.parentName = form.value.parentName;
        user.userBasicInfo.bankAccount = form.value.bankAccount;

        user.userContractInfo.workingStartDate = form.value.workingStartDate;
        user.userContractInfo.contractExpiryDate = form.value.contractExpiryDate;
        user.userContractInfo.healthInsuranceNumber = form.value.healthInsuranceNumber;
        user.userContractInfo.healthInsuranceDescription = form.value.healthInsuranceDescription;
        user.userContractInfo.healthInsuranceExpiryDate = form.value.healthInsuranceExpiryDate;

        user.userPersonalData.identificationNumber = form.value.identificationNumber;
        user.userPersonalData.placeOfBirth = form.value.placeOfBirth;
        user.userPersonalData.municipalityOfBirth = form.value.municipalityOfBirth;
        user.userPersonalData.address = form.value.address;
        user.userPersonalData.city = form.value.city;
        user.userPersonalData.country = form.value.country;

        user.idCard.idCardNumber = form.value.idCardNumber;
        user.idCard.idCardExpiryDate = form.value.idCardExpiryDate;

        user.passportUser.passportState = form.value.passportState;
        user.passportUser.passportNumber = form.value.passportNumber;
        user.passportUser.passportIssuedDate = form.value.passportIssuedDate;
        user.passportUser.passportExpiryDate = form.value.passportExpiryDate;
        user.passportUser.passportCity = form.value.passportCity;

        user.userDriverLicense.number = form.value.driverLicenseNumber;
        user.userDriverLicense.issuedDate = form.value.driverLicenseIssuedDate;
        user.userDriverLicense.expiryDate = form.value.driverLicenseExpiryDate;

        return user;
    }

    static mapVehicleFormInfo(form: UntypedFormGroup): VehiclesModel {
        let vehicle = new VehiclesModel();
        vehicle.generalVehicle.plateNumber = form.value.plateNumber;
        vehicle.generalVehicle.regDate = form.value.regDate;
        vehicle.generalVehicle.regPlace = form.value.regPlace;
        vehicle.generalVehicle.type = +form.value.type;
        vehicle.generalVehicle.capacity = +form.value.capacity;
        vehicle.generalVehicle.carryCapacity = +form.value.carryCapacity;
        vehicle.generalVehicle.regExpiryDate = form.value.regExpiryDate;
        vehicle.generalVehicle.licenseNumber = form.value.licenseNumber;

        vehicle.inspectionVehicle.tehnicalInspectionDate = form.value.tehnicalInspectionDate;
        vehicle.inspectionVehicle.tehnicalInspectionExpiryDate = form.value.tehnicalInspectionExpiryDate;
        vehicle.inspectionVehicle.sixMonthInspectionDate = form.value.sixMonthInspectionDate;
        vehicle.inspectionVehicle.sixMonthInspectionExpiryDate = form.value.sixMonthInspectionExpiryDate;
        vehicle.inspectionVehicle.ppdeviceSertificateExpiryDate = form.value.ppdeviceSertificateExpiryDate;
        vehicle.inspectionVehicle.ppdeviceSertificateIiexpiryDate = form.value.healthInsuranceNumber;
        vehicle.inspectionVehicle.tachographCertificateExpiryDate = form.value.tachographCertificateExpiryDate;
        vehicle.inspectionVehicle.firstAidexpiryDate = form.value.firstAidexpiryDate;

        vehicle.licenceVehicle.whiteCertificateNumber = form.value.whiteCertificateNumber;
        vehicle.licenceVehicle.whiteCertificateExpiryDate = form.value.whiteCertificateExpiryDate;
        vehicle.licenceVehicle.tirnumber = form.value.tirnumber;
        vehicle.licenceVehicle.tirexpiryDate = form.value.tirexpiryDate;

        vehicle.additionalInfoVehicle.producer = form.value.producer;
        vehicle.additionalInfoVehicle.model = form.value.model;
        vehicle.additionalInfoVehicle.color = form.value.color;
        vehicle.additionalInfoVehicle.chassisNumber = form.value.chassisNumber;
        vehicle.additionalInfoVehicle.engineNumber = form.value.engineNumber;
        vehicle.additionalInfoVehicle.yearOfProduction = +form.value.yearOfProduction;
        vehicle.additionalInfoVehicle.tireDimensions = form.value.tireDimensions;
        vehicle.additionalInfoVehicle.numberOfAxle = +form.value.numberOfAxle;
        vehicle.additionalInfoVehicle.garageNumber = form.value.garageNumber;
        vehicle.additionalInfoVehicle.tankCapacity = +form.value.tankCapacity;
        vehicle.additionalInfoVehicle.adrclassId = +form.value.adrclassId;

        vehicle.termoKingVehicle.termoKingMark = form.value.termoKingMark;
        vehicle.termoKingVehicle.termoKingType = form.value.termoKingType;

        vehicle.dimensionOfVehicle.length = +form.value.length;
        vehicle.dimensionOfVehicle.width = +form.value.width;
        vehicle.dimensionOfVehicle.height = +form.value.height;

        // TEMPORARY
        vehicle.cmrInsuranceId = 0;


        let insurance = new InsurancesModel();
        let cascoInsurance = new InsurancesModel();
        insurance.type = InsuranceTypeEnum.Mandatory;
        insurance.insuranceCompanyId = form.value.mandatoryInsuranceCompanyId;
        insurance.valueOfPremium = +form.value.mandatoryValueOfPremium;
        insurance.premiumGrade = +form.value.mandatoryPremiumGrade;
        insurance.policyNumber = form.value.mandatoryPolicyNumber;
        insurance.expiryDate = form.value.mandatoryExpiryDate;

        vehicle.insurances.push(insurance);

        if (form.value.cascoInsuranceCompanyId) {
            cascoInsurance.insuranceCompanyId = form.value.cascoInsuranceCompanyId;
            cascoInsurance.valueOfPremium = +form.value.cascoValueOfPremium;
            cascoInsurance.premiumGrade = +form.value.cascoPremiumGrade;
            cascoInsurance.policyNumber = form.value.cascoPolicyNumber;
            cascoInsurance.expiryDate = form.value.cascoExpiryDate;
            cascoInsurance.type = InsuranceTypeEnum.Casco;

            vehicle.insurances.push(cascoInsurance);
        }

        vehicle.proprietorship.purchasedFrom = form.value.purchasedFrom;
        vehicle.proprietorship.monthlyPayment = form.value.monthlyPayment;
        vehicle.proprietorship.purchaseDate = form.value.purchaseDate;
        vehicle.proprietorship.kilometersGuarantyExpiry = +form.value.kilometersGuarantyExpiry;
        vehicle.proprietorship.value = +form.value.value;
        vehicle.proprietorship.valueWithoutVat = +form.value.valueWithoutVat;
        vehicle.proprietorship.guarantyExpiryDate = form.value.guarantyExpiryDate;
        vehicle.proprietorship.serviceCompanyName = form.value.serviceCompanyName;
        vehicle.proprietorship.warranty = form.value.warranty;
        vehicle.proprietorship.warrantyNumberOfMonth = form.value.warrantyNumberOfMonth;
        vehicle.proprietorship.contractNumber = form.value.contractNumber;
        vehicle.proprietorship.contractExpiryDate = form.value.contractExpiryDate;

        return vehicle;
    }


    static mapOrderFormInfo(form: UntypedFormGroup): OrdersModel {
        let order = new OrdersModel();

        return order;
    }
}