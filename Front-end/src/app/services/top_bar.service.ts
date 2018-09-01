import { Injectable } from '@angular/core';

@Injectable()
export class Top_bar_control {
    private navigation_Topbar;
    constructor(){
        this.navigation_Topbar = 0;
    }
    public changeToRegistries(){
        this.navigation_Topbar = 0;

    }
    public changeToDashboards(){
        this.navigation_Topbar = 1;

    }
    public changeToConfigs(){
        this.navigation_Topbar = 2;

    }
    public get_navigation_TopBar(){
        console.log(this.navigation_Topbar);
        return this.navigation_Topbar;
    }
}