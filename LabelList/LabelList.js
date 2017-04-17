/**
 * Created by wangyu on 2016/12/28.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import StyleSheet from 'StyleSheet';

class Label extends Component{

    static defaultProps = {
        status: "normal",
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        this.layoutInfo = null;
    }

    render() {
        let containerStyle = null;
        let labelStyle = null;
        switch (this.props.status) {
            case "normal":
                containerStyle = [styles.labelContainer, styles.normalContainer];
                labelStyle = styles.normalText;
                break;
            case "chosen":
                containerStyle = [styles.labelContainer, styles.chosenContainer];
                labelStyle = styles.chosenText;
                break;
            case "highlight":
                containerStyle = [styles.labelContainer, styles.highlightContainer];
                labelStyle = styles.highlightText;
                break;
        }

        return (
            <TouchableOpacity activeOpacity={0.6}
                              onPress={() => this.props.onPress && this.props.onPress(this.layoutInfo)}
                              onLayout={(e) => this.layoutInfo = e.nativeEvent.layout}>
                <View style={containerStyle}>
                    <Text style={labelStyle}>{this.props.labelName}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}


export default function LabelList(props) {

    return (
        <View style={[styles.labelListContainer, props.style]}>
            {
                props.labels.map((label, index) => (
                    <Label {...label}
                           key={index}
                           onPress={(layout) => props.onItemClick && props.onItemClick(index, layout)}
                           status={props.highlightIndex === index ? "highlight" : label.status}/>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    labelContainer: {
        height: 26,
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 13,
        marginLeft: 15,
        marginBottom: 15,
    },
    normalContainer: {
        backgroundColor: "transparent",
        borderColor: "#cccccc",
    },
    chosenContainer: {
        backgroundColor: "#fff",
        borderColor: "#4a9ef9",
    },
    highlightContainer: {
        backgroundColor: "#4a9ef9",
        borderColor: "#4a9ef9",
    },
    normalText: {
        fontSize: 12,
        color: "#666666",
    },
    chosenText: {
        fontSize: 12,
        color: "#4a9ef9",
    },
    highlightText: {
        fontSize: 12,
        color: "#ffffff",
    },
    labelListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingRight: 15,

    }
});

