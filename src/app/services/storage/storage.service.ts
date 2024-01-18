import { Injectable } from '@angular/core';
import { SecureService } from '../security/secure.service'; 

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private secure:SecureService) { }

  set(key:string, value:any){
    key = this.secure.encryptKey(key);
    value = this.secure.encrypt(value);
    localStorage.setItem(key, value);
    
   }
  
   get(key:string){
    key = this.secure.encryptKey(key);
    if(localStorage.getItem(key)){
      return this.secure.decrypt(localStorage.getItem(key));
    }else{
        return null;
    }
  
   }
  
     remove(key:string){
        key = this.secure.encryptKey(key);
        localStorage.removeItem(key);
     }
  
    clearAll() {
      localStorage.clear();
    }

}
