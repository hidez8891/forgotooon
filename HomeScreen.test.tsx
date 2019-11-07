import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from './HomeScreen';

jest.mock('./TodoList', () => () => {
    const { View } = require("react-native");
    return <View data-test="mock-todo-list" />;
});

describe('HomeScreen', () => {
    it("can rendered", () => {
        const component = renderer.create(<HomeScreen onCallEditor={() => { }} />);
        const items = component.root
            .findAllByProps({ "data-test": "mock-todo-list" })
            .filter((v) => v.type.toString() === 'View')
        expect(items.length).toBe(1);
    });

    it("can call onCallEditor", () => {
        const caller = jest.fn();
        const component = renderer.create(<HomeScreen onCallEditor={caller} />);
        const btn = component.root.findByProps({ "data-test": "btn.editor" });
        renderer.act(() => {
            btn.props.onPress();
        });
        expect(caller.mock.calls.length).toBe(1);
    });
})
