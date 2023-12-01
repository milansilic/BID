
export class UserGridModel {
    id: number;
    name: string;
    role: string;

    constructor(id: number, firstName: string, lastName: string, role: number) {
        this.id = id;
        this.name = `${firstName} ${lastName}`;
        this.role = RolesEnum[role];
    }
}

export class UserModel {
    id: number;
    userBasicInfo: UserBasicInfoModel;
    userContractInfo: UserContactInfoModel;
    userPersonalData: UserPersonalDataModel;
    idCard: IdCardModel;
    passportUser: PassportUserModel;
    userDriverLicense: UserDriverLicenceModel;
    dateCreated: Date;
    dateModified: Date;

    constructor() {
        this.id = this.id;
        this.userBasicInfo = new UserBasicInfoModel();
        this.userContractInfo = new UserContactInfoModel();
        this.userPersonalData = new UserPersonalDataModel();
        this.idCard = new IdCardModel();
        this.passportUser = new PassportUserModel();
        this.userDriverLicense = new UserDriverLicenceModel();

    }
}

export class UserBasicInfoModel {
    userName: string;
    dateOfBirth: Date;
    password: string;
    role: number;
    firstName: string;
    lastName: string;
    cellNumber: string;
    email: string;
    parentName: string;
    bankAccount: string;
}

export class UserContactInfoModel {
    workingStartDate: Date;
    contractExpiryDate: Date;
    healthInsuranceNumber: string;
    healthInsuranceDescription: string;
    healthInsuranceExpiryDate: Date;
}

export class UserPersonalDataModel {
    identificationNumber: string;
    placeOfBirth: string;
    municipalityOfBirth: string;
    address: string;
    city: string;
    country: string;
}

export class IdCardModel {
    idCardNumber: string;
    idCardExpiryDate: Date;
}

export class PassportUserModel {
    passportState: string;
    passportNumber: string;
    passportIssuedDate: Date;
    passportExpiryDate: Date;
    passportCity: string;
}

export class UserDriverLicenceModel {
    id: number;
    number: string;
    issuedDate: Date;
    expiryDate: Date;
    dateCreated: Date;
    dateModified: Date;
    driverLicenseCategories: Array<UserDriverLicenceCategory>;

    constructor() {
        this.driverLicenseCategories = new Array<UserDriverLicenceCategory>();
    }
}

export class UserDriverLicenceCategory {
    categoryLabel: string;
    category: string;
    issueDate: Date;
    expiryDate: Date;
}

export enum RolesEnum {
    Admin,
    Driver
}

export enum DriverLicenceCategoryEnum {
    AM = 1,
    A1 = 2,
    A2 = 3,
    A = 4,
    B1 = 5,
    B = 6,
    BE = 7,
    C1 = 8,
    C1E = 9,
    C = 10,
    CE = 11,
    D1 = 12,
    D1E = 13,
    D = 14,
    DE = 15,
    F = 16,
    M = 17
}