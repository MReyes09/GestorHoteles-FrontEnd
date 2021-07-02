import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { User } from 'src/app/models/user';
import { RestEventService } from 'src/app/services/restEvent/rest-event.service';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { Event } from '../../models/event';

@Component({
  selector: 'create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  public user : User;
  public hotel : Hotel;
  public userLogg;
  public hotelSelected;

  public event : Event;
  constructor(private restEvent : RestEventService, private restUser : RestUserService, private restHotel : RestHotelService, private router: Router) {
    this.event = new Event('','','',null,'',[]); //preguntar
    this.userLogg = this.restUser.getUser();
    this.hotelSelected = this.restHotel.getHotel();
   }

  ngOnInit(): void {
  }

  onSubmit(createEvent){
    console.log(this.event);
    
    this.restEvent.createEvent(this.userLogg._id, this.hotelSelected._id, this.event).subscribe((res: any)=>{
      if(res.saveEvent){
        alert(res.message);          
        this.router.navigateByUrl('profileHotel');
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message));
    
  }

}
