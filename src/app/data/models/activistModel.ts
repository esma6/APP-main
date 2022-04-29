

export class ActivistModel {
  id!:               string;
  documentType!:     string;
  name!:             string;
  document!:         string;
  activist_wallet!:  string;
  activist_address!: PropertyAddress;
}

export interface PropertyAddress {
  cep:     string;
  state:   string;
  city:    string;
  country: string;
}
