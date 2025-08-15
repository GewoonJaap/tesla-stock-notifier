export interface TeslaResponse {
	results: Car[];
	total_matches_found: string;
}

export interface Car {
	InTransit: boolean;
	ADL_OPTS: null;
	AUTOPILOT: null;
	BATTERY: null;
	CABIN_CONFIG: string[];
	CPORefurbishmentStatus: null;
	CashDetails: CashDetails;
	CompositorViews: CompositorViews;
	CountryCode: string;
	CountryHasVehicleAtLocation: boolean;
	CountryOfOrigin: string;
	CurrencyCode: string;
	CurrencyCodes: string;
	DECOR: null;
	DRIVE: string[];
	DamageDisclosure: boolean;
	DamageDisclosureStatus: string;
	DestinationHandlingFee: number;
	Discount: number;
	DisplayWarranty: boolean;
	FactoryCode: string;
	FederalIncentives: FederalIncentives;
	FinplatDetails: any[];
	FirstRegistrationDate: null | string;
	FixedAssets: boolean;
	FlexibleOptionsData: FlexibleOptionsDatum[];
	ForecastedFactoryGatedDate: null;
	HEADLINER: null;
	HasDamagePhotos: boolean;
	Hash: string;
	INTERIOR: string[];
	IncentivesDetails: IncentivesDetails;
	InspectionDocumentGuid: null;
	InventoryPrice: number;
	IsAtLocation: boolean;
	IsChargingConnectorIncluded: boolean;
	IsDemo: boolean;
	IsFactoryGated: boolean;
	IsFederalCreditEligible: boolean;
	IsInTransit: boolean;
	IsLegacy: boolean;
	IsPreProdWithDisclaimer: boolean;
	Language: string;
	Languages: string[];
	LexiconDefaultOptions: LexiconDefaultOption[];
	ListingType: string;
	ListingTypes: string;
	Model: string;
	Odometer: number;
	OdometerType: string;
	OptionCodeData: OptionCodeDatum[];
	OptionCodeList: string;
	OptionCodeListDisplayOnly: null;
	OptionCodePricing: OptionCodePricing[];
	OrderFee: OrderFee;
	OriginalDeliveryDate: null;
	OriginalInCustomerGarageDate: null;
	PAINT: string[];
	PreviouslyRegistered: boolean;
	Price: number;
	PurchasePrice: number;
	ROOF: null;
	RegistrationCount: number;
	Rewards: any[];
	STEERING_WHEEL: null;
	TRIM: string[];
	TaxScheme: null;
	ThirdPartyHistoryUrl: null;
	TitleStatus: string;
	TitleSubtype: string[];
	TotalPrice: number;
	TradeInType: null;
	TransportFees: TransportFees;
	TrimCode: string;
	TrimName: string;
	TrimVariantCode: string;
	Trt: number;
	VIN: string;
	VehicleHistory: null;
	WHEELS: string[];
	WarrantyBatteryExpDate: string;
	WarrantyBatteryIsExpired: boolean;
	WarrantyBatteryMile: number;
	WarrantyBatteryYear: number;
	WarrantyData: WarrantyData;
	WarrantyDriveUnitExpDate: string;
	WarrantyDriveUnitMile: number;
	WarrantyDriveUnitYear: number;
	WarrantyMile: number;
	WarrantyVehicleExpDate: string;
	WarrantyVehicleIsExpired: boolean;
	WarrantyYear: number;
	Year: number;
	AlternateCurrency: any[];
	UsedVehicleLimitedWarrantyMile: number;
	UsedVehicleLimitedWarrantyYear: number;
	OdometerTypeShort: string;
	DeliveryDateDisplay: boolean;
	TransportationFee: number;
	vrlList: VrlList[];
	OptionCodeSpecs: OptionCodeSpecs;
	CompositorViewsCustom: CompositorViewsCustom;
	IsRangeStandard: boolean;
	geoPoints: Array<Array<number | string>>;
	HasMarketingOptions: boolean;
}

export interface CashDetails {
	cash: Cash;
}

export interface Cash {
	inventoryDiscountWithTax: number;
	inventoryPriceWithoutDiscounts: null;
}

export interface CompositorViews {
	frontView: string;
	sideView: string;
	interiorView: string;
}

export interface CompositorViewsCustom {
	isProductWithCustomViews: boolean;
	externalZoom: External;
	externalCrop: External;
}

export interface External {
	order: number | string;
	search: number | string;
}

export interface FederalIncentives {
	IsTaxIncentiveEligible: boolean;
	PriceAfterTaxIncentive: number;
	TaxIncentiveAmount: number;
}

