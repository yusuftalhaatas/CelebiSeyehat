export type user = {
  name: string;
  id: string;
  puan: number;
  tickets: Array<ticket>;
};
export type ticket = {
  time: Date;
  no: number;
};
