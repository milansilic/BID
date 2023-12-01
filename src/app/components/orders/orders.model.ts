
export class OrdersGridModel {
    id: number;
    orderNumber: string;
    client: string;
    status: string;
    orderMaker: string;
}
export class OrdersModel {
    id: number;
    companyId: number;
    baseInfo: BaseInfoModel;
    transportInfo: TransportInfoModel;
    loadingAndCustomsInfo: Array<LoadingAndCustomsInfoModel>;
    reloadingAndCustomsInfo: Array<ReloadingAndCustomsInfoModel>;
    unloadingAndCustomsInfo: Array<UnloadingAndCustomsInfoModel>;
    orderGoods: OrderGoodsModel;
    orderFiles: Array<OrderFile>;
    dateCreated: Date;
    dateModified: Date;

    constructor() {
        this.baseInfo = new BaseInfoModel();
        this.transportInfo = new TransportInfoModel();
        this.loadingAndCustomsInfo = new Array<LoadingAndCustomsInfoModel>();
        this.reloadingAndCustomsInfo = new Array<ReloadingAndCustomsInfoModel>();
        this.unloadingAndCustomsInfo = new Array<UnloadingAndCustomsInfoModel>();
        this.orderFiles = new Array<OrderFile>();
        this.orderGoods = new OrderGoodsModel();
    }
}
export class BaseInfoModel {
    clientId: number;
    number: string;
    status: any; // enum
    transportType: any; // enum
    userId: number;
}
export class TransportInfoModel {
    currency: any; //enum
    price: number;
    additionalCosts: Array<TransportInfoCostModel>;

    constructor() {
        this.additionalCosts = new Array<TransportInfoCostModel>();
    }
}
export class TransportInfoCostModel {
    id: number;
    inboundClientId: number;
    outboundClientId: number;
    costTypeId: number;
    costTypeName: string;
    financialImpactId: number;
    inboundCurrency: number;
    outboundCurrency: number;
    inboundPrice: number;
    outboundPrice: number;
    supplierName: string;
    clientName: string;
}
export class LoadingAndCustomsInfoModel {
    loadingInfo: LoadingInfoModel;
    customsInfo: CustomsInfoModel;

    constructor() {
        this.loadingInfo = new LoadingInfoModel();
        this.customsInfo = new CustomsInfoModel();
    }
}
export class ReloadingAndCustomsInfoModel {
    reloadingInfo: ReloadingInfoModel;
    customsInfo: CustomsInfoModel;

    constructor() {
        this.reloadingInfo = new ReloadingInfoModel();
        this.customsInfo = new CustomsInfoModel();
    }
}

export class UnloadingAndCustomsInfoModel {
    unloadingInfo: UnloadingInfoModel;
    customsInfo: CustomsInfoModel;

    constructor() {
        this.unloadingInfo = new UnloadingInfoModel();
        this.customsInfo = new CustomsInfoModel();
    }
}

export class LoadingandReloadingInfoModel {
    id: number;
    refNumber: string;
    tourNumber: string;
    tourPercentage: number;
    dateCreated: Date;
    dateModified: Date;
    tourId: number;
}
export class LoadingInfoModel extends LoadingandReloadingInfoModel {
    dateOfLoading: Date;
    supplierId: number;
    loadingCompanyId: number;

}
export class CustomsInfoModel {
    customsAgentId: number;
    dutyId: number;
    dutyType: number;
    street: string;
    number: string;
    country: string;
    city: string;
    postalCode: string;
    typeOfCustomProcedure: number;
}

export class ReloadingInfoModel extends LoadingandReloadingInfoModel {
    dateOfUnloading: Date;
    dateOfLoading: Date;
    reloadingCompanyId: number;
}
export class UnloadingInfoModel extends LoadingandReloadingInfoModel {
    dateOfUnloading: Date;
    importerId: number;
    unloadingCompanyId: number;
}

export class OrderInfoCardModel {
    cardTitle: string;
    date: Date;
    companyAndAdress: string;
    referenceNumber: string;
}

export class OrderGoodsModel {
    goods: string;
    totalWeight: number;
    loadingMeters: number;
    currency: number;
    valueOfGoods: number;
    isADR: boolean;
    adrClass: string;
    adrWeight: number;
    unNumber: number;
    notes: string;
    orderPackages: Array<OrderPackagesModel>;

    constructor() {
        this.orderPackages = new Array<OrderPackagesModel>();
    }

}
export class OrderPackagesModel {
    id: number;
    type: number;
    typeDisplayLabel: string;
    orderId: number;
    number: number;
    isStackable: boolean;
    rows: number;
    length: number;
    width: number;
    height: number;
    weight: number;
    loadingMeters: number;
    dateCreated: Date;
    dateModified: Date;
}

export class OrderFile {
    id: number;
    blobName: string;
    companyId: number;
    size: number;
    name: string;
    url: string;
    urlWithSASToken: string;
    type: string;
}

export enum OrderStatusEnum {
    Planed = 1,
    Loaded = 2,
    InTransit = 3,
    UnloadedInBondedWarehouse = 4,
    Unloaded = 5
}

export enum TransportTypeEnum {
    Export = 1,
    Import = 2,
    Transit = 3,
    Domestic = 4,
    DomesticBondedGoods = 5
}

export enum CurrencyEnum {
    RSD = 1,
    EUR = 2,
    USD = 3,
    GBP = 4,
}

export enum FinancialImpactEnum {
    Reinvoicing = 1,
    IncludedInPrice = 2,
    AdditionalProfit = 3,
    ReinvoicingAndProfit = 4
}

export enum TypeOfPackageEnum {
    Pallet = 1,
    Box = 2,
    Collet = 3
}

export enum TypeOfCustomProcedureEnum {
    RegularExport = 1,
    TemporaryExport = 2,
    Reexport = 3,
    NTShippingDocument = 4,
    RegularImport = 5,
    TemporaryImport = 6,
    UnloadingBondedWarehouse = 7
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

export enum ConnectWithTourType {
    Loading = 1,
    Reloading = 2,
    Unloading = 3
}