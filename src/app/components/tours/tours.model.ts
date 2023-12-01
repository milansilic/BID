
export class ToursGridModel {
    id: number;
    tourNumber: string;
    status: string;
    startKm: string;
    startDate: Date;
    endKm: string;
}
export class ToursModel {
    id: number;
    carrierId: number;
    vehicleId: number;
    number: string;
    hasTrailer: boolean;
    vehicleTrailerId: number;
    startDate: Date;
    endDate: Date;
    startKm: number;
    endKm: number;
    differenceKm: number;
    price: number;
    currency: number;
    status: number;
    tourMakerId: number;
    isSubcontractor: boolean;
    tourDrivers: Array<TourDriversModel>;
    tourExpenses: Array<TourExpensesModel>;
    tourLicenceDocuments: Array<TourLicenceDocumentsModel>;
    notes: string;
    dateCreated: Date;
    dateModified: Date;

    constructor() {
        this.tourDrivers = new Array<TourDriversModel>();
        this.tourExpenses = new Array<TourExpensesModel>();
        this.tourLicenceDocuments = new Array<TourLicenceDocumentsModel>();
    }
}

export class TourDriversModel {
    id: number;
    tourId: number;
    driverId: number;
    startKm: number;
    endKm: number;
    startDate: Date;
    endDate: Date;
    dateCreated: Date;
    dateModified: Date;
}

export class TourExpensesModel {
    id: number;
    tourId: number;
    type: number;
    serviceCompanyId: number;
    paymentMethod: number;
    driverId: number;
    payTerms: number;
    price: number;
    currency: number;
    quantity: number;
    isApproved: boolean;
    notes: string;
    tourExpenseDocuments: Array<TourExpensesDocumentsModel>;
    dateCreated: Date;
    dateModified: Date;

    constructor() {
        this.tourExpenseDocuments = new Array<TourExpensesDocumentsModel>();
    }
}

export class TourExpensesDocumentsModel {
    id: number;
    tourExpenseId: number;
    companyId: number;
    name: string;
    notes: string;
    blobName: string;
    url: string;
    urlWithSASToken: string;
    size: number;
    dateCreated: Date;
    dateModified: Date;
}

export class TourLicenceDocumentsModel {
    id: number;
    name: string;
    tourId: number;
    description: string;
    url: string;
    dateCreated: Date;
    dateModified: Date;
}