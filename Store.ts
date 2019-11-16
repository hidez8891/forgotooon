import { useState } from 'react';
import uuid from 'uuid/v1';

export interface Todo {
    description: string;
    done: boolean;
    id: string;
}

export type SortOptionT = {
    item: keyof Todo;
    order: 'Ascending' | 'Descending';
};

export const SortOptionV = {
    items: ['description', 'done'] as SortOptionT['item'][],
    order: ['Ascending', 'Descending'] as SortOptionT['order'][]
};

interface State {
    todos: Todo[];
    sortOpts: SortOptionT;
}

interface Getters {
    todos: Array<Todo>;
    sortOpts: SortOptionT;
}

interface Actions {
    add(description: string): void;
    update(id: string, done: boolean): void;
    remove(id: string): void;
    setSortOpts(opts: Partial<SortOptionT>): void;
}

export type Store = Getters & Actions;

export const useTodo = (): Getters & Actions => {
    const [state, setState] = useState<State>({
        todos: [],
        sortOpts: {
            item: 'id',
            order: 'Ascending'
        }
    });
    const { todos, sortOpts } = state;

    function add(description: string) {
        const id = uuid();
        setState({
            ...state,
            todos: [...todos, { id, description, done: false }]
        });
    }

    function update(id: string, done: boolean) {
        setState({
            ...state,
            todos: todos.map(v => (v.id !== id ? v : { ...v, done }))
        });
    }

    function remove(id: string) {
        setState({
            ...state,
            todos: todos.filter(v => v.id !== id)
        });
    }

    function setSortOpts(opts: Partial<SortOptionT>) {
        setState({
            ...state,
            sortOpts: { ...sortOpts, ...opts }
        });
    }

    function _cmp(a: Todo, b: Todo): number {
        const { item, order } = sortOpts;
        const ret = a[item] === b[item] ? 0 : a[item] < b[item] ? -1 : 1;
        return order === 'Ascending' ? ret : -ret;
    }

    return {
        todos: todos.slice().sort(_cmp),
        add,
        update,
        remove,
        sortOpts,
        setSortOpts
    };
};
