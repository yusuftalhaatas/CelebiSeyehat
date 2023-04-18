export type firm = {
  firmName: string;
  firmType: 'hotel' | 'transport';
  discountRate: 1 | 2;
  tickets?: {
    start: string;
    finish: string;
    price: number;
  };
};
