import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Form, Item, Input, Button, Text } from 'native-base';

import { TaskWriter } from '../interfaces/usecase/task';
import { useTaskContext } from '../contexts/task';

interface Props {
    onFinished(): void;
}

interface State {
    text: string;
}

const EditScreen: React.FC<Props> = props => {
    const { onFinished } = props;
    const [state, setState] = useState<State>({ text: '' });
    const { taskCreate }: TaskWriter = useTaskContext();

    function onSubmit(text: string) {
        taskCreate(text);
        onFinished();
    }

    return (
        <Form>
            <Item>
                <Input
                    data-test="input.text"
                    placeholder="task name"
                    onChangeText={text => setState({ ...state, text })}
                    value={state.text}
                    underlineColorAndroid="transparent"
                />
            </Item>
            <Button
                data-test="input.submit"
                block={true}
                style={styles.button}
                onPress={() => onSubmit(state.text)}
            >
                <Text>Add</Text>
            </Button>
        </Form>
    );
};

export default EditScreen;

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        marginTop: 20
    }
});
