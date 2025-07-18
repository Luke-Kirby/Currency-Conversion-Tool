//I made these interfaces by looking at the response from each API

export interface Meta {
  code: number;
  disclaimer: string;
}

export interface Currency {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
}

export interface CurrenciesResponse {
  meta: Meta;
  response: Currency[];
}

export interface ConvertResponseData {
  timestamp: number;
  date: string;
  from: string;
  to: string;
  amount: number;
  value: number;
}

export interface ConvertResponse {
  meta: Meta;
  response: ConvertResponseData;
}
