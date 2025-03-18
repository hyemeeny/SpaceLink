export interface Login {
  email: string;
  password: string;
}
export interface CheckEmail {
  email: string;
}

export interface SignUp extends CheckEmail {
  password: string;
  name: string;
}

export interface UserProps {
  id: number;
  name: string;
  imageSource: string;
  email: string;
  createdAt: string;
}
