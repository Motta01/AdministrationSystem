import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements OnInit {
  public title = 'SISTEMA DE ADMINISTRACION DE HONEYPOTS ';
  public user: User;
  public identity = true;
  public token;
  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '');
  }

  ngOnInit() {
    
  }

  public onSubmit() {
    console.log(this.user);
  }
}
