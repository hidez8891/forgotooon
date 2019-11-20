import React from 'react';
import { useState, useEffect } from 'react';
import uuid from 'uuid/v1';

import * as Model from '../interfaces/models/task';
import * as UseCase from '../interfaces/usecase/task';
import { Storage } from '../interfaces/repository/storage';

type TaskContextType = UseCase.TaskReader &
    UseCase.TaskWriter &
    UseCase.TaskSorter;

const useTask = (repo: Storage): TaskContextType => {
    const defaultValue: {
        tasks: Array<Model.Task>;
        options: Model.TaskSortOption;
        processed_tasks: Array<Model.Task>;
    } = {
        tasks: [],
        options: { item: 'title', order: 'Ascending' },
        processed_tasks: []
    };

    const [state, setState] = useState<typeof defaultValue>(defaultValue);

    async function loadStorage() {
        const load_tasks = await repo.load<Array<Model.Task>>(
            { key: 'tasks' },
            defaultValue.tasks
        );
        const load_options = await repo.load<Model.TaskSortOption>(
            { key: 'sort' },
            defaultValue.options
        );

        setState({
            tasks: load_tasks,
            options: load_options,
            processed_tasks: processed(load_tasks, load_options)
        });
    }

    useEffect(() => {
        loadStorage();
    }, []);

    function genCompare(options: Model.TaskSortOption) {
        return function(a: Model.Task, b: Model.Task): number {
            const { item, order } = options;
            const ret = a[item] === b[item] ? 0 : a[item] < b[item] ? -1 : 1;
            return order === 'Ascending' ? ret : -ret;
        };
    }

    function processed(
        tasks: Array<Model.Task>,
        options: Model.TaskSortOption
    ): Array<Model.Task> {
        return tasks.slice().sort(genCompare(options));
    }

    function taskCreate(title: string): void {
        const id = uuid();
        const new_tasks = [...state.tasks, { id, title, done: false }];
        repo.save({ key: 'tasks', data: new_tasks }).then(() =>
            setState(prevState => {
                return {
                    ...prevState,
                    tasks: new_tasks,
                    processed_tasks: processed(new_tasks, prevState.options)
                };
            })
        );
    }

    function taskUpdate(id: string, done: boolean): void {
        const new_tasks = state.tasks.map(v =>
            v.id !== id ? v : { ...v, done }
        );
        repo.save({ key: 'tasks', data: new_tasks }).then(() =>
            setState(prevState => {
                return {
                    ...prevState,
                    tasks: new_tasks,
                    processed_tasks: processed(new_tasks, prevState.options)
                };
            })
        );
    }

    function taskDelete(id: string): void {
        const new_tasks = state.tasks.filter(v => v.id !== id);
        repo.save({ key: 'tasks', data: new_tasks }).then(() =>
            setState(prevState => {
                return {
                    ...prevState,
                    tasks: new_tasks,
                    processed_tasks: processed(new_tasks, prevState.options)
                };
            })
        );
    }

    function sortUpdate(opts: Partial<Model.TaskSortOption>): void {
        const new_options = { ...state.options, ...opts };
        repo.save({ key: 'sort', data: new_options }).then(() =>
            setState(prevState => {
                return {
                    ...prevState,
                    options: new_options,
                    processed_tasks: processed(prevState.tasks, new_options)
                };
            })
        );
    }

    return {
        tasks: state.processed_tasks,
        taskCreate,
        taskUpdate,
        taskDelete,
        options: state.options,
        sortUpdate
    };
};

const Context = React.createContext<{ tasks: TaskContextType }>({} as any);
const { Provider } = Context;

interface ProviderProps {
    repositry: Storage;
}

export const TaskContextProvider: React.FC<ProviderProps> = props => {
    const { repositry, children } = props;
    const tasks = useTask(repositry);
    return <Provider value={{ tasks }}>{children}</Provider>;
};

export const useTaskContext = (): TaskContextType => {
    const { tasks } = React.useContext(Context);
    return tasks;
};
