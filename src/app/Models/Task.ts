export class Task{
    id?: string;
    name!: string;
    description!: string;
    status!: TaskStatus;
    created_at!: string;
    updated_at?: string;
}


export enum TaskStatus {
    Pending = 'pending',
    Started = 'started',
    InProgress = 'in-progress',
    Completed = 'completed'
  }