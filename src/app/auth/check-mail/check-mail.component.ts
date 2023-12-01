import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'check-mail',
  templateUrl: './check-mail.component.html',
  styleUrls: ['./check-mail.component.scss']
})
export class CheckMailComponent implements OnInit {

  spinner = false;
  
  constructor() { }

  ngOnInit(): void { }

}
