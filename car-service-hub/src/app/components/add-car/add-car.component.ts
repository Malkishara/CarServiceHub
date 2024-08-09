import { Component, EventEmitter, Output } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../model/car.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule,FormsModule,TranslateModule],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent {
  model = '';
  registration = '';
  isVisible = true;
  lang = '';
  newCarId = 0;
  carList: Car[] = [];


  @Output() closeModal = new EventEmitter<void>();

  constructor(private carService: CarService) {}



  onSubmit(event: Event) {
    event.preventDefault();
this.carList=this.carService.getCars();
this.newCarId=this.carList[this.carList.length-1].id +1;
    const newCar = new Car(this.newCarId, this.model, this.registration);
    console.warn(newCar);
    this.carService.addCar(newCar);
    this.close();
  }

  close() {
    this.isVisible = false;
    this.closeModal.emit();
  }


}
