import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { RestRoomService } from 'src/app/services/restRoom/rest-room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  public room: Room;
  public hotel;
  public user;

  constructor(private restUser:RestUserService, private restHotel:RestHotelService, private restRoom:RestRoomService, private route:Router) {
    this.room = new Room('','',null,'','',[]);
  }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.hotel = this.restHotel.getHotel();
  }

  onSubmit(setRoom){
    
    this.restRoom.setRoom(this.room,this.user._id,this.hotel._id).subscribe((res:any) => {
      if(res.roomSaved){
        alert(res.message);
        localStorage.setItem('room', JSON.stringify(this.room));
        setRoom.reset();
        this.route.navigateByUrl('profileHotel')
      }else{
        alert(res.message);
      }
    },error => console.log(<any>error));
  }
}