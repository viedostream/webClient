import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PanelComponent } from './panel/panel.component';
// import { ReceiverComponent } from './receiver/receiver.component';
// import { SenderComponent } from './sender/sender.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  // {
  //   path: "",
  //   component: 
  // },
  // {
  //   path: "connect",
  //   component: SenderComponent
  // },
  {
    path: "user",
    component: UserComponent
  },
  {
    path: "panel",
    component: PanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
