import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Button } from "react-native";
import { useContext } from './Context';

interface Props {
    onFinished(): void
}

interface State {
    text: string
}

const EditScreen: React.FC<Props> = (props) => {
    const { onFinished } = props;
    const [state, setState] = useState<State>({ text: "" });
    const { todo: { add } } = useContext();

    function onSubmit(text: string) {
        add(text);
        onFinished();
    }

    return (
        <>
            <View style={styles.body}>
                <View style={styles.inputArea}>
                    <Text style={styles.label}>ToDo</Text>
                    <TextInput
                        data-test="input.text"
                        style={styles.input}
                        onChangeText={(text) => setState({ ...state, text })}
                        value={state.text}
                        underlineColorAndroid="transparent"
                    />
                </View>

                <View style={styles.buttonArea}>
                    <Button
                        data-test="input.submit"
                        title="Add"
                        onPress={() => onSubmit(state.text)}
                    />
                </View>
            </View>
        </>
    );
}

export default EditScreen;

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    inputArea: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    label: {
        fontSize: 12,
    },
    input: {
        alignSelf: "stretch",
        borderBottomWidth: 2,
    },
    buttonArea: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "flex-start",
    },
});