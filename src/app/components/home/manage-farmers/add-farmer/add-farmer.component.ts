import { Component } from '@angular/core';

@Component({
  selector: 'app-add-farmer',
  templateUrl: './add-farmer.component.html',
  styleUrls: ['./add-farmer.component.css']
})
export class AddFarmerComponent {

  
  onUploadFarmers() {
    document.getElementById('fileInput')?.click();
  }

}
