import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../model/car.model';
import { AddJobComponent } from '../add-job/add-job.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-display-cars',
  standalone: true,
  imports: [CommonModule, AddJobComponent, TranslateModule],
  templateUrl: './display-cars.component.html',
  styleUrls: ['./display-cars.component.scss']
})
export class DisplayCarsComponent implements OnInit {
  cars: Car[] = [];
  selectedCarId: number | null = null;
  showAddJob = false;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.cars = this.carService.getCars();
  }

  showAddJobForm(carId: number) {
    console.warn(carId);
    this.selectedCarId = carId;
    this.showAddJob = true;
  }

  hideAddJobForm() {
    this.selectedCarId = null;
    this.showAddJob = false;
  }

  updateJobStatus(carId: number, jobIndex: number, event: Event) {
    const target = event.target as HTMLSelectElement;
    const status = target.value as 'pending' | 'in-progress' | 'completed';
    this.carService.updateJobStatus(carId, jobIndex, status);
  }

  onJobAdded() {
    this.hideAddJobForm();
    this.cars = this.carService.getCars();
  }
}
