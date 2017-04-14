/**
 * Created by wangyu on 2017/3/30.
 */
import { ToastAndroid } from "react-native";

let lastBackPressed = 0;
export default Helper = {
    doubleBackExit: function () {
        let nowDate = Date.now();
        if (lastBackPressed && lastBackPressed + 2000 >= nowDate) {
            return false;
        }
        lastBackPressed = nowDate;
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    }
}