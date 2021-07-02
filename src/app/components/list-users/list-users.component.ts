import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: []
  search;
  user;

  constructor(private resUser:RestUserService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(){
    this.resUser.getUsers().subscribe((res:any) => {
      if(res.users){
        this.users = res.users;
        console.log(res.message);
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message));
  }

}
