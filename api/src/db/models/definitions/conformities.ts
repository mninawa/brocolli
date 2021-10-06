import { Document, Schema } from 'mongoose';
import { field } from './utils';

export interface IConformity {
  mainType: string;
  mainTypeId: string;
  relType: string;
  relTypeId: string;
}

export interface IConformityAdd {
  mainType: string;
  mainTypeId: string;
  relType: string;
  relTypeId: string;
}

export interface IConformityEdit {
  mainType: string;
  mainTypeId: string;
  relType: string;
  relTypeIds: string[];
}

export interface IConformitySaved {
  mainType: string;
  mainTypeId: string;
  relTypes: string[];
}

export interface IConformityRelated {
  mainType: string;
  mainTypeId: string;
  relType: string;
}

export interface IConformityChange {
  type: string;
  newTypeId: string;
  oldTypeIds: string[];
}

export interface IConformityFilter {
  mainType: string;
  mainTypeIds: string[];
  relType: string;
}

export interface IGetConformityBulk {
  mainType: string;
  mainTypeIds: string[];
  relTypes: string[];
}

export interface IConformityRemove {
  mainType: string;
  mainTypeId: string;
}

export interface IConformitiesRemove {
  mainType: string;
  mainTypeIds: string[];
}

export interface IConformityDocument extends IConformity, Document {
  _id: string;
}

export const conformitySchema = new Schema({
  _id: field({ pkey: true }),
  mainType: field({ type: String }),
  mainTypeId: field({ type: String, index: true }),
  relType: field({ type: String }),
  relTypeId: field({ type: String, index: true })
});

conformitySchema.index({
  mainType: 1,
  mainTypeId: 1,
  relType: 1,
  relTypeId: 1
});
conformitySchema.index({ relType: 1, relTypeId: 1, mainType: 1 });
conformitySchema.index({ mainType: 1, relTypeId: 1 });
conformitySchema.index({ relType: 1, mainTypeId: 1 });
