import { Component } from '@angular/core';

@Component({
  selector: 'app-view-plant',
  templateUrl: './view-plant.component.html',
  styleUrls: ['./view-plant.component.css']
})
export class ViewPlantComponent {


  editMode!: boolean;



  ngOnInit(): void {
    this.editMode = false;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

}