export interface FlexibleOptionsDatum {
	code: string;
	description: string;
	group: string;
	long_name: string;
	name: string;
	price: number;
}

export interface IncentivesDetails {
	current: Current;
	currentAvailable: Current;
	hidePurchasePriceIncentive: boolean;
	total: Total;
}

export interface Current {
	fuel: Fuel;
	total: number;
	teslaIncentive?: TeslaIncentive;
}

export interface Fuel {
	data: FuelDatum[];
	total: number;
}

export interface FuelDatum {
	algorithm: boolean;
	amount: number;
	enabled: boolean;
	incentiveType: string;
	inventory: string[];
	market: string;
	period: string;
	variables: Variables;
	variant: string[];
}

export interface Variables {
	disclaimer: Disclaimer;
	distance: number;
	distance_year: number;
	electric: Electric;
	fuel: Electric;
	fuel_efficiency_imperial: number;
	fuel_efficiency_metric: number;
	fuel_price: number;
	kwh_consumption: number;
	kwh_consumption_100: number;
	kwh_consumption_100_nv36: number;
	kwh_price: number;
	last_updated: string;
	months: number;
	supercharger_kwh_price: number;
	toll_savings: number;
}

export interface Disclaimer {
	electricityLastUpdated: null;
	electricityPrice: number;
	fuelEconomy: number;
	kwhConsumption: number;
	lastUpdated: number;
	petrolLastUpdated: null;
	petrolPerYear: number;
	petrolPerYearUpper: number;
	petrolPrice: number;
	petrolSavings: number;
	petrolSavingsUpper: number;
	timesLower: number;
	yearlyDistance: number;
}

export interface Electric {
	consumption_per_year: number;
	default: number;
	total: number;
	upper: number;
}

export interface TeslaIncentive {
	data: TeslaIncentiveDatum[];
	total: number;
}

export interface TeslaIncentiveDatum {
	amount: number;
	customerType: string[];
	enabled: boolean;
	financeType: string[];
	hideForFinancing: string[];
	incentiveType: string;
	inventory: string[];
	isEnterpriseOrder: boolean;
	market: string;
	name: Name;
	period: string;
	toggle_amount: ToggleAmount;
	variant: string[];
}

export interface Name {
	nl: string;
}

export interface ToggleAmount {
	if: If[];
}

export interface If {
	amount: number;
	selected_by: SelectedBy;
}

export interface SelectedBy {
	or: string[];
}

export interface Total {
	fuel: number;
	monthly: number;
	once: number;
	pos: number;
}

export interface LexiconDefaultOption {
	code: string;
	description: string;
	group: string;
	long_name: string;
	name: string;
}

export interface OptionCodeDatum {
	acceleration_unit_long?: string;
	acceleration_unit_short?: string;
	acceleration_value?: string;
	code: string;
	group: string;
	price?: number;
	unit_long?: string;
	unit_short?: string;
	value: null | string;
	top_speed_label?: string;
	unit_long_value?: string;
	range_label_source?: string;
	range_source?: string;
	range_source_inventory_new?: string;
	description: string;
	long_name: string;
	name: string;
}

export interface OptionCodePricing {
	code: string;
	group: string;
	price: number;
}

export interface OptionCodeSpecs {
	C_SPECS: C;
	C_DESIGN: C;
	C_CALLOUTS: C;
	C_OPTS: C;
}

export interface C {
	code: string;
	name: string;
	options: COption[];
}

export interface COption {
	code: string;
	name: string;
	long_name: string;
	description: string;
	lexiconGroup: string;
	group?: string;
	list?: string[];
	period?: string;
}

export interface OrderFee {
	type: string;
	value: number;
}

export interface TransportFees {
	exemptVRL?: any[];
	fees?: any[];
	metro_fees?: any[];
	trt_to_trt_fees?: any[];
	DE?: De;
}

export interface De {
	exemptVRL: any[];
	fees: any[];
	metro_fees: any[];
	trt_to_trt_fees: any[];
}

export interface VrlList {
	vrl: number;
	lat: number;
	lon: number;
	vrlLocks: any[];
}

export interface WarrantyData {
	UsedVehicleLimitedWarrantyMile: number;
	UsedVehicleLimitedWarrantyYear: number;
	WarrantyBatteryExpDate: string;
	WarrantyBatteryIsExpired: boolean;
	WarrantyBatteryMile: number;
	WarrantyBatteryYear: number;
	WarrantyDriveUnitExpDate: string;
	WarrantyDriveUnitMile: number;
	WarrantyDriveUnitYear: number;
	WarrantyMile: number;
	WarrantyVehicleExpDate: string;
	WarrantyVehicleIsExpired: boolean;
	WarrantyYear: number;
}
