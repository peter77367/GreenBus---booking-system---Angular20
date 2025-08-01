import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Trip } from '../../Services/trip';
import { ITrip } from '../../Models/itrip';
import { Router} from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CommonModule , FormsModule ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  stations: string[] = [];
  fromStation: string = '';
  toStation: string = '';
  travelDate: string = '';
  allTrips: ITrip[] = [];
  filteredTrips: ITrip[] = [];

 constructor(private tripService: Trip , private router: Router) {}

  ngOnInit(): void {
    
    this.tripService.getTrips().subscribe(data => {
      this.allTrips = data;
    });


    this.tripService.getStations().subscribe(stations => {
      this.stations = stations;
    });
  }



  searchTrip(): void {
  this.router.navigate(['/searchresult'], {

    queryParams: {

      from: this.fromStation,

      to: this.toStation,

      date: this.travelDate
    }
  });
}

navigateToSearch(): void {

  this.router.navigate(['/searchresult'], {

    queryParams: {
      from: this.fromStation,
      to: this.toStation,
      date: this.travelDate
    }
  });
}

}
  

