
export class VehicleGridModel {
    id: number;
    plateNumber: string;
    vehicleType: string;
    regDate: Date;

    constructor(id: number, plateNumber: string, vehicleType: number, regDate: Date) {
        this.id = id;
        this.plateNumber = plateNumber;
        this.vehicleType = VehicleTypeEnum[vehicleType];
        this.regDate = regDate;
    }
}

export class VehiclesModel {
    id: number;
    companyId: number;
    generalVehicle: GeneralVehiclesModel;
    inspectionVehicle: InspectionVehiclesModel;
    licenceVehicle: LicenceVehiclesModel;
    additionalInfoVehicle: AdditionalInfoVehiclesModel;
    termoKingVehicle: TermoKingVehiclesModel;
    dimensionOfVehicle: DimensionOfVehiclesModel;
    cmrInsuranceId: number;
    insurances: Array<InsurancesModel>;
    proprietorship: ProprietorshipModel;
    dateCreated: Date;
    dateModified: Date;

    constructor() {
        this.id = this.id;
        this.companyId = this.companyId;
        this.generalVehicle = new GeneralVehiclesModel();
        this.inspectionVehicle = new InspectionVehiclesModel();
        this.licenceVehicle = new LicenceVehiclesModel();
        this.additionalInfoVehicle = new AdditionalInfoVehiclesModel();
        this.termoKingVehicle = new TermoKingVehiclesModel();
        this.dimensionOfVehicle = new DimensionOfVehiclesModel();
        this.insurances = new Array<InsurancesModel>();
        this.proprietorship = new ProprietorshipModel();
        this.dateCreated = new Date();
        this.dateModified = new Date();
    }
}

export class GeneralVehiclesModel {
    plateNumber: string;
    regDate: Date;
    regPlace: string;
    type: number;
    capacity: number;
    carryCapacity: number;
    regExpiryDate: Date;
    licenseNumber: string;
}

export class InspectionVehiclesModel {
    tehnicalInspectionDate: Date;
    tehnicalInspectionExpiryDate: Date;
    sixMonthInspectionDate: Date;
    sixMonthInspectionExpiryDate: Date;
    ppdeviceSertificateExpiryDate: Date;
    ppdeviceSertificateIiexpiryDate: Date;
    tachographCertificateExpiryDate: Date;
    firstAidexpiryDate: Date;
}

export class LicenceVehiclesModel {
    whiteCertificateNumber: string;
    whiteCertificateExpiryDate: Date;
    tirnumber: string;
    tirexpiryDate: Date;
}

export class AdditionalInfoVehiclesModel {
    producer: string;
    model: string;
    color: string;
    chassisNumber: string;
    engineNumber: string;
    yearOfProduction: number;
    tireDimensions: string;
    numberOfAxle: number;
    garageNumber: string;
    tankCapacity: number;
    adrclassId: number;
}

export class TermoKingVehiclesModel {
    termoKingMark: string;
    termoKingType: string;
}

export class DimensionOfVehiclesModel {
    length: number;
    width: number;
    height: number;
}

export class CmrInsuranceModel {
    id: number;
    companyId: number;
    insuranceCompanyId: number;
    valueOfPremium: number;
    number: string;
    expiryDate: Date;
    dateCreated: Date;
    dateModified: Date;
}

export class InsurancesModel {
    id: number;
    type: number;
    insuranceCompanyId: number;
    expiryDate: Date;
    valueOfPremium: number;
    premiumGrade: number;
    policyNumber: string;
    dateCreated: Date;
    dateModified: Date;
}

export class ProprietorshipModel {
    id: number;
    type: number;
    purchasedFrom: Date;
    monthlyPayment: number;
    purchaseDate: Date;
    kilometersGuarantyExpiry: number;
    value: number;
    valueWithoutVat: number;
    guarantyExpiryDate: Date;
    serviceCompanyId: number;
    serviceCompanyName: string;
    warranty: string;
    warrantyNumberOfMonth: string;
    contractNumber: string;
    contractExpiryDate: Date;
    dateCreated: Date;
    dateModified: Date;
}

export enum VehicleTypeEnum {
    Truck = 1,
    Trailer,
    Van,
    Car,
}

export enum ProprietorshipTypeEnum {
    Own = 1,
    Leasing
}

export enum ADRClassEnum {
    I = 1,
    II = 2,
    III = 3,
    IV = 4,
    V = 5,
    VI = 6,
    VII = 7,
    VIII = 8,
    IX = 9
}

export enum InsuranceTypeEnum {
    Mandatory = 1,
    Casco = 3
}