import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/Client.model';
import { Observable, Subject } from 'rxjs';

import { Contact } from '../models/Contact.model';
import { Produit } from '../models/Produit.model';
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';
const httpOptions={
  headers:new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private _clientConnect= new Subject<void>();
  isConnected=false;
  messageCommande=""
  IsloggedIn:boolean
  [x: string]: any;
  apiUrl='http://localhost:8081/api'
  loginUserUrl='http://localhost:8081/api/client/login'

  constructor(private http:HttpClient,private router:Router) { }
  commandeFromApi(rq:any){
    return this.http.post<any>( "http://localhost:8081/api/commande" ,rq ,httpOptions);
  }
  addclient(client:Client){ 
    return this.http.post<any>(this.apiUrl+"/client", client,httpOptions);}
    addcontact(contact:Contact){ 
        return this.http.post<any>(this.apiUrl+"/contact", contact,httpOptions);}
        addRegister(register:Client){ 
          return this.http.post<any>(this.apiUrl+"/register", register,httpOptions);}
    onDeleteClient(id : number){
      const url =`${this.apiUrl+"/client"}/${id}` 
      return this.http.delete(url , httpOptions)
    }
   
    
    onDeleteContact(id : number){
      const url =`${this.apiUrl+"/contact"}/${id}` 
      return this.http.delete(url , httpOptions)
    }
   
    getClient(): Observable<Client[]>{
      return this.http.get<Client[]>(this.apiUrl + "/client");
    }
     
    getContact(): Observable<Contact[]>{
      return this.http.get<Contact[]>(this.apiUrl + "/contact");
    }
    getProduit(): Observable<Produit[]>{
      return this.http.get<Produit[]>(this.apiUrl + "/produit");
    }
   
 loginClientFromApi( client:Client){
  return this.http.post<any>(this.loginUserUrl, client);
}
loginClient(client:Client){
  this.loginClientFromApi(client).subscribe((data)=>{
    console.log(data)
    var decoded:any = jwt_decode(data.token);

    console.log(decoded);
    this.loginInClient(decoded.data)
    this._clientConnect.next()
  })
}
loginInClient(data:any){
  localStorage.setItem("idC",data.id)
  this.isConnected=true
  this.router.navigate(['/produit']).then(()=>{window.location.reload()})
}
isLoggedIn(){

  let token = localStorage.getItem("idC");

  if (token) {
    return true ;
  } else {
    return false;
  }
}

getAllCommandebyClientId(){
  return this.http.get<any>( "http://localhost:8081/api/commande/get-all-by-id-client/"+localStorage.getItem("idC") , httpOptions);
}
}
