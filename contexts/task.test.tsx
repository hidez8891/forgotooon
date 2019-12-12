import React from 'react';
import { Text } from 'react-native';
import {
    cleanup,
    render,
    wait,
    waitForElement,
    waitForElementToBeRemoved
} from '@testing-library/react-native';

import { Task, TaskSortOption } from '../interfaces/models/task';
import { Storage } from '../interfaces/repository/storage';

import { TaskContextProvider, useTaskContext } from './task';

class MockRepositry implements Storage {
    readCounts: number;
    datas: Map<string, any>;
    constructor() {
        this.datas = new Map<string, any>();
        this.readCounts = 0;
    }

    async load<T>(params: { key: string }, defaultValue?: T): Promise<T> {
        this.readCounts++;

        const { key } = params;
        if (this.datas.has(key)) return this.datas.get(key);
        return defaultValue;
    }

    async save(params: { key: string; data: any }): Promise<void> {
        const { key, data } = params;
        this.datas.set(key, data);
        return;
    }
}

const MockConsumer: React.FC = () => {
    // test render
    const { tasks } = (usecase = useTaskContext());
    return (
        <>
            {tasks.length !== 0 ? (
                tasks.map(v => <Text key={v.id}>{v.title}</Text>)
            ) : (
                <Text>Loading...</Text>
            )}
        </>
    );
};

let usecase: ReturnType<typeof useTaskContext> = null;
let mockRepositry: MockRepositry = null;

beforeEach(() => {
    usecase = null;
    mockRepositry = new MockRepositry();
});

afterEach(() => {
    cleanup();
});

describe('TaskContext', () => {
    it('implements TaskReader.tasks', async () => {
        const tests: Array<Task> = [
            { id: '0', title: 'item-0', done: false },
            { id: '1', title: 'item-1', done: true },
            { id: '2', title: 'item-2', done: false }
        ];
        mockRepositry.datas.set('tasks', tests);

        const { getByText } = render(
            <TaskContextProvider repositry={mockRepositry}>
                <MockConsumer />
            </TaskContextProvider>
        );
        await waitForElementToBeRemoved(() => getByText('Loading...'));

        expect(usecase.tasks).not.toBeUndefined();
        expect(usecase.tasks.length).toBe(tests.length);

        tests.forEach((t, i) => {
            expect(usecase.tasks[i]).toEqual(t);
        });
    });

    it('implements TaskWriter.taskCreate', async () => {
        const tests: Array<Task> = [
            { id: '0', title: 'item-0', done: false },
            { id: '1', title: 'item-1', done: true },
            { id: '2', title: 'item-2', done: false }
        ];

        const { getByText } = render(
            <TaskContextProvider repositry={mockRepositry}>
                <MockConsumer />
            </TaskContextProvider>
        );
        await waitForElement(() => getByText('Loading...'));

        for (let i = 0; i < tests.length; i++) {
            usecase.taskCreate(tests[i].title);
            await waitForElement(() => getByText(tests[i].title));
        }

        expect(usecase.tasks.length).toBe(tests.length);
        tests.forEach((t, i) => {
            expect(usecase.tasks[i].title).toEqual(t.title);
        });

        const tasks = mockRepositry.datas.get('tasks');
        expect(tasks.length).toBe(tests.length);
        tests.forEach((t, i) => {
            expect(tasks[i].title).toEqual(t.title);
        });
    });

    it('implements TaskWriter.taskUpdate', async () => {
        const tests: Array<Task> = [
            { id: '0', title: 'item-0', done: false },
            { id: '1', title: 'item-1', done: true },
            { id: '2', title: 'item-2', done: false }
        ];
        mockRepositry.datas.set('tasks', tests);

        const { getByText } = render(
            <TaskContextProvider repositry={mockRepositry}>
                <MockConsumer />
            </TaskContextProvider>
        );
        await waitForElementToBeRemoved(() => getByText('Loading...'));

        for (let i = 0; i < tests.length; i++) {
            usecase.taskUpdate(tests[i].id, !tests[i].done);
            await wait();
        }

        expect(usecase.tasks.length).toBe(tests.length);
        tests.forEach((t, i) => {
            expect(usecase.tasks[i].done).toEqual(!t.done);
        });

        const tasks = mockRepositry.datas.get('tasks');
        expect(tasks.length).toBe(tests.length);
        tests.forEach((t, i) => {
            expect(tasks[i].done).toEqual(!t.done);
        });
    });

    it('implements TaskWriter.taskDelete', async () => {
        const tests: Array<Task> = [
            { id: '0', title: 'item-0', done: false },
            { id: '1', title: 'item-1', done: true },
            { id: '2', title: 'item-2', done: false }
        ];
        mockRepositry.datas.set('tasks', tests);

        const { getByText } = render(
            <TaskContextProvider repositry={mockRepositry}>
                <MockConsumer />
            </TaskContextProvider>
        );
        await waitForElementToBeRemoved(() => getByText('Loading...'));

        for (let i = 0; i < tests.length; i++) {
            usecase.taskDelete(tests[i].id);
            await waitForElementToBeRemoved(() => getByText(tests[i].title));
        }
        expect(usecase.tasks.length).toBe(0);

        const tasks = mockRepositry.datas.get('tasks');
        expect(tasks.length).toBe(0);
    });

    it('implements TaskSorter', async () => {
        const tests: Array<Task> = [
            { id: '2', title: 'item-0', done: false },
            { id: '1', title: 'item-1', done: true },
            { id: '0', title: 'item-2', done: false }
        ];
        mockRepositry.datas.set('tasks', tests);

        const options: TaskSortOption = {
            item: 'title',
            order: 'Ascending'
        };
        mockRepositry.datas.set('sort', options);

        const { getByText } = render(
            <TaskContextProvider repositry={mockRepositry}>
                <MockConsumer />
            </TaskContextProvider>
        );
        await waitForElementToBeRemoved(() => getByText('Loading...'));

        expect(usecase.options.item).toEqual(options.item);
        expect(usecase.options.order).toEqual(options.order);
        tests.forEach((t, i) => {
            expect(usecase.tasks[i].title).toEqual(t.title);
        });

        usecase.sortUpdate({ item: 'id' });
        await wait();
        expect(usecase.options.item).toEqual('id');
        expect(usecase.options.order).toEqual(options.order);
        tests.forEach((t, i) => {
            expect(usecase.tasks[tests.length - 1 - i].title).toEqual(t.title);
        });

        usecase.sortUpdate({ order: 'Descending' });
        await wait();
        expect(usecase.options.item).toEqual('id');
        expect(usecase.options.order).toEqual('Descending');
        tests.forEach((t, i) => {
            expect(usecase.tasks[i].title).toEqual(t.title);
        });

        const sortopt = mockRepositry.datas.get('sort');
        expect(sortopt.item).toEqual('id');
        expect(sortopt.order).toEqual('Descending');
    });
});
