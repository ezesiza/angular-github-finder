export interface ApolloErrorResponse {
  extensions: { code: string };
  locations: Array<{ line: number; colum: number }>;
  message: string;
  path: Array<string>;
}

export interface ApolloResponse {
  data: any;
  errors: Array<{ message: string }>;
  loading: boolean;
  netWorkStatus: number;
}