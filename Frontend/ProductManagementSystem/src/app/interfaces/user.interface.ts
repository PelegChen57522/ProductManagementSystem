export interface User {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    createDate: Date;
    lastConnection: Date;
    address?: string;
  }
  