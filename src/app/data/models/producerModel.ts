export class ProducerModel {
  id!:               string;
  documentType!:     string;
  name!:             string;
  document!:         string;
  producer_wallet!:  string;
  property_address!: PropertyAddress;
}

export interface PropertyAddress {
  cep:     string;
  state:   string;
  city:    string;
  country: string;
}
