export interface Login {
  email: string;
  password: string;
}

export interface SignUp {
  email: string;
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
