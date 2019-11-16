import React from 'react';
import renderer from 'react-test-renderer';
import { useTodo, Todo } from './Store';
import { Button, View } from 'react-native';

const WrapItem: React.FC<{ item: Todo }> = props => {
    const { item } = props;
    return (
        <>
            <View data-test="item-desc">{item.description}</View>
            <View data-flag={item.done ? 'done' : 'none'} />
        </>
    );
};

const Wrapper: React.FC = () => {
    const { todos, add, update, remove } = useTodo();
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
});
