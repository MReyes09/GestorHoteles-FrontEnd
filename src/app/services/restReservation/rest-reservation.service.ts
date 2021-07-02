import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
import { RestRoomService } from '../restRoom/rest-room.service';
import { RestUserService } from '../restUser/rest-user.service';

@Injectable({
    providedIn: 'root'
})
export class RestReservationService {
  public uri;
  public token;
  public reservation;

  public httpOptionAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
  };

  private extractData(res:Response){
    let body = res;
    return body || [] || {}
  }



  constructor(private http:HttpClient,private restUser:RestUserService, private restRoom:RestRoomService) { 
      this.uri = CONNECTION.URI;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != undefined || token != null){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }  

  createReservation(reservation,idReservation, idHotel,idRoom){
    let params = JSON.stringify(reservation);
    return this.http.post(this.uri+'/'+idReservation+'/'+idHotel+'/'+idRoom+'/makeReservation/', params, this.httpOptionAuth)
    .pipe(map(this.extractData))

  }

  updateReservation(idReservation, idRoom){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.post(this.uri+'/'+idReservation+'/'+idReservation+'updateReservation', {headers: headers})
    .pipe(map(this.extractData))
    
  }

  listReservation(idReservation){
      return this.http.get(this.uri+idReservation+'listReservations', this.httpOptionAuth)
      .pipe(map(this.extractData))
    }

  removeReservation(idUser, idReservation){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
      return this.http.post(this.uri+idReservation+idUser+'/deleteReservation/', null, {headers: headers})
      .pipe(map(this.extractData))
    }

  findReservationBynameUser(idUser){

    return this.http.get(this.uri+idUser+'findReservationBynameUser',this.httpOptionAuth)
    .pipe(map(this.extractData))
  }

  getReservation(){
    let reservation = JSON.parse(localStorage.getItem('reservation'));
    if(reservation != undefined || reservation != null){
      this.reservation = reservation;
    }else{
      this.reservation = null;
    }
    return this.reservation;
  }
}