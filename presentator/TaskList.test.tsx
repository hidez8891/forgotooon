import React from 'react';
import renderer from 'react-test-renderer';
import { ListItem } from 'native-base';

import TaskList from './TaskList';
import { Task } from '../interfaces/models/task';
import { TaskReader, TaskWriter } from '../interfaces/usecase/task';

let mockTasks: Array<Task> = [];
let mockTaskUpdate = jest.fn();
let mockTaskDelete = jest.fn();
jest.mock('./contexts/task', () => {
    return {
        useTaskContext: (): TaskReader & TaskWriter => {
            return {
                tasks: mockTasks,
                taskCreate: null,
                taskUpdate: mockTaskUpdate,
                taskDelete: mockTaskDelete
            };
        }
    };
});

afterEach(() => {
    mockTasks = [];
    mockTaskUpdate.mockClear();
    mockTaskDelete.mockClear();
});

describe('TaskList', () => {
    it('can show empty list', () => {
        const component = renderer.create(<TaskList />);
        const items = component.root.findAllByType(ListItem);
        expect(items.length).toBe(0);
    });

    it('can show items', () => {
        const tests: Array<Task> = [
            { id: '0', title: 'item-0', done: false },
            { id: '1', title: 'item-1', done: true },
            { id: '2', title: 'item-2', done: false }
        ];
        mockTasks = tests;

        const component = renderer.create(<TaskList />);
        const items = component.root.findAllByType(ListItem);
        expect(items.length).toBe(tests.length);

        tests.forEach((v, i) => {
            const text = items[i].findByProps({
                'data-test': 'item.title'
            });
            expect(text.props.children).toBe(v.title);
            const flag = items[i].findByProps({ 'data-test': 'item.check' });
            expect(flag.props['data-test-v']).toBe(v.done);
        });
    });

    it('can click checkbox and call update function', () => {
        const tests: Array<Task> = [
            { id: '0', title: 'item-0', done: false },
            { id: '1', title: 'item-1', done: true },
            { id: '2', title: 'item-2', done: false }
        ];
        mockTasks = tests;

        const component = renderer.create(<TaskList />);
        const items = component.root.findAllByType(ListItem);
        tests.forEach((v, i) => {
            const btn = items[i].findByProps({ 'data-test': 'item.check' });
            renderer.act(() => {
                btn.props.onPress();
            });
            expect(mockTaskUpdate.mock.calls[i][0]).toBe(v.id);
            expect(mockTaskUpdate.mock.calls[i][1]).toBe(!v.done);
        });
    });

    it('can click trash and call remove function', () => {
        const tests: Array<Task> = [
            { id: '0', title: 'item-0', done: false },
            { id: '1', title: 'item-1', done: true },
            { id: '2', title: 'item-2', done: false }
        ];
        mockTasks = tests;

        const component = renderer.create(<TaskList />);
        const items = component.root.findAllByType(ListItem);
        tests.forEach((v, i) => {
            const btn = items[i].findByProps({ 'data-test': 'item.delete' });
            renderer.act(() => {
                btn.props.onPress();
            });
            expect(mockTaskDelete.mock.calls[i][0]).toBe(v.id);
        });
    });
});
