import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { RestReservationService } from 'src/app/services/restReservation/rest-reservation.service';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  public reservation: Reservation;
  public pass;
  public user;
  public possiblePass;
  public token;
  public uri: string;

  constructor(private restReservation: RestReservationService,
    private router: Router) {
    this.pass = '';
    this.user = this.restReservation.getReservation();
    this.token = this.restReservation.getToken();
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.restReservation.updateReservation(this.user._id,this.reservation._id).subscribe((res:any) => {
      if(res.updateReservation){
        localStorage.setItem('reservation', JSON.stringify(res.updateReservation))
        alert(res.message)
      }else{
        alert(res.message);
        this.reservation;
      }
    },
      (error:any) => alert(error.error.message)
    )
  }

  removeReservation(){
    this.restReservation.removeReservation(this.reservation._id, this.pass).subscribe((res:any) => {
      if(!res.reservationRemoved){
        alert(res.message)
      }else{
        alert(res.message);
        localStorage.clear();
        this.router.navigateByUrl('home');
      }
    },
    (error:any) => alert(error.error.message)
    )
  }
}
