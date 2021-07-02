import { Component, OnInit } from '@angular/core';
import { Reservation } from "../../models/reservation";
import { RestReservationService } from '../../services/restReservation/rest-reservation.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent implements OnInit {
  
    public reservation: Reservation;
    
    constructor(private restReservation:RestReservationService) { }
  
    ngOnInit(): void {
      this.listReservation();
    }
  
    listReservation(){
      this.restReservation.getReservation().subscribe((res:any) => {
        if(res.reservation){
          this.reservation = res.reservation;
          console.log(res.message);
        }else{
          alert(res.message)
        }
      },
      error => alert(error.error.message));
    }

    
}
