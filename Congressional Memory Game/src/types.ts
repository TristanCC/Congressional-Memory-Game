// types.ts
export interface Term {
    chamber: string;
    startYear: string;
    endYear?: string;
  }
  
  export interface Depiction {
    attribution: string;
    imageUrl: string;
  }
  
  export interface Member {
    id: string;
    name: string;
    depiction?: Depiction;
    partyName: string;
    state: string;
    district: string;
    terms: { item: Term[] };
  }
  