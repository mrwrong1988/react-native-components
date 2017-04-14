/**
 * Created by wangyu on 2016/6/16.
 */
import React from 'react';
import {
    View,
    Platform,
    StatusBar,
} from 'react-native';

const IOS_STATUS_BAR_HEIGHT = 20;
const ANDROID_STATUS_BAR_HEIGHT = Platform.Version < 21 ? 0 : 24;

export const BarHeight = Platform.OS === 'ios' ? IOS_STATUS_BAR_HEIGHT : ANDROID_STATUS_BAR_HEIGHT;
//因为在安卓版本小于21时，获取的屏幕高度是从屏幕左上角到底部；而实际计算时左上角的坐标是从状态栏下方开始计算的，所以在某些场景下
//原始的安卓状态栏的高度是需要的，比如登陆页
//下面这个导出的值只有在安卓并且平台Version小于21时导出为24
export const ReverseAndroidBarHeight = (Platform.OS === 'android' && Platform.Version < 21) ? 24 : 0;

const defaultProps = {
    animated: true,
    hidden: false,
    backgroundColor: "#4a9df8",
    translucent: true,
    networkActivityIndicatorVisible: false,
    showHideTransition: "fade",
};
export default ({
                    animated = true,
                    hidden = false,
                    backgroundColor = "#4a9df8",
                    translucent = true,
                    networkActivityIndicatorVisible = false,
                    showHideTransition = "fade",
                }) => {

    return (

        <View style={{
            backgroundColor: backgroundColor,
            height: Platform.select({ios: IOS_STATUS_BAR_HEIGHT, android: ANDROID_STATUS_BAR_HEIGHT})
        }}>
            <StatusBar animated={animated}
                       hidden={hidden}
                       backgroundColor={backgroundColor}
                       translucent={translucent}
                       networkActivityIndicatorVisible={networkActivityIndicatorVisible}
                       showHideTransition={showHideTransition} />
        </View>
    );
};
