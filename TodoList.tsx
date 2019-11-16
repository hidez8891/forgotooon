import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, ListItem, Left, Icon, Body, Right } from 'native-base';
import { useContext } from './Context';

const TodoList: React.FC = () => {
    const {
        todo: { todos, update, remove }
    } = useContext();

    return (
        <FlatList
            data={todos}
            contentContainerStyle={styles.listView}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => (
                <ListItem icon>
                    <Left>
                        <Icon
                            data-test="item.check"
                            data-test-v={item.done}
                            type="MaterialIcons"
                            style={styles.checkbox}
                            name={
                                item.done
                                    ? 'check-box'
                                    : 'check-box-outline-blank'
                            }
                            onPress={() => update(item.id, !item.done)}
                        />
                    </Left>
                    <Body>
                        <Text data-test="item.description">
                            {item.description}
                        </Text>
                    </Body>
                    <Right>
                        <Icon
                            data-test="item.remove"
                            type="FontAwesome"
                            style={styles.icon}
                            name="trash-o"
                            onPress={() => remove(item.id)}
                        />
                    </Right>
                </ListItem>
            )}
        />
    );
};

const styles = StyleSheet.create({
    listView: {},
    icon: {
        color: 'grey'
    },
    checkbox: {
        color: 'grey',
        fontSize: 20
    }
});

export default TodoList;
