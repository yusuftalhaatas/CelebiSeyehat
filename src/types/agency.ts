export type agency = {
  name: string;
  transport: Array<transport>;
  hotels: Array<hotel>;
};

export type transport = {
  name: string;
};

export type hotel = {
  name: string;
};
