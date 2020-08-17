import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CallComponent } from './call/call.component';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PanelComponent } from './panel/panel.component';
// import { ReceiverComponent } from './receiver/receiver.component';
// import { SenderComponent } from './sender/sender.component';
import { UserComponent } from './user/user.component';
import { ZixoComponent } from './zixo/zixo.component';
@NgModule({
  declarations: [
    AppComponent,
    // SenderComponent,
    // ReceiverComponent,
    UserComponent,
    PanelComponent,
    ZixoComponent,
    CallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
