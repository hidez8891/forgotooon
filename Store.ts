import { useState } from 'react';
import uuid from 'uuid/v1';

export interface Todo {
    description: string
    done: boolean
    id: string
}

interface State {
    todos: Todo[]
}

interface Getters {
    todos: Array<Todo>
}

interface Actions {
    add(description: string): void
    update(id: string, done: boolean): void
    remove(id: string): void
    sort(cmp: (a: Todo, b: Todo) => number): void
}

export type Store = Getters & Actions;

export const useTodo = (): Getters & Actions => {
    const [state, setState] = useState<State>({ todos: [] });
    const { todos } = state;

    function add(description: string) {
        const id = uuid();
        setState({
            todos: [...todos, { id, description, done: false }]
        });
    }

    function update(id: string, done: boolean) {
        setState({
            todos: todos.map((v) => (v.id !== id) ? v : { ...v, done })
        });
    }

    function remove(id: string) {
        setState({
            todos: todos.filter((v) => v.id !== id)
        });
    }

    function sort(cmp: (a: Todo, b: Todo) => number) {
        setState({
            todos: [...todos.sort(cmp)]
        });
    }

    return {
        todos,
        add,
        update,
        remove,
        sort,
    };
};
