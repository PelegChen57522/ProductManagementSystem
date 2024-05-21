// src/app/models/user.model.ts
export interface User {
    Uid: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Phone: string;
    Password: string;
    CreateDate: Date;
    LastConnection: Date;
    Address?: string;
  }
  