import { Task, TaskSortOption } from '../models/task';

export interface TaskReader {
    tasks: Array<Readonly<Task>>;
}

export interface TaskWriter {
    taskCreate(title: string): void;
    taskUpdate(id: string, done: boolean): void;
    taskDelete(id: string): void;
}

export interface TaskSorter {
    options: Readonly<TaskSortOption>;
    sortUpdate(options: Partial<TaskSortOption>): void;
}
