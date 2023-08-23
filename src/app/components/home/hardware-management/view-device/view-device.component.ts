import { Component } from '@angular/core';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.css']
})
export class ViewDeviceComponent {
  editMode!: boolean;


  ngOnInit(): void {
    this.editMode = false;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

}
