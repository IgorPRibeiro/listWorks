import { StyleSheet } from "react-native";
import { deviceHeight, deviceWidth } from "../../constants/device";

const styles = StyleSheet.create({
    container: {
        height: deviceHeight * 0.16,
        width: deviceWidth,
        alignItems: "center",
        backgroundColor: "#262f30",
        justifyContent: "center"
    },
    title: {
        fontSize: 22,
        color: "white",
        fontWeight: "bold"
    }
})


export default styles