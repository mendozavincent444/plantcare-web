import { Component } from '@angular/core';

@Component({
  selector: 'app-view-farmer',
  templateUrl: './view-farmer.component.html',
  styleUrls: ['./view-farmer.component.css']
})
export class ViewFarmerComponent {
  editMode!: boolean;


  ngOnInit(): void {
    this.editMode = false;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
}
