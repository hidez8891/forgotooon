import React, { useState } from 'react';
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
import { useContext } from './Context';
import { SortOptionT } from './Store';

interface Props {
    isVisible: boolean;
    onClose(): void;
}

const SortItems: { [key: string]: SortOptionT['item'] } = {
    registration: 'id',
    title: 'description'
};

const SortMenu: React.FC<Props> = props => {
    const { isVisible, onClose } = props;
    const {
        todo: { sortOpts, setSortOpts }
    } = useContext();

    const initSortItem = Object.keys(SortItems).filter(
        k => SortItems[k] === sortOpts.item
    )[0];
    const [sortItem, setSortItem] = useState(initSortItem);
    const [isSortASC, setSortASC] = useState(sortOpts.order === 'Ascending');

    function onFinish() {
        const sortOrder: SortOptionT['order'] = isSortASC
            ? 'Ascending'
            : 'Descending';
        setSortOpts({ order: sortOrder, item: SortItems[sortItem] });
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
