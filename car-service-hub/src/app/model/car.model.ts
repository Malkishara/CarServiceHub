import { Job } from './job.model';

export class Car {
  constructor(
    public id: number,
    public model: string,
    public registration: string,
    public jobs: Job[] = []
  ) {}
}
