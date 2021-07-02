import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CONNECTION } from '../global';
import { map } from "rxjs/operators";
import { RestUserService } from '../restUser/rest-user.service';


@Injectable({
  providedIn: 'root'
})
export class RestHotelService {

  public uri;
  public user;
  public hotel;

  constructor(private http:HttpClient, private restUser:RestUserService) {
    this.uri = CONNECTION.URI;
  }  

  public httpOptions = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  public HttpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })

  }

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  createHotel(hotel, idAdmin){
    let params = JSON.stringify(hotel);
    return this.http.post(this.uri+'/'+idAdmin+'/createHotel', params, this.HttpOptionsAuth)
    .pipe(map(this.extractData));
  }

  getHotelsAdmin(idUser){
    return this.http.get(this.uri+'getHotelsAdmin/'+idUser, this.HttpOptionsAuth)
    .pipe(map(this.extractData));
  }

  getHotel(){
    let hotel = JSON.parse(localStorage.getItem('hotel'));
    if(hotel != undefined || hotel != null){
      this.hotel = hotel;
    }else{
      this.hotel = null;
    }
    return this.hotel;
  }

  updateHotel(idUser, hotelToUpdate, idHotel){
    let params = JSON.stringify(hotelToUpdate);
    return this.http.put(this.uri+'/'+idUser+'/updateHotel/'+idHotel, params, this.HttpOptionsAuth)
    .pipe(map(this.extractData));
  }

  deleteHotel(idUser, idHotel, password ){
    return this.http.post(this.uri+'/'+idUser+'/deleteHotel/'+idHotel, {passwordAdmin : password}, this.HttpOptionsAuth)
    .pipe(map(this.extractData));
  }
}