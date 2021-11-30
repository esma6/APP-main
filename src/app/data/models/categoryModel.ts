export class Category {
  createdBy!: string;
  description!: string;
  neutro!: string;
  partiallyNotSustainable!: string;
  name!: string;
  partiallySustainable!: string;
  totallyNotSustainable!: string;
  totallySustainable!: string;
  votesCount!: string;
  id!: string;
}


export class CategoryTable {
  createdBy!:   string;
  name!:        string;
  description!: string;
  votesCount!:  string;
  detail!:      Detail[];
  id!: string;
}

export interface Detail {
  totallySustainable:      string;
  partiallySustainable:    string;
  neutro:                  string;
  totallyNotSustainable:   string;
  partiallyNotSustainable: string;
}
