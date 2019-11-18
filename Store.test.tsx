import React from 'react';
import renderer from 'react-test-renderer';
import { useTodo, Todo } from './Store';
import { Button, View } from 'react-native';
import { Repositry } from './Repository';

const WrapItem: React.FC<{ item: Todo }> = props => {
    const { item } = props;
    return (
        <>
            <View data-id="item-id">{item.id}</View>
            <View data-test="item-desc">{item.description}</View>
            <View data-flag={item.done ? 'done' : 'none'} />
        </>
    );
};

function useDiscardRepositry(): Repositry {
    async function load<T>(params: { key: string }): Promise<T> {
        throw 'no value';
    }
    async function save(params: { key: string; data: any }): Promise<void> {
        return;
    }
    return { load, save };
}

const Wrapper: React.FC = () => {
    const { todos, add, update, remove, setSortOpts } = useTodo(
        useDiscardRepositry()
    );

    return (
        <>
            {todos.map(todo => (
                <View key={todo.id}>
                    <WrapItem item={todo} />
                    <Button
                        onPress={() => remove(todo.id)}
                        title=""
                        data-test="del-btn"
                    />
                    <Button
                        onPress={() => update(todo.id, !todo.done)}
                        title=""
                        data-test="up-btn"
                    />
                </View>
            ))}
            <Button onPress={() => add('test')} title="" data-test="add-btn" />
            <Button
                onPress={() => setSortOpts({ order: 'Ascending' })}
                title=""
                data-test="sort-asc-btn"
            />
            <Button
                onPress={() => setSortOpts({ order: 'Descending' })}
                title=""
                data-test="sort-desc-btn"
            />
        </>
    );
};

describe('Todo Store', () => {
    it('initialize is empty', () => {
        const component = renderer.create(<Wrapper />);
        const items = component.root.findAllByType(WrapItem);
        expect(items.length).toBe(0);
    });

    it('can add items', () => {
        const component = renderer.create(<Wrapper />);
        for (let i = 0; i < 3; ++i) {
            renderer.act(() => {
                const button = component.root.findByProps({
                    'data-test': 'add-btn'
                });
                button.props.onPress();
            });
        }

        const items = component.root.findAllByType(WrapItem);
        expect(items.length).toBe(3);
    });

    it('can remove items', () => {
        const component = renderer.create(<Wrapper />);
        for (let i = 0; i < 3; ++i) {
            renderer.act(() => {
                const button = component.root.findByProps({
                    'data-test': 'add-btn'
                });
                button.props.onPress();
            });
        }

        renderer.act(() => {
            const button = component.root.findAllByProps({
                'data-test': 'del-btn'
            })[0];
            button.props.onPress();
        });

        const items = component.root.findAllByType(WrapItem);
        expect(items.length).toBe(2);
    });

    it('can remove all items', () => {
        const component = renderer.create(<Wrapper />);
        for (let i = 0; i < 3; ++i) {
            renderer.act(() => {
                const button = component.root.findByProps({
                    'data-test': 'add-btn'
                });
                button.props.onPress();
            });
        }

        for (let i = 0; i < 3; ++i) {
            renderer.act(() => {
                const button = component.root.findAllByProps({
                    'data-test': 'del-btn'
                })[0];
                button.props.onPress();
            });
        }

        const items = component.root.findAllByType(WrapItem);
        expect(items.length).toBe(0);
    });

    it('can update flag', () => {
        const component = renderer.create(<Wrapper />);
        for (let i = 0; i < 3; ++i) {
            renderer.act(() => {
                const button = component.root.findByProps({
                    'data-test': 'add-btn'
                });
                button.props.onPress();
            });
        }

        let items = component.root
            .findAllByProps({ 'data-flag': 'done' })
            .filter(v => v.type.toString() === 'View');
        expect(items.length).toBe(0);

        renderer.act(() => {
            const button = component.root.findAllByProps({
                'data-test': 'up-btn'
            })[0];
            button.props.onPress();
        });

        items = component.root
            .findAllByProps({ 'data-flag': 'done' })
            .filter(v => v.type.toString() === 'View');
        expect(items.length).toBe(1);
    });

    it('can sort', () => {
        const component = renderer.create(<Wrapper />);
        for (let i = 0; i < 3; ++i) {
            renderer.act(() => {
                const button = component.root.findByProps({
                    'data-test': 'add-btn'
                });
                button.props.onPress();
            });
        }

        let items = component.root
            .findAllByProps({ 'data-id': 'item-id' })
            .filter(v => v.type.toString() === 'View')
            .map(v => v.props.children as string);
        let limit = items.length - 1;
        expect(
            items.every((_, i) => (i < limit ? items[i] <= items[i + 1] : true))
        ).toBeTruthy();

        renderer.act(() => {
            const button = component.root.findAllByProps({
                'data-test': 'sort-desc-btn'
            })[0];
            button.props.onPress();
        });

        items = component.root
            .findAllByProps({ 'data-id': 'item-id' })
            .filter(v => v.type.toString() === 'View')
            .map(v => v.props.children as string);
        limit = items.length - 1;
        expect(
            items.every((_, i) => (i < limit ? items[i] >= items[i + 1] : true))
        ).toBeTruthy();

        renderer.act(() => {
            const button = component.root.findAllByProps({
                'data-test': 'sort-asc-btn'
            })[0];
            button.props.onPress();
        });

        items = component.root
            .findAllByProps({ 'data-id': 'item-id' })
            .filter(v => v.type.toString() === 'View')
            .map(v => v.props.children as string);
        limit = items.length - 1;
        expect(
            items.every((_, i) => (i < limit ? items[i] <= items[i + 1] : true))
        ).toBeTruthy();
    });
});
