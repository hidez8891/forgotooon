import React from 'react';
import renderer from 'react-test-renderer';
import SortMenu from './SortMenu';

let mockSetFn = jest.fn();
jest.mock('./Context', () => {
    return {
        useContext: () => {
            return {
                todo: {
                    sortOpts: { item: 'id', order: 'Ascending' },
                    setSortOpts: mockSetFn
                }
            };
        }
    };
});

afterEach(() => {
    mockSetFn.mockClear();
});

describe('SortMenu', () => {
    it('can show screen', () => {
        const component = renderer.create(
            <SortMenu onClose={() => {}} isVisible={true} />
        );

        const order = component.root.findByProps({
            'data-test': 'sort-menu.order'
        });
        expect(order.props.value).toBe(true);

        const items = component.root.findAllByProps({
            'data-test': 'sort-menu.items'
        });
        const selectedItems = items
            .filter(v => v.props.selected)
            .filter(v => (v.type as Function).name === 'Radio');
        expect(selectedItems.length).toBe(1);
        expect(selectedItems[0].props['data-testv']).toBe('registration');
    });

    it('can call close function', () => {
        const closeFn = jest.fn();
        const component = renderer.create(
            <SortMenu onClose={closeFn} isVisible={true} />
        );

        renderer.act(() => {
            const button = component.root.findAllByProps({
                'data-test': 'sort-menu.close-btn'
            })[0];
            button.props.onPress();
        });

        expect(closeFn.mock.calls.length).toBe(1);
    });

    it('can set sort options', () => {
        const component = renderer.create(
            <SortMenu onClose={() => {}} isVisible={true} />
        );

        renderer.act(() => {
            const button = component.root.findAllByProps({
                'data-test': 'sort-menu.close-btn'
            })[0];
            button.props.onPress();
        });

        expect(mockSetFn.mock.calls.length).toBe(1);
        expect(mockSetFn.mock.calls[0][0]).toEqual({
            item: 'id',
            order: 'Ascending'
        });
    });

    it('can change sort item', () => {
        const component = renderer.create(
            <SortMenu onClose={() => {}} isVisible={true} />
        );

        let selectedItems = component.root
            .findAllByProps({ 'data-test': 'sort-menu.items' })
            .filter(v => v.props.selected)
            .filter(v => (v.type as Function).name === 'Radio');
        expect(selectedItems.length).toBe(1);
        expect(selectedItems[0].props['data-testv']).toBe('registration');

        renderer.act(() => {
            const button = component.root
                .findAllByProps({ 'data-testv': 'title' })
                .filter(v => (v.type as Function).name === 'Radio')[0];
            button.props.onPressIn();
        });

        selectedItems = component.root
            .findAllByProps({ 'data-test': 'sort-menu.items' })
            .filter(v => v.props.selected)
            .filter(v => (v.type as Function).name === 'Radio');
        expect(selectedItems.length).toBe(1);
        expect(selectedItems[0].props['data-testv']).toBe('title');

        renderer.act(() => {
            const button = component.root.findAllByProps({
                'data-test': 'sort-menu.close-btn'
            })[0];
            button.props.onPress();
        });

        expect(mockSetFn.mock.calls.length).toBe(1);
        expect(mockSetFn.mock.calls[0][0]).toEqual({
            item: 'description',
            order: 'Ascending'
        });
    });

    it('can change sort order', () => {
        const component = renderer.create(
            <SortMenu onClose={() => {}} isVisible={true} />
        );

        const orderBtn = component.root.findByProps({
            'data-test': 'sort-menu.order'
        });
        expect(orderBtn.props.value).toBe(true);

        renderer.act(() => {
            orderBtn.props.onValueChange(false);
        });
        expect(orderBtn.props.value).toBe(false);

        renderer.act(() => {
            const button = component.root.findAllByProps({
                'data-test': 'sort-menu.close-btn'
            })[0];
            button.props.onPress();
        });

        expect(mockSetFn.mock.calls.length).toBe(1);
        expect(mockSetFn.mock.calls[0][0]).toEqual({
            item: 'id',
            order: 'Descending'
        });
    });
});
