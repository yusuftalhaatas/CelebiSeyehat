export type ticket = {
  date: string;
  start?: string;
  finish?: string;
  firmName: string;
  firmType?: 'hotel' | 'transport';
  no: string;
  userName?: string;
  name: string;
  price?: number;
};
