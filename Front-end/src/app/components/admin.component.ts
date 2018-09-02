import { Component, OnInit} from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';



@Component({
    selector: 'admin_view',
    templateUrl: '../views/admin/admin.html',
    styleUrls: ['../views/admin/admin.css']
})

export class Admin implements OnInit {
 private user;
 private list_users;
    constructor(private _userService:UserService){
        this.user = new User('','','','');
        this.list_users =[];
    }
    ngOnInit(){
        this.showUser();
    }

    public agregar(){
        if(this.user.password!=null && this.user.name!=null && this.user.userName!=null){
            this._userService.save(this.user).subscribe(
                response=>{
                    if(response!=null){
                        this.showUser();
                    }
                },
                error=>{
                    console.log(error);
                }
            );
        }else{
        }
        this.user = new User('','','','');
    }
    public delete(_id){
        this._userService.delete(_id).subscribe(
            response=>{
                if(response!=null){
                    this.showUser();
                }
            },
            error=>{
                console.log(error);
            }
        )
    }

    public showUser(){
        this._userService.getUsers().subscribe(
            response=>{
                this.list_users= response.users;
            },error=>{
                console.log(error);
            }
            
        );
    }

}