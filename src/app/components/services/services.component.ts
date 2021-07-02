import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { RestServiceService } from 'src/app/services/restService/rest-service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services:[];
  hotel;
  servicesSelect: Service;

  constructor(private resService:RestServiceService) { }

  ngOnInit(): void {
    this.servicesSelect = new Service('','',null);
    //Se espera un servicio para obtener hotel;
    this.services = this.hotel.services;
    console.log(this.services);
  }

}
