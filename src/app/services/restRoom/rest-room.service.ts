import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";//peticiones ajax y metadata
import { CONNECTION } from "../global";
import { map } from "rxjs/operators";
import { RestHotelService } from '../restHotel/rest-hotel.service';
import { RestUserService } from '../restUser/rest-user.service';


@Injectable({
    providedIn: 'root'
  })
  export class RestRoomService {
    public room;
    public uri;

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
    
      setRoom(room,idUser,idHotel){
        let params = JSON.stringify(room);
        return this.http.post(this.uri+'/'+idUser+'/createRoom/'+idHotel, params, this.HttpOptionsAuth)
        .pipe(map(this.extractData))
      }

      updateRoom(paramsUpdate, idHotel, idUser, idRoom){
        let params = JSON.stringify(paramsUpdate);
        return this.http.put(this.uri+'/'+idUser+'/'+'updateRoom/'+idHotel+'/'+idRoom, params, this.HttpOptionsAuth)
        .pipe(map(this.extractData));
      }

      removeRoom(idUser, idHotel, idRoom, password, room){
        return this.http.post(this.uri+'/'+idUser+'/removeRoom/'+idHotel+'/'+idRoom, {nameService: room, passwordAdmin: password}, this.HttpOptionsAuth)
        .pipe(map(this.extractData));
      }

      listRoom(idHotel){
        return this.http.put(this.uri+'/'+idHotel+'/listRooms', {})
        .pipe(map(this.extractData));
      
      }

      getRoom(){
        let room = JSON.parse(localStorage.getItem('room'));
        if(room != undefined || room != null){
          this.room = room;
        }else{
          this.room = null;
        }
        return this.room;
      }

  }