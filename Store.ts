import { useState, useEffect } from 'react';
import uuid from 'uuid/v1';
import { Repositry } from './Repository';

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

export const useTodo = (repo: Repositry): Getters & Actions => {
    const [state, setState] = useState<State>({
        todos: [],
        sortOpts: {
            item: 'id',
            order: 'Ascending'
        }
    });
    const { todos, sortOpts } = state;

    async function initialize() {
        const repo_todos =
            (await repo.load<Todo[]>({ key: 'todos' })) || state.todos;
        const repo_opts =
            (await repo.load<SortOptionT>({ key: 'sortOpts' })) ||
            state.sortOpts;

        setState({
            todos: repo_todos,
            sortOpts: repo_opts
        });
    }

    useEffect(() => {
        initialize();
    }, []);

    function add(description: string) {
        const id = uuid();
        const new_todos = [...todos, { id, description, done: false }];
        setState({ ...state, todos: new_todos });
        repo.save({ key: 'todos', data: new_todos });
    }

    function update(id: string, done: boolean) {
        const new_todos = todos.map(v => (v.id !== id ? v : { ...v, done }));
        setState({ ...state, todos: new_todos });
        repo.save({ key: 'todos', data: new_todos });
    }

    function remove(id: string) {
        const new_todos = todos.filter(v => v.id !== id);
        setState({ ...state, todos: new_todos });
        repo.save({ key: 'todos', data: new_todos });
    }

    function setSortOpts(opts: Partial<SortOptionT>) {
        const new_opts = { ...sortOpts, ...opts };
        setState({ ...state, sortOpts: new_opts });
        repo.save({ key: 'sortOpts', data: new_opts });
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
