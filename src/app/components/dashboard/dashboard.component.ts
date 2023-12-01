import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  spinner = false;
  finishOnboardingValue = '17659'.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  numberOfVehicles = '57'.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
}