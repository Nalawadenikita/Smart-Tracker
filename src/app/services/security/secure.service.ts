import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecureService {

  constructor() { }
    
  private SECRET_KEY: string = "AhtBCuxDErgFooG09876543HthIJar0sKLMN88sdvsO64PQc33veeRSTbbsdsUVWlimh2342nhsoXYZ";

  encryptKey(key:string) {
    return CryptoJS.MD5(key).toString();
  }

  decryptText(cipher:string) {
    const bytes  = CryptoJS.AES.decrypt(cipher, this.SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  encrypt(data:any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.SECRET_KEY).toString();
  }

  decrypt(cipher:any) {
    const bytes  = CryptoJS.AES.decrypt(cipher, this.SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

}
