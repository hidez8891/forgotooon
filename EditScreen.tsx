import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Button } from "react-native";
import { useSafeArea } from 'react-native-safe-area-context';
import { RouterProps } from "./ScreenRouter.defs";
import { useContext } from './Context';

type Props = RouterProps;

interface State {
    text: string
}

const EditScreen: React.FC<Props> = (props) => {
    const { navigation } = props;
    const insets = useSafeArea();
    const [state, setState] = useState<State>({ text: "" });
    const { todo: { add } } = useContext();

    function editFinish(text: string) {
        add(text);
        navigation.goBack();
    }

    return (
        <>
            <View style={{ paddingTop: insets.top }} />
            <View style={styles.body}>
                <View style={styles.inputArea}>
                    <Text style={styles.label}>ToDo</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setState({ ...state, text })}
                        value={state.text}
                        underlineColorAndroid="transparent"
                    />
                </View>

                <View style={styles.buttonArea}>
                    <Button
                        title="Add"
                        onPress={() => editFinish(state.text)}
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