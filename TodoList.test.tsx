import React from 'react';
import renderer from 'react-test-renderer';
import { ListItem } from 'native-base';
import { Store } from './Store';
import TodoList from './TodoList';

const Mock = (): Store => {
    return {
        todos: [],
        add: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        sortOpts: { item: 'id', order: 'Ascending' },
        setSortOpts: jest.fn()
    };
};

let realContext;
let mockContext;
beforeEach(() => {
    realContext = React.useContext;
    mockContext = React.useContext = jest.fn();
});
afterEach(() => {
    React.useContext = realContext;
});

describe('TodoList', () => {
    it('can show empty list', () => {
        const mock = Mock();
        mockContext.mockReturnValue({ todo: mock });

        const component = renderer.create(<TodoList />);
        const items = component.root.findAllByType(ListItem);
        expect(items.length).toBe(0);
    });

    it('can show items', () => {
        const tests = [
            { id: '0', description: 'item-0', done: false },
            { id: '1', description: 'item-1', done: true },
            { id: '2', description: 'item-2', done: false }
        ];
        const mock = Mock();
        mock.todos = tests;
        mockContext.mockReturnValue({ todo: mock });

        const component = renderer.create(<TodoList />);
        const items = component.root.findAllByType(ListItem);
        expect(items.length).toBe(tests.length);

        tests.forEach((v, i) => {
            const text = items[i].findByProps({
                'data-test': 'item.description'
            });
            expect(text.props.children).toBe(v.description);
            const flag = items[i].findByProps({ 'data-test': 'item.check' });
            expect(flag.props['data-test-v']).toBe(v.done);
        });
    });

    it('can click checkbox and call update function', () => {
        const tests = [
            { id: '0', description: 'item-0', done: false },
            { id: '1', description: 'item-1', done: true },
            { id: '2', description: 'item-2', done: false }
        ];
        const mock = Mock();
        mock.todos = tests;
        const mockfn = jest.fn();
        mock.update = mockfn;
        mockContext.mockReturnValue({ todo: mock });

        const component = renderer.create(<TodoList />);
        const items = component.root.findAllByType(ListItem);
        tests.forEach((v, i) => {
            const btn = items[i].findByProps({ 'data-test': 'item.check' });
            renderer.act(() => {
                btn.props.onPress();
            });
            expect(mockfn.mock.calls[i][0]).toBe(v.id);
            expect(mockfn.mock.calls[i][1]).toBe(!v.done);
        });
    });

    it('can click trash and call remove function', () => {
        const tests = [
            { id: '0', description: 'item-0', done: false },
            { id: '1', description: 'item-1', done: true },
            { id: '2', description: 'item-2', done: false }
        ];
        const mock = Mock();
        mock.todos = tests;
        const mockfn = jest.fn();
        mock.remove = mockfn;
        mockContext.mockReturnValue({ todo: mock });

        const component = renderer.create(<TodoList />);
        const items = component.root.findAllByType(ListItem);
        tests.forEach((v, i) => {
            const btn = items[i].findByProps({ 'data-test': 'item.remove' });
            renderer.act(() => {
                btn.props.onPress();
            });
            expect(mockfn.mock.calls[i][0]).toBe(v.id);
        });
    });
});
