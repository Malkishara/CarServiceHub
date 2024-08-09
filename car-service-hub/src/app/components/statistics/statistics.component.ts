import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  totalCars = 0;
  jobsStatusCount = {
    'pending': 0,
    'in-progress': 0,
    'completed': 0
  };

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.calculateStatistics();
  }

  calculateStatistics(): void {
    const cars = this.carService.getCars();
    this.totalCars = cars.length;

    const jobs = cars.flatMap(car => car.jobs || []);
    this.jobsStatusCount.pending = jobs.filter(job => job.status === 'pending').length;
    this.jobsStatusCount['in-progress'] = jobs.filter(job => job.status === 'in-progress').length;
    this.jobsStatusCount.completed = jobs.filter(job => job.status === 'completed').length;
  }
}
