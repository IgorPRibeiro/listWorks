import { StyleSheet } from "react-native";
import { deviceHeight } from "../../constants/device";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#595959",
        borderRadius: 12,
        paddingHorizontal:12,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: deviceHeight * 0.1,
        paddingVertical: 12,
        flexDirection: "row",
        
    },

    title: {
        color: "white"
    }
})


export default styles