export interface Task {
    id: string;
    title: string;
    done: boolean;
}

export interface TaskSortOption {
    item: keyof Task;
    order: 'Ascending' | 'Descending';
}

export const TaskSortOptionRange = {
    items: ['title', 'done'] as TaskSortOption['item'][],
    order: ['Ascending', 'Descending'] as TaskSortOption['order'][]
};
