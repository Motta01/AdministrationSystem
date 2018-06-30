import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import { windowTime } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements OnInit {
  public title = 'SISTEMA DE ADMINISTRACION DE HONEYPOTS ';
  public user: User;
  public identity = null;
  public token;
  public errorMessage = null;
  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '');
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public shutDown(){  
    window.location.reload();
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    localStorage.clear;
    this.identity=null;
    this.token = null;
   
  }

  public onSubmit() {
    this.errorMessage = null;
    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;
        if (!this.identity._id) {
          alert("El usuario no esta correctamente identificado");
        } else {
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;
              if (this.token.length <= 0) {
                alert("El token no esta correctamente identificado");
              } else {
                localStorage.setItem('token', this.token);
              }
            },
            error => {
              if (error != null) {
                this.identity = false;
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
              }
            }
          );

        }
      },
      error => {
        if (error != null) {
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
        }
      }
    );
  }
}
