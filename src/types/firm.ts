export type firm = {
  firmName: string;
  firmType: 'hotel' | 'transport';
  discountRate: number;
  tickets?: {
    start: string;
    finish: string;
    price: number;
  };
};
