/**
 * Created by wangyu on 2016/12/30.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Platform
} from 'react-native';

export default function ElevatedView({
                                         elevation,
                                         style,
                                         shadowAndroid,
                                         children,
                                         ...otherProps }) {

    if (Platform.OS === 'ios') {
        let iosShadowElevation = styles.iosElevationDefault;
        switch (elevation) {
            case 1: iosShadowElevation = styles.iosElevationOne; break;
            case 2: iosShadowElevation = styles.iosElevationTwo; break;
            case 3: iosShadowElevation = styles.iosElevationThree; break;
            case 4: iosShadowElevation = styles.iosElevationFour; break;
            case 5: iosShadowElevation = styles.iosElevationFive; break;
        }
        return (
            <View {...otherProps} style={[style, iosShadowElevation]}>
                {children}
            </View>
        );
    } else {
        if (Platform.Version < 21) {
            return (
                <View style={shadowAndroid.containerStyle}>
                    <View style={styles.row}>
                        <Image source={require("./images/top-left.png")}
                               style={styles.cornerShadow}
                               resizeMode="stretch" />
                        <Image source={require("./images/top.png")}
                               style={[styles.horizontalShadow, {width: shadowAndroid.contentWidth}]}
                               resizeMode="stretch" />
                        <Image source={require("./images/top-right.png")}
                               style={styles.cornerShadow}
                               resizeMode="stretch" />
                    </View>
                    <View style={styles.row}>
                        <Image source={require("./images/left.png")}
                               style={[styles.verticalShadow, {height: shadowAndroid.contentHeight}]}
                               resizeMode="stretch" />
                        <View {...otherProps} style={[styles.content, shadowAndroid.contentStyle]}>
                            {children}
                        </View>
                        <Image source={require("./images/right.png")}
                               style={[styles.verticalShadow, {height: shadowAndroid.contentHeight}]}
                               resizeMode="stretch" />
                    </View>
                    <View style={styles.row}>
                        <Image source={require("./images/bottom-left.png")}
                               style={styles.cornerShadow} resizeMode="stretch" />
                        <Image source={require("./images/bottom.png")}
                               style={[styles.horizontalShadow, {width: shadowAndroid.contentWidth}]}
                               resizeMode="stretch" />
                        <Image source={require("./images/bottom-right.png")}
                               style={styles.cornerShadow}
                               resizeMode="stretch" />
                    </View>
                </View>
            );
        } else {
            return (
                <View {...otherProps} style={[style, {elevation: elevation,}]}>
                    {children}
                </View>
            );
        }

    }

}

ElevatedView.defaultProps = {
    elevation: 0,
    shadowAndroid: {
        contentHeight: 20,
        contentWidth: 20,
    }
};

const styles = StyleSheet.create({
    iosElevationDefault: {
        shadowColor: '#666666',
    },
    iosElevationOne: {
        shadowOpacity: 0.12,
        shadowRadius: 0.8,
        shadowOffset: {
            height: 0.8,
        },
    },
    iosElevationTwo: {
        shadowOpacity: 0.18,
        shadowRadius: 0.9,
        shadowOffset: {
            height: 1,
        },
    },
    iosElevationThree: {
        shadowOpacity: 0.18,
        shadowRadius: 1.4,
        shadowOffset: {
            height: 2,
        },
    },
    iosElevationFour: {
        shadowOpacity: 0.18,
        shadowRadius: 2.5,
        shadowOffset: {
            height: 2.8,
        },
    },
    iosElevationFive: {
        shadowOpacity: 0.24,
        shadowRadius: 3.2,
        shadowOffset: {
            height: 4,
        },
    },
    row: {
        flexDirection: "row",
    },
    cornerShadow: {
        width: 15,
        height: 15,
    },
    horizontalShadow: {
        height: 15,
        flex: 1,
    },
    verticalShadow: {
        width: 15,
    },
    content: {
        flex: 1,
        margin: -2,
        zIndex: 1,
    }
});
