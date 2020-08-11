import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  userList: {
    username: string,
    geo: string
  }[] = [
      {
        username: 'miladm',
        geo: '1546545 X 5456415'
      },
      {
        username: 'mohammadreza',
        geo: '1546545 X 5456415'
      },
      {
        username: 'meysam',
        geo: '1546545 X 5456415'
      }
    ];


  constructor() { }

  ngOnInit(): void {
  }

}
