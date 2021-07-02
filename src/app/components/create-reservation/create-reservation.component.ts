import { Component, OnInit } from '@angular/core';
import { Reservation } from "../../models/reservation";
import { RestReservationService } from '../../services/restReservation/rest-reservation.service';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { RestRoomService } from 'src/app/services/restRoom/rest-room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {
  public reservation: Reservation;
  public checkIn: Date;
  public checkOut: Date;
  public user;
  public room;
  public hotel;

  constructor(private restUser:RestUserService, private restHotel:RestHotelService, private restRoom:RestRoomService,private restReservation:RestReservationService, private route:Router) { 
    this.reservation = new Reservation('',this.checkIn,this.checkOut,[],[],[]);
    this.user = this.restUser.getUser();
    this.hotel = this.restHotel.getHotel();
    this.user = this.restRoom.getRoom();
  }

  ngOnInit(): void {
    
  }

  onSubmit(createReservation){
    this.restReservation.createReservation(this.reservation,this.user,this.hotel,this.room).subscribe((res:any) => {
      if(res.showReservation){
        alert(res.message);
        createReservation.reset();
        this.route.navigateByUrl('home')
      }else{
        alert(res.message);
      }
    },error => console.log(<any>error))
  }

}



