import { Document, Schema } from 'mongoose';

export interface ProviderPayment {
	discountsTotal?: number;
	discounts?: Array<ProviderDiscountItem>;

	retentions?: Array<ProviderRetentionItem>;
	retentionsTotal?: number;

	costs?: Array<ProviderCostItem>;
	costsSubTotal?: number;
	costsTotal?: number;

	taxes?: Array<TaxItem>;
	taxesTotal?: number;

	currency?: string;
	subTotal?: number;
	total: number;

	billableDistance?: number;
}

interface Item {
	label?: string;
	value: number;
}

export interface ProviderDiscountItem extends Item {
	name: 'copago';
}

export type ProviderCostNames = 'wait' | 'lock' | 'fuel' | 'ferry' | 'toll' | 'parking' | 'otherCost' | 'dollys' | 'desparqueo' | 'patines' | 'maniobra';
export interface ProviderCostItem extends Item {
	name: ProviderCostNames;
	tax?: number;
	total?: number;
	showTotalOnEdit?: boolean;
}

export enum ProviderRetentionNames {
	SITUATION_RETENTION = 'SITUATION_RETENTION',
	PROVIDER_RETENTION = 'PROVIDER_RETENTION',
	PROVIDER_TECH_RETENTION = 'PROVIDER_TECH_RETENTION',
}

export interface ProviderRetentionItem extends Item {
	name: ProviderRetentionNames;
}

export interface TaxItem extends Item {
	name: 'iva' | ProviderCostNames;
	percent: number;
}

const ProviderPaymentSchemaFields: Record<keyof ProviderPayment, any> = {
	discountsTotal: { type: Number },
	discounts: { type: Array },
	costs: { type: Array },
	costsTotal: { type: Number },
	costsSubTotal: { type: Number },
	retentions: { type: Array },
	retentionsTotal: { type: Number },
	taxes: { type: Array },
	taxesTotal: { type: Number },
	total: { type: Number },
	subTotal: { type: Number },
	currency: { type: String },
	billableDistance: { type: Number },
};

interface ProviderPaymentDocument extends Omit<ProviderPayment, 'id'>, Document {}

export const ProviderPaymentSchema = new Schema<ProviderPaymentDocument>(ProviderPaymentSchemaFields);
