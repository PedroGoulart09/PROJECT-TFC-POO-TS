export interface IUser {
  username: string,
  email: string,
  role: string,
  password: string
}

export type IToken = {
  role: string,
  username: string,
  email: string
};

export type ITokenData = {
  data: IToken,
};

export type ILogin = Omit<IUser, 'role' | 'username' >;

export type IJWT = Omit<IUser, 'password'>;
