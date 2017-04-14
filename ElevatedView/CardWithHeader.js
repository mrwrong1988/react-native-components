/**
 * Created by wangyu on 2016/12/30.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import ElevatedView from './ElevatedView';

export default function CardWithHeader({
                                           elevation,
                                           shadowAndroid,
                                           titleContainer,
                                           iconSrc,
                                           iconStyle,
                                           headerColor,
                                           title,
                                           titleStyle,
                                           contentStyle,
                                           children,
                                           ...otherProps }) {

    return (
        <ElevatedView elevation={elevation} shadowAndroid={shadowAndroid} {...otherProps} >
            <View style={[styles.titleContainer, titleContainer]}>
                {
                    iconSrc &&
                    <Image style={[styles.icon, iconStyle]} source={iconSrc}/>
                }
                <Text style={[styles.title, {color: headerColor}, titleStyle]}>{title}</Text>
            </View>
            <View style={{height: 2, backgroundColor: headerColor}}/>
            <View style={[styles.contentStyle, contentStyle]}>
                { children }
            </View>
        </ElevatedView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        height: 34,
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: "#fff"
    },
    icon: {
        width:23,
        height:23,
        marginRight:5
    },
    title: {
        fontSize: 14,
        color: "#fff",
    },
    contentStyle: {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    }
});