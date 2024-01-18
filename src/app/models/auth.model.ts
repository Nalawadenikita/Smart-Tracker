export interface AuthRequest {
    userName: string;
    password: string;
  }
  
  export interface AuthResponse {
    id: string;
    name: string;
    idNo: string;
    bankAccountNo: string;
    bankAccountBalance: number;
    loginId: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    postcode: string;
    state: string;
    country: string;
    createDate: Date;
    lastUpdate: Date;
  }
  