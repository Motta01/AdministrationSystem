import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {ReportComponent} from './components/report.component';
import {Dashboards} from './components/dashboards.component';
import {Configs } from './components/configs.component';
import {Init} from './components/init.component';
import {Admin} from './components/admin.component';
import {SaveRec} from './components/saveRec.component';


@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    Dashboards,
    Configs,
    Init,
    Admin,
    SaveRec,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
