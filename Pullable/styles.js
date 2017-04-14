/**
 * Created by wangyu on 2017/4/1.
 */
import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    show: {
        opacity: 0,
    },
    hide: {
        opacity: 1,
    },
    defaultIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pullableWrap: {
        flex: 1,
        //flexGrow: 1,
        flexDirection: 'column',
        zIndex:-999,
    },
});