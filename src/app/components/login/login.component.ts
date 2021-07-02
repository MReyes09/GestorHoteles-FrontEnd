import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { RestUserService } from '../../services/restUser/rest-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  token: string;
  userLogged: any;

  constructor(private restUser:RestUserService, private route: Router) { 
    this.user = new User('','','','','',null,'','','');
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.restUser.login(this.user, 'true').subscribe((res:any)=>{
      this.userLogged = res.user;
      if(!res.token){
        alert(res.message);
      }else{
        this.token = res.token;
        delete this.userLogged.password;
        if(this.token.length <= 0){
          alert('El token no se genero de manera correcta');
        }else{
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.userLogged));
          alert('Usuario logeado correctamente');
          this.route.navigateByUrl('home');
        }
      }
    },
      (error:any) => alert(error.error.message)
    )
  }
}
