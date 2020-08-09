import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ReceiverComponent } from './receiver/receiver.component';
import { SenderComponent } from './sender/sender.component';

const routes: Routes = [
  {
    path: "",
    component: ReceiverComponent
  },
  {
    path: "connect",
    component: SenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
