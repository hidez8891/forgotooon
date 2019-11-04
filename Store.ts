import { useState } from 'react';

export interface Todo {
    description: string
    done: boolean
}

interface State {
    todos: Todo[]
}

interface Getters {
    todos: Array<Todo & { id: number }>
}

interface Actions {
    add(description: string): void
    update(id: number, done: boolean): void
    remove(id: number): void
}

export type Store = Getters & Actions;

export const useTodo = (): Getters & Actions => {
    const [state, setState] = useState<State>({
        todos: [
            { description: "text1", done: false },
            { description: "text2", done: false },
        ]
    });
    const { todos } = state;

    function add(description: string) {
        setState({
            todos: [...todos, { description, done: false }]
        });
    }

    function update(id: number, done: boolean) {
        setState({
            todos: todos.map((v, i) => (i !== id) ? v : { ...v, done })
        });
    }

    function remove(id: number) {
        setState({
            todos: todos.filter((v, i) => i !== id)
        });
    }

    return {
        todos: todos.map((v, id) => ({ ...v, id })),
        add,
        update,
        remove,
    };
};
