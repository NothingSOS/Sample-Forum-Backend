export type RequestBodyRegister = {
  email: string;
};

export type RequestBodyLogin = {
  email: string;
  password: string;
};

export type RequestBodyVerifyEmail = {
  key: string;
};

export type RequestBodyVerifyUser = {
  key: string;
  displayName: string;
  password: string;
};

export type PreUserJWT = {
  id: number;
  email: string;
  randomKey: string;
};
