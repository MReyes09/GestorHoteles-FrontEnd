import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
import { RestUserService } from '../../services/restUser/rest-user.service';
import { CONNECTION } from 'src/app/services/global';
import { RestServiceService } from 'src/app/services/restService/rest-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-service',
  templateUrl: './profile-service.component.html',
  styleUrls: ['./profile-service.component.css']
})
export class ProfileServiceComponent implements OnInit {
  public service:Service;
  public possibleService;
  public possiblePass;
  public uri:string;
  public hotel;
  public user;

  constructor(private route:Router, private restHotel: RestHotelService, private restUser: RestUserService, private restService: RestServiceService) {
    this.possiblePass = '';
    this.possibleService = '';
    this.uri = CONNECTION.URI;    
  }

  ngOnInit(): void {
    this.service = this.restService.getService();
    this.hotel = this.restHotel.getHotel();
    this.user = this.restUser.getUser();
  }

  onSubmit(){
    this.restService.updateService(this.service,this.hotel._id,this.user._id,this.service._id).subscribe((res:any) => {
      if(res.serviceupdate){
        localStorage.setItem('service', JSON.stringify(res.serviceupdate))
        alert(res.message);
      }else{
        alert(res.message);
        this.service = this.restService.getService();
      }
    },
    (error:any) => alert(error.error.message))
  }

  deleteService(){
    this.restService.removeService(this.user._id,
                                  this.hotel._id,
                                  this.service._id,
                                  this.possiblePass, 
                                  this.possibleService).subscribe((res:any) => {
    if(!res.serviceRemoved){
      alert(res.message)
    }else{
      alert(res.message);
      localStorage.removeItem('service');
      this.route.navigateByUrl('profileHotel');
    }
    },
    (error:any) => alert(error.error.message))
  }
}