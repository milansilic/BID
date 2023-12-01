export class CompanyModel {
    general: CompanyGeneralModel;
    ceoInfo: CompanyCeoInfoModel;

    constructor() {
        this.general = new CompanyGeneralModel();
        this.ceoInfo = new CompanyCeoInfoModel();
    }
}

export class CompanyGeneralModel {
    id: number;
    name: string;
    country: string;
    city: string;
    postalCode: string;
    bankName: string;
    address: string;
    bankAccount: string;
    vat: string;
    identificationNumber: string;
    phone: string;
    phone2: string;
    email: string;
    webSiteUrl: string;
    logoUrl: string;
}

export class CompanyCeoInfoModel {
    phone: string;
    cellPhone: string;
    email: string;
}