import React, { useState, useEffect } from 'react';
import {
    Left,
    Right,
    Button,
    Text,
    ListItem,
    View,
    Switch,
    Separator,
    Radio
} from 'native-base';
import Modal from 'react-native-modal';

import { TaskSortOption } from './interfaces/models/task';
import { TaskSorter } from './interfaces/usecase/task';
import { useTaskContext } from './contexts/task';

interface Props {
    isVisible: boolean;
    onClose(): void;
}

const SortItems: { [key: string]: TaskSortOption['item'] } = {
    registration: 'id',
    title: 'title'
};

const SortMenu: React.FC<Props> = props => {
    const { isVisible, onClose } = props;
    const { options, sortUpdate }: TaskSorter = useTaskContext();

    const [sortItem, setSortItem] = useState('');
    const [isSortASC, setSortASC] = useState(true);

    useEffect(() => {
        const item = Object.keys(SortItems).filter(
            k => SortItems[k] === options.item
        )[0];

        setSortItem(item);
        setSortASC(options.order === 'Ascending');
    }, [options]);

    function onFinish() {
        const sortOrder: TaskSortOption['order'] = isSortASC
            ? 'Ascending'
            : 'Descending';
        sortUpdate({ order: sortOrder, item: SortItems[sortItem] });
        onClose();
    }

    return (
        <View>
            <Modal isVisible={isVisible} onBackdropPress={onFinish}>
                <View style={{ flexShrink: 1, backgroundColor: '#fff' }}>
                    <Separator bordered>
                        <Text>Sort Order</Text>
                    </Separator>
                    <ListItem>
                        <Left>
                            <Text>Sort order</Text>
                        </Left>
                        <Right>
                            <Switch
                                data-test="sort-menu.order"
                                value={isSortASC}
                                onValueChange={b => setSortASC(b)}
                            />
                        </Right>
                    </ListItem>
                    <Separator bordered>
                        <Text>Sort Item</Text>
                    </Separator>
                    {Object.keys(SortItems).map(item => (
                        <ListItem key={item}>
                            <Left>
                                <Text>{item}</Text>
                            </Left>
                            <Right>
                                <Radio
                                    data-test="sort-menu.items"
                                    data-testv={item}
                                    selected={item === sortItem}
                                    onPressIn={() => setSortItem(item)}
                                />
                            </Right>
                        </ListItem>
                    ))}
                    <Button data-test="sort-menu.close-btn" onPress={onFinish}>
                        <Text>Close</Text>
                    </Button>
                </View>
            </Modal>
        </View>
    );
};

export default SortMenu;
