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
    constructor(private _userService:UserService){
        this.user = new User('','','','');
    }
    ngOnInit(){
    }

    public agregar(){
        if(this.user.password!=null && this.user.name!=null && this.user.userName!=null){
            this._userService.save(this.user).subscribe(
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
            error=>{
                console.log(error);
            }
        )
    }

}