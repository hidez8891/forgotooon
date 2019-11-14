import React, { useState } from 'react';
import {
    Left, Right, Body,
    Button, Text, Icon,
    ListItem, View, Picker, Switch, Separator, Radio
} from "native-base";
import Modal from "react-native-modal";
import { useContext } from './Context';
import { Todo } from './Store';

interface Props {
    isVisible: boolean
    onClose(): void
};

type SortItemT =
    "registration" |
    "title";
const SortItems: SortItemT[] = [
    "registration",
    "title"
];

const SortMenu: React.FC<Props> = (props) => {
    const { isVisible, onClose } = props;
    const { todo: { sort } } = useContext();
    const [sortItem, setSortItem] = useState<SortItemT>("registration");
    const [isSortASC, setSortASC] = useState<boolean>(true);

    function onFinish() {
        let fn: (a: Todo, b: Todo) => number;

        switch (sortItem) {
            case "registration":
                fn = (a, b) => {
                    return a.id > b.id ? 1 : -1;
                }
                break;
            case "title":
                fn = (a, b) => {
                    return a.description > b.description ? 1 : -1;
                }
                break;
            default:
                fn = (a, b) => 0;
                break;
        }

        if (isSortASC) {
            sort(fn);
        } else {
            sort((a, b) => -fn(a, b));
        }

        onClose();
    }

    return (
        <View>
            <Modal
                isVisible={isVisible}
                onBackdropPress={onFinish}>
                <View style={{ flexShrink: 1, backgroundColor: "#fff" }}>
                    <Separator bordered>
                        <Text>Sort Order</Text>
                    </Separator>
                    <ListItem>
                        <Left>
                            <Text>Sort order</Text>
                        </Left>
                        <Right>
                            <Switch
                                value={isSortASC}
                                onValueChange={(b) => setSortASC(b)} />
                        </Right>
                    </ListItem>
                    <Separator bordered>
                        <Text>Sort Item</Text>
                    </Separator>
                    {SortItems.map((item) =>
                        <ListItem key={item}>
                            <Left>
                                <Text>{item}</Text>
                            </Left>
                            <Right>
                                <Radio
                                    selected={item === sortItem}
                                    onPressIn={() => setSortItem(item)} />
                            </Right>
                        </ListItem>
                    )}
                    <Button onPress={onFinish}>
                        <Text>Close</Text>
                    </Button>
                </View>
            </Modal>
        </View>
    );
};

export default SortMenu;