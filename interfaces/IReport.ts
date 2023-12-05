export interface IReport {
  primaryTable: ITable | null;
  linkedTables: ITable[];
}

export interface ITable {
  name: ETableNames;
  fields: IField[];
  limit?: number;
}

export interface IField {
  name: string;
  sort?: ESort;
  filter?: IFilter;
}

export interface IFilter {
  type: EFilterType;
  value: string;
}

export enum ETableNames {
  ASSUNTO = "assunto",
  AUTOR = "autor",
  MATERIAL = "material",
  OBRA = "obra",
  OCUPACAO = "ocupacao",
}

export enum ESort {
  ASC = "ASC",
  DESC = "DESC",
}

export enum EFilterType {
  EQUALS = "equals",
  NOT = "not",
  LT = "lt",
  LTE = "lte",
  GT = "gt",
  GTE = "gte",
  IN = "in",
  NOT_IN = "notIn",
  CONTAINS = "contains",
  STARTS_WITH = "startsWith",
  ENDS_WITH = "endsWith",
  AND = "AND",
  OR = "OR",
  NOT_ = "NOT",
}
