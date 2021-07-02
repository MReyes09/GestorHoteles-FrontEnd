import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //formularios y todo lo que lleve consigo, funciones ng
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//My components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CreateReservationComponent } from './components/create-reservation/create-reservation.component';
import { LoginComponent } from './components/login/login.component';
import { RestReservationService } from './services/restReservation/rest-reservation.service';
import { RestUserService } from './services/restUser/rest-user.service';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { CreateAdminComponent } from './components/create-admin/create-admin.component';
import { ServicesComponent } from './components/services/services.component';
import { RestServiceService } from './services/restService/rest-service.service';
import { CreateHotelComponent } from './components/create-hotel/create-hotel.component';
import { RestHotelService } from './services/restHotel/rest-hotel.service';
import { HotelComponent } from './components/hotel/hotel.component';
import { ProfileHotelComponent } from './components/profile-hotel/profile-hotel.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { ProfileServiceComponent } from './components/profile-service/profile-service.component';
import { RestEventService } from './services/restEvent/rest-event.service';
import { EventsAdminComponent } from './components/events-admin/events-admin.component';
import { ProfileEventComponent } from './components/profile-event/profile-event.component';
import { ListReservationComponent } from './components/list-reservation/list-reservation.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { CreateServiceComponent } from './components/create-service/create-service.component';
import { RoomComponent } from './components/room/room.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateReservationComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    ListUsersComponent,
    CreateAdminComponent,
    ServicesComponent,
    CreateHotelComponent,
    HotelComponent,
    ProfileHotelComponent,
    CreateEventComponent,
    EventsAdminComponent,
    ProfileEventComponent,
    ProfileServiceComponent,
    ListReservationComponent,
    ReservationComponent,
    CreateServiceComponent,
    RoomComponent,
    CreateRoomComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [RestUserService, RestServiceService, RestHotelService, RestEventService, RestReservationService],

  bootstrap: [AppComponent]
})
export class AppModule { }
