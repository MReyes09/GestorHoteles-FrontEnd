import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestRoomService } from 'src/app/services/restRoom/rest-room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  rooms: [];
  hotel;
  roomSelect: Room;

  constructor(private restRoom: RestRoomService, private restHotel:RestHotelService, private route:Router) { }


  ngOnInit(): void {
    this.hotel = this.restHotel.getHotel();
    this.roomSelect = new Room('','',null,'','',[]);
    this.rooms = this.hotel.rooms;
    this.listRooms();
  }

  listRooms(){
    this.restRoom.listRoom(this.hotel._id).subscribe((res:any) => {
      if(res.roomFind){
        console.log('Si entra al encontrado');
        this.rooms = res.roomFind;
        //delete this.roomSelect.hotel;
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message)
    )
  }

  obtenerData(room){
    this.roomSelect = room;
    delete this.roomSelect.hotel;
    localStorage.setItem('hotel', JSON.stringify(this.roomSelect));
    this.route.navigateByUrl('profileHotel')
  }
}
