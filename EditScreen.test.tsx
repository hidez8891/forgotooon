import React from 'react';
import renderer from 'react-test-renderer';
import EditScreen from './EditScreen';

let mockAddFn = jest.fn();
jest.mock('./Context', () => {
    return {
        useContext: () => {
            return { todo: { add: mockAddFn } };
        }
    };
});

afterEach(() => {
    mockAddFn.mockClear();
});

describe('EditScreen', () => {
    it("show initial screen", () => {
        const component = renderer.create(<EditScreen onFinished={() => { }} />);
        const inputarea = component.root.findByProps({ "data-test": "input.text" });
        expect(inputarea.props.value).toBe('');
    });

    it("can add input text", () => {
        const component = renderer.create(<EditScreen onFinished={() => { }} />);
        const text = "input-test";

        const inputarea = component.root.findByProps({ "data-test": "input.text" });
        renderer.act(() => {
            inputarea.props.onChangeText(text);
        });
        expect(inputarea.props.value).toBe(text);

        const button = component.root.findByProps({ "data-test": "input.submit" });
        renderer.act(() => {
            button.props.onPress();
        });
        expect(mockAddFn.mock.calls.length).toBe(1);
        expect(mockAddFn.mock.calls[0][0]).toBe(text);
    });

    it("can call onFinished", () => {
        const onFinished = jest.fn();
        const component = renderer.create(<EditScreen onFinished={onFinished} />);

        const button = component.root.findByProps({ "data-test": "input.submit" });
        renderer.act(() => {
            button.props.onPress();
        });
        expect(onFinished.mock.calls.length).toBe(1);
    });
});