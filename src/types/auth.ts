export type NewAccountType = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export type LoginData = {
  user: {
    email: string;
    password: string;
  };
}
