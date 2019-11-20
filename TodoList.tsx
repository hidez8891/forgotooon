import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, ListItem, Left, Icon, Body, Right } from 'native-base';

import { TaskReader, TaskWriter } from './interfaces/usecase/task';
import { useTaskContext } from './contexts/task';

const TodoList: React.FC = () => {
    const {
        tasks,
        taskUpdate,
        taskDelete
    }: TaskReader & TaskWriter = useTaskContext();

    return (
        <FlatList
            data={tasks}
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
                            onPress={() => taskUpdate(item.id, !item.done)}
                        />
                    </Left>
                    <Body>
                        <Text data-test="item.title">{item.title}</Text>
                    </Body>
                    <Right>
                        <Icon
                            data-test="item.delete"
                            type="FontAwesome"
                            style={styles.icon}
                            name="trash-o"
                            onPress={() => taskDelete(item.id)}
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
