import { Injectable } from '@angular/core';
import { Car } from '../model/car.model';
import { Job } from '../model/job.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Car[] = [];

  constructor() {
    const savedCars = localStorage.getItem('cars');
    if (savedCars) {
      this.cars = JSON.parse(savedCars);
    } else {
      this.cars = [
        new Car(1, 'Toyota Camry', 'XYZ 123', [
          new Job('Oil Change', 'pending')
        ]),
        new Car(2, 'Honda Accord', 'ABC 456', [
          new Job('Brake Replacement', 'completed')
        ])
      ];
      this.saveCars();
    }
  }

  getCars(): Car[] {
    return this.cars;
  }

  addCar(car: Car) {
    this.cars.push(car);
    this.saveCars();
  }

  addJob(carId: number, job: Job): void {
    const car = this.cars.find(c => c.id === carId);
    if (car) {
      if (!car.jobs) {
        car.jobs = [];
      }
      car.jobs.push(job);
      this.saveCars();
    } else {
      console.error('Car not found!');
    }
  }

  updateJobStatus(carId: number, jobIndex: number, status: 'pending' | 'in-progress' | 'completed') {
    const car = this.cars.find(c => c.id === carId);
    if (car && car.jobs[jobIndex]) {
      car.jobs[jobIndex].status = status;
      this.saveCars();
    } else {
      console.error('Car or Job not found!');
    }
  }

  private saveCars() {
    localStorage.setItem('cars', JSON.stringify(this.cars));
    window.location.reload();
  }
}
