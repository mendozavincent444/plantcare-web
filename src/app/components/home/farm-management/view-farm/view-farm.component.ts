import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FarmManagementService } from '../farm-management.service';
import { Farm } from 'src/app/shared/models/farm';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { ArduinoBoard } from 'src/app/shared/models/arduino-board';
import { HardwareManagementService } from '../../hardware-management/hardware-management.service';
import { aR } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-view-farm',
  templateUrl: './view-farm.component.html',
  styleUrls: ['./view-farm.component.css']
})
export class ViewFarmComponent implements OnInit {

  admins: User[];
  editFarmForm: FormGroup;
  editMode!: boolean;
  farm: Farm;
  farmId: number;
  arduinoBoards: ArduinoBoard[];

  constructor(
    private route: ActivatedRoute,
    private farmService: FarmManagementService,
    private hardwareManagementService: HardwareManagementService
  ) {

  }

  ngOnInit(): void {
    this.editMode = false;

    this.farmId = this.route.snapshot.params["farm-id"];

    this.farmService.getFarmById(this.farmId).subscribe(data => {
      this.farm = data;
      this.initializeEditFarmForm(this.farm);
    });

    this.farmService.getAdminsByFarmId(this.farmId).subscribe(data => {
      this.admins = data;
    });

    this.hardwareManagementService.getAllArduinoBoardsByFarmId(this.farmId).subscribe(data => {
      this.arduinoBoards = data;
    })
  }

  filterInactiveArduinoBoards() {
    const arduinoBoards = this.arduinoBoards.slice();

    const filterInactiveArduinoBoards = arduinoBoards.filter(arduinoBoard => arduinoBoard.status === "INACTIVE");

    return filterInactiveArduinoBoards;
  }

  private initializeEditFarmForm(farm: Farm) {
    this.editFarmForm = new FormGroup({
      "farmName": new FormControl(farm.name, Validators.required),
      "farmLocation": new FormControl(farm.location, Validators.required),
      "farmOwner": new FormControl(""),
      "arduinoBoard": new FormControl(""),
    });
  }

  get farmName() {
    return this.editFarmForm.controls["farmName"];
  }

  get farmLocation() {
    return this.editFarmForm.controls["farmLocation"];
  }


  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onEditFarm() {
    const editFarmFormValues = this.editFarmForm.value;

    const updatedFarm = new Farm(
      this.farmId,
      editFarmFormValues.farmLocation,
      editFarmFormValues.farmName
    )


    this.farmService.updateFarm(updatedFarm, this.farmId, editFarmFormValues.farmOwner).subscribe(data => {
      // fix - receive data
      console.log(data);
      this.toggleEditMode();
      this.ngOnInit();
    });

    this.farmService.setMainArduinoBoard(this.farmId, editFarmFormValues.arduinoBoard).subscribe(data => {
      // fix - receive data
      console.log(data);
      this.toggleEditMode();
      this.ngOnInit();
    })
  }

  getArduinoBoardName(): string {
    const arduinoBoardId = this.farm.mainArduinoBoardId;

    let arduinoBoard = this.arduinoBoards.find(arduinoBoard => arduinoBoard.id == arduinoBoardId);
    return arduinoBoard.name;
  }

  onRemoveMainArduinoBoard() {
    this.farmService.removeMainArduinoBoard(this.farmId).subscribe(data => {
      // fix - receive data
      console.log(data);
      this.toggleEditMode();
      this.ngOnInit();
    })
  }



}
