import { Component, OnInit } from '@angular/core';
import { StationService } from '../../Services/station-service';
import { IStation } from '../../Models/istation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-station',
  imports: [CommonModule],
  templateUrl: './station.html',
  styleUrl: './station.css'
})
export class Station implements OnInit{


  stations : IStation[] = [];
  constructor(private stationService: StationService) { 

  }
  ngOnInit(): void {
    this.loadStations();
  }


  loadStations(): void {
    this.stationService.getStations().subscribe((data) => {
    this.stations = data;
  });
}

}
