import { Schema, model, Document } from 'mongoose';
import { ProviderCostNames } from './provider-payment-schema';

export enum Branches {
	PR = 'Puerto Rico',
	PTY = 'Panama',
	CR = 'Costa Rica',
	CO = 'Colombia',
	MX = 'Mexico',
}

export interface IBranchConfig {
	name: Branches;
	/**
	 * Employee must accept service in Helios App in a period lower or equal to this value to gain
	 * a point in gamification
	 */
	maxEmployeesTimeToAcceptInMillis: number;
	/**
	 * Employee survey score must be grater or equal to this score to gain a point in gamification
	 */
	minEmployeesQualitySurveyScore: number;
	/**
	 * Error percentage which is added to the employee ETA when calculating OnTime Gamification KPI
	 * i.e.: if initialEta is 1000s and acceptableEmployeeEtaError is 10, then
	 * eta to campare will be 1000 + (1000 * 10/100)
	 */
	acceptableEmployeeEtaPercentageError: number;

	providerCostsToAddTax?: ProviderCostNames[];
	providerCostsWithTaxIncluded?: ProviderCostNames[];
}

const schema = new Schema<IBranchConfig>(
	{
		name: { type: String, enum: Object.values(Branches) },
		maxEmployeesTimeToAcceptInMillis: Number,
		minEmployeesQualitySurveyScore: Number,
		acceptableEmployeeEtaPercentageError: Number,
		providerCostsToAddTax: { type: Array },
	},
	{ timestamps: true }
);

export const BranchConfig = model<IBranchConfig>('BranchConfig', schema);
export interface IBranchConfigDocument extends IBranchConfig, Document {}
