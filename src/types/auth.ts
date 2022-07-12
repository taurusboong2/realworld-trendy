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
};

export type UserData = {
  user: {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image?: string;
  };
};

export type UserInfo = {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
};

export type UpdateUserData = {
  user: {
    username: string;
    password: string;
    email: string;
    bio?: string;
    image?: string;
  };
};
