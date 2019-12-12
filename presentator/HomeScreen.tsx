import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TaskList from './TaskList';

interface Props {
    onCallEditor(): void;
}

const HomeScreen: React.FC<Props> = props => {
    const { onCallEditor } = props;

    return (
        <View style={styles.container}>
            <TaskList />

            <View style={styles.view}>
                <TouchableOpacity
                    data-test="btn.editor"
                    style={styles.button}
                    onPress={() => onCallEditor()}
                >
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view: {
        position: 'absolute',
        right: 24,
        bottom: 24
    },
    button: {
        height: 48,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        borderRadius: 24
    },
    text: {
        fontSize: 24
    }
});
