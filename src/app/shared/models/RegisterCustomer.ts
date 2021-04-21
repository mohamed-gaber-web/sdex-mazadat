import Role from "./Role";

export default class RegisterUser {
    
   
    id?: number;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    birthDate: Date;
    gender:number;
    email: string;
    password?: string;
    confirmPassword?: string;
    role: Role;
  }
  