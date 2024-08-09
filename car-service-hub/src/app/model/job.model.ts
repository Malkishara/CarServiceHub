export class Job {
  constructor(
    public description: string,
    public status: 'pending' | 'in-progress' | 'completed'
  ) {}
}
