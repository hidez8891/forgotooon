import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    onPress(): void
}

const OverlayButtonView: React.FC<Props> = (props) => {
    const { onPress, children } = props;
    return (
        <View style={styles.container}>
            {children}

            <View style={styles.view}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onPress()}
                >
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OverlayButtonView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        position: "absolute",
        right: 12,
        bottom: 12,
    },
    button: {
        height: 48,
        width: 48,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
        borderRadius: 24,
    },
    text: {
        fontSize: 24,
    },
});