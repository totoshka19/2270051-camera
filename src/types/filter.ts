export type FilterParams = {
  category: string;
  types: {
    digital: boolean;
    film: boolean;
    snapshot: boolean;
    collection: boolean;
  };
  levels: {
    zero: boolean;
    nonProfessional: boolean;
    professional: boolean;
  };
};
