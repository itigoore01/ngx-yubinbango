export type YubinbangoData = [
  regionId: number,
  locality: string,
  street: string,
  extended?: string
];

export type YubinbangoDataResponse = Record<string, YubinbangoData>;
