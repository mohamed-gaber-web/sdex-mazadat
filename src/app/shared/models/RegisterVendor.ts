import Role from "./Role";
import FileUpload from "./FileUpload";

export default class RegisterVendor {   
    id?: number;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    birthDate: Date;
    gender:number;
    files:FileUpload[];
    email: string;
    password?: string;
    confirmPassword?: string;
  }
  