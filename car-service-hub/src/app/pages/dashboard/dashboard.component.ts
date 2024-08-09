import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCarComponent } from "../../components/add-car/add-car.component";
import { DisplayCarsComponent } from "../../components/display-cars/display-cars.component";
import { AddJobComponent } from '../../components/add-job/add-job.component';
import { StatisticsComponent } from '../../components/statistics/statistics.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AddCarComponent, DisplayCarsComponent, AddJobComponent, StatisticsComponent, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isModalVisible = false;
  lang = '';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
  }

  showAddCarModal() {
    this.isModalVisible = true;
  }

  hideAddCarModal() {
    this.isModalVisible = false;
  }

  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedLanguage = target.value;

    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage);
  }
}
