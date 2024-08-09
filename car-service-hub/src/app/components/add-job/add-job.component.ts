import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent {
  @Input() carId!: number;
  @Output() jobAdded = new EventEmitter<void>();

  description = '';
  status: 'pending' | 'in-progress' | 'completed' = 'pending';

  constructor(private carService: CarService) {}

  addJob() {
    if (this.description) {
      const newJob = {
        description: this.description,
        status: this.status
      };
      this.carService.addJob(this.carId, newJob);
      this.jobAdded.emit();
    } else {
      console.error('Job description is required!');
    }
  }
}
