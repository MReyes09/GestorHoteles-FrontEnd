import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { CONNECTION } from 'src/app/services/global';
import { RestServiceService } from 'src/app/services/restService/rest-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {
  public service: Service;
  public hotel;
  public user;

  constructor(private restUser:RestUserService, private restHotel:RestHotelService, private restService:RestServiceService, private route:Router) {
    this.service = new Service('','',null);
  }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.hotel = this.restHotel.getHotel();
  }

  onSubmit(createService){
    this.restService.createService(this.service,this.user._id,this.hotel._id).subscribe((res:any) => {
      if(res.showService){
        alert(res.message);
        createService.reset();
        this.route.navigateByUrl('profileHotel')
      }else{
        alert(res.message);
      }
    },error => console.log(<any>error))
  }
}
