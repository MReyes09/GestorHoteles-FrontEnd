import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../models/hotel';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  hotels: [];
  user;
  hotelSelect: Hotel;

  constructor(private restUser: RestUserService, private restHotel:RestHotelService, private route:Router) { }

  ngOnInit(): void {
    this.hotelSelect = new Hotel('','','','','','','',null,'','',[],[]);
    this.user = this.restUser.getUser();
    this.listHotels();    
  }

  listHotels(){
    this.restHotel.getHotelsAdmin(this.user._id).subscribe((res:any) => {
      if(res.hotelsFind){
        this.hotels = res.hotelsFind;
        delete this.hotelSelect.user;
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message)
    )
  }

  obtenerData(hotel){
    this.hotelSelect = hotel;
    delete this.hotelSelect.user;
    localStorage.setItem('hotel', JSON.stringify(this.hotelSelect));
    this.route.navigateByUrl('profileHotel')
  }

  createHotelRef(){
    this.route.navigateByUrl('createHotel');
  }
}
