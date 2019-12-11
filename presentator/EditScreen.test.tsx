import React from 'react';
import renderer from 'react-test-renderer';
import EditScreen from './EditScreen';

import { TaskWriter } from '../interfaces/usecase/task';

let mockTaskWriter = jest.fn();
jest.mock('./contexts/task', () => {
    return {
        useTaskContext: (): TaskWriter => {
            return {
                taskCreate: mockTaskWriter,
                taskUpdate: null,
                taskDelete: null
            };
        }
    };
});

afterEach(() => {
    mockTaskWriter.mockClear();
});

describe('EditScreen', () => {
    it('show initial screen', () => {
        const component = renderer.create(<EditScreen onFinished={() => {}} />);
        const inputarea = component.root.findByProps({
            'data-test': 'input.text'
        });
        expect(inputarea.props.value).toBe('');
    });

    it('can add input text', () => {
        const component = renderer.create(<EditScreen onFinished={() => {}} />);
        const text = 'input-test';

        const inputarea = component.root.findByProps({
            'data-test': 'input.text'
        });
        renderer.act(() => {
            inputarea.props.onChangeText(text);
        });
        expect(inputarea.props.value).toBe(text);

        const button = component.root.findByProps({
            'data-test': 'input.submit'
        });
        renderer.act(() => {
            button.props.onPress();
        });
        expect(mockTaskWriter.mock.calls.length).toBe(1);
        expect(mockTaskWriter.mock.calls[0][0]).toBe(text);
    });

    it('can call onFinished', () => {
        const onFinished = jest.fn();
        const component = renderer.create(
            <EditScreen onFinished={onFinished} />
        );

        const button = component.root.findByProps({
            'data-test': 'input.submit'
        });
        renderer.act(() => {
            button.props.onPress();
        });
        expect(onFinished.mock.calls.length).toBe(1);
    });
});
