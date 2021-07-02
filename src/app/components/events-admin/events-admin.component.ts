import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { RestEventService } from 'src/app/services/restEvent/rest-event.service';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'events-admin',
  templateUrl: './events-admin.component.html',
  styleUrls: ['./events-admin.component.css']
})
export class EventsAdminComponent implements OnInit {
  user; 
  events: [];
  hotel;
  public eventSelected : Event

  constructor(private restHotel: RestHotelService, private restEvent : RestEventService, private restUser: RestUserService, private route: Router) {

   }

  ngOnInit(): void {
    this.eventSelected = new Event('','','',null, '', []);
    this.hotel = this.restHotel.getHotel();
    this.listEvents();
  }


  listEvents(){
    this.restEvent.listEvent(this.hotel._id).subscribe((res: any)=>{
      if(res.eventsFind){
        this.events = res.eventsFind;
        delete this.eventSelected.hotel;
      }else{
        alert(res.message);
      }
    });
  }

  obtenerData(event){
    this.eventSelected = event;
    localStorage.setItem('event', JSON.stringify(this.eventSelected));
    
    this.route.navigateByUrl('profileEvent');
  }
}
