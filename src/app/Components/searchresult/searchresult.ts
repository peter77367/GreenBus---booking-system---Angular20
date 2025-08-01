import { Component, OnInit } from '@angular/core';
import { ITrip } from '../../Models/itrip';
import { ActivatedRoute } from '@angular/router';
import { Trip } from '../../Services/trip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchresult',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchresult.html',
  styleUrl: './searchresult.css'
})
export class Searchresult implements OnInit {
  stations: string[] = [];
  from = '';
  to = '';
  date = '';
  trips: ITrip[] = [];

selectedTrip: ITrip | null = null;
selectedSeat: string | null = null;
showModal: boolean = false;

openSeatModal(trip: ITrip) {
  this.selectedTrip = trip;
  this.showModal = true;
}


// confirmSeat() {
//   if (this.selectedTrip && this.selectedSeat) {
//     this.selectedTrip.selectedSeat = this.selectedSeat;
//     this.showModal = false;
//     this.selectedSeat = null;
//   }
// }


  constructor(private route: ActivatedRoute, private tripService: Trip) {}

  ngOnInit(): void {
    this.tripService.getStations().subscribe(data => {
      this.stations = data;
    });

    this.route.queryParams.subscribe(params => {
      this.from = params['from'];
      this.to = params['to'];
      this.date = params['date'];
      this.performSearch();
    });
  }

  performSearch(): void {
    this.tripService.getTrips().subscribe(allTrips => {
      this.trips = allTrips.filter(t =>
        t.from === this.from &&
        t.to === this.to &&
        t.date === this.date
      );
    });
  }

  searchAgain(): void {
    this.performSearch();
  }
}
