import Shipping from 'src/app/shared/models/Shipping';

export default class User { 
    Id?: number;
    FirstName: string;
    LastName:  string;
    Email:  string;
    PhoneNumber :string;
    BirthDate:Date;
    Gender:number;
    IsActive:boolean;
    Role:   string[];
    Shipping:Shipping;
    permissions: string[];
  }