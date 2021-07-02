import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { RestEventService } from 'src/app/services/restEvent/rest-event.service';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'profile-event',
  templateUrl: './profile-event.component.html',
  styleUrls: ['./profile-event.component.css']
})
export class ProfileEventComponent implements OnInit {
  public possiblePass;
  public token;
  public eventSelected : Event;
  public event;
  public user;
  public hotel;
  constructor(private restEvent : RestEventService, private restHotel : RestHotelService, private restUser : RestUserService, private route: Router) {
    this.possiblePass = '';
    this.token = this.restUser.getToken();
    
   }

  ngOnInit(): void {
    this.event = this.restEvent.getLocalStorageEvent();
    this.hotel = this.restHotel.getHotel();
    this.user = this.restUser.getUser();
    this.eventSelected = new Event('','','',null, '',[]);
    console.log(this.eventSelected);
  }

  onSubmit(updateEvent){
    this.restEvent.updateEvent(this.user._id, this.hotel._id, this.event._id, updateEvent.value).subscribe((res:any)=>{
      if(res.eventUpdated){
        alert(res.message);
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message));
  }

  borrarStorage(){
    localStorage.removeItem('event');
  }

  deleteEvent(){
    this.restEvent.deleteEvent(this.user._id, this.hotel._id, this.event._id).subscribe((res: any)=>{
      if(res.eventDelete){
        alert(res.message);
        localStorage.removeItem('event');
        this.route.navigateByUrl('profileHotel');
      }else{
        alert(res.message);
      }
    })
  }
}

