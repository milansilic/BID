import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  openSearch= false;
  profileOptions = false;

  notificationNumber: number = 12;

  constructor() {}

  ngOnInit(): void {}

  toggleSearch(someValue) {
    
    if (someValue) {      

      // search logic here  

    } else {
      this.openSearch = !this.openSearch;
    }
  }

  openProfileOptions() {
    this.openSearch = false;
    this.profileOptions ? this.profileOptions = false : this.profileOptions = true;
  }

  signOut() {
    this.profileOptions = false;
  }
  
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.openSearch = false;
  }
}