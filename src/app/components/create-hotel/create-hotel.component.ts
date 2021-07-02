import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../models/hotel';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.css']
})
export class CreateHotelComponent implements OnInit {
  public hotel:Hotel;
  public userLogg;

  constructor(private restHotel : RestHotelService, private restUser:RestUserService, private route : Router) { 
    this.hotel = new Hotel('','','','','','','',null,'','',[],[]);
    this.userLogg = this.restUser.getUser();
  }

  ngOnInit(): void {
  }

  onSubmit(statusForm){
    this.restHotel.createHotel(this.hotel, this.userLogg._id).subscribe((res:any) => {
      if(res.hotelSaved){
        alert(res.message);
        this.hotel = new Hotel('','','','','','','',null,'','',[],[]);
        statusForm.reset();
        this.route.navigateByUrl('hotel');
      }else{
        alert(res.message);
      }
      
    },
    error => alert(error.error.message));
  }

  volver(){
    this.route.navigateByUrl('hotel');
  }
}
