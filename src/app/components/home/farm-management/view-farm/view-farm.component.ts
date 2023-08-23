import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-farm',
  templateUrl: './view-farm.component.html',
  styleUrls: ['./view-farm.component.css']
})
export class ViewFarmComponent implements OnInit {

  editMode!: boolean;


  constructor(private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.editMode = false;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }



}
