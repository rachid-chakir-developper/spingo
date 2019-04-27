import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-resadetails',
  templateUrl: './resadetails.component.html',
  styleUrls: ['./resadetails.component.scss'],
})
export class ResadetailsComponent implements OnInit {
@Input() reservations;

  constructor() { }

  ngOnInit() {
    console.log(this.reservations);
  }

}
