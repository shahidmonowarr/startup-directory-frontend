export type IStartup = {
  _id?: string;
  name: string;
  city: string;
  startingYear: string;
  founders: string[];
  noOfEmployees: number;
  fundingAmount: number;
  industry: string;
};

export type IResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export interface IResponseQuery {
  statusCode: number;
  data: {
    errorMessages: {
      path: string;
      message: string;
    }[];
    stack: string;
  };
  success: boolean;
  message: string;
}
