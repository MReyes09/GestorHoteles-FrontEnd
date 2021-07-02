import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";//peticiones ajax y metadata
import { CONNECTION } from "../global";
import { map } from "rxjs/operators";
import { RestHotelService } from '../restHotel/rest-hotel.service';
import { RestUserService } from '../restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {
  public uri;
  public service;
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

  constructor(private http:HttpClient, private restUser:RestUserService, private restHotel:RestHotelService) {
    this.uri = CONNECTION.URI;
  }

  listServices(idHotel){
    return this.http.get(this.uri+'/'+idHotel+'/listService')
    .pipe(map(this.extractData));
  }

  getService(){
    let service = JSON.parse(localStorage.getItem('service'));
    if(service != undefined || service != null){
      this.service = service;
    }else{
      this.service = null;
    }
    return this.service;
  }

  updateService(paramsUpdate, idHotel, idUser, idService){
    let params = JSON.stringify(paramsUpdate);
    return this.http.put(this.uri+'/'+idUser+'/'+'updateService/'+idHotel+'/'+idService, params, this.HttpOptionsAuth)
    .pipe(map(this.extractData));
  }

  removeService(idUser,idHotel,idService, password, service){
    return this.http.post(this.uri+'/'+idUser+'/deleteService/'+idHotel+'/'+idService, {nameService: service, passwordAdmin: password}, this.HttpOptionsAuth)
    .pipe(map(this.extractData));
  }

  createService(service,idUser,idHotel){
    let params = JSON.stringify(service);
    return this.http.post(this.uri+'/'+idUser+'/createService/'+idHotel, params, this.HttpOptionsAuth)
    .pipe(map(this.extractData))
  }
}
