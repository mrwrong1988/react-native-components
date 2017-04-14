/**
 * Created by wangyu on 2017/4/10.
 */
import { StyleSheet, Platform } from "react-native";

export default baseStyle = StyleSheet.create({
    flex: {
        flex: 1,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: "#fff",
        ...Platform.select({
            ios: {
                marginTop: 64,
            },
            android: {
                marginTop: 54,
            },
        }),
    },
    horizontalLine: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#dfdfdf",
    },
    horizontalMarginLine: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#dfdfdf",
        marginLeft: 15,
        marginRight: 15,
    },
});