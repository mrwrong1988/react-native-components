/**
 * Created by wangyu on 2017/4/17.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import StyleSheet from 'StyleSheet';
import LinearGradient from "react-native-linear-gradient";

export default class LinearGradientBtn extends Component {

    static defaultProps = {
        type: "submit",
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            status: this.props.disabled ? "disabled" : "normal",
        };
        this.onPressIn = this.onPressIn.bind(this);
        this.onPressOut = this.onPressOut.bind(this);
    }

    onPressIn() {
        this.setState({
            status: "press",
        });
    }

    onPressOut() {
        this.setState({
            status: "normal",
        });
    }


    render() {
        return (
            <TouchableWithoutFeedback disabled={this.props.disabled}
                                      onPress={this.props.onPress}
                                      onPressIn={this.onPressIn}
                                      onPressOut={this.onPressOut}>
                <LinearGradient colors={colors[this.props.type][this.state.status]}
                                start={{x:0.0, y: 0.0}}
                                end={{x:1.0, y: 0.0}}
                                style={[containerStyle[this.props.type], this.props.style]}>
                    <Text style={[textStyle[this.props.type], this.props.textStyle]}>{this.props.children}</Text>
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    containerSubmit: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center",
        height: 44,
        borderRadius: 5,
    },
    textSubmit: {
        fontSize: 18,
        color: "#fff",
        backgroundColor: "transparent",
    },
    containerBottomTool: {
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
    textBottomTool: {
        fontSize: 18,
        color: "#fff",
        backgroundColor: "transparent",
    }
});

const containerStyle = {
    "submit": styles.containerSubmit,
    "login": [styles.containerSubmit, {borderRadius: 22}],
    "bottomToolSingle": styles.containerBottomTool,
    "bottomToolFirst": styles.containerBottomTool,
    "bottomToolSecond": styles.containerBottomTool,
};

const textStyle = {
    "submit": styles.textSubmit,
    "login": styles.textSubmit,
    "bottomToolSingle": styles.textBottomTool,
    "bottomToolFirst": styles.textBottomTool,
    "bottomToolSecond": styles.textBottomTool,
};

const colors = {
    "submit": {
        "normal": ["#ff9100", "#ff5500"],
        "press": ["#e58200", "#e54c00"],
        "disabled": ["#ffc87f", "#ffaa7f"],
    },
    "login": {
        "normal": ["#ff9100", "#ff5500"],
        "press": ["#e58200", "#e54c00"],
        "disabled": ["#ffc87f", "#ffaa7f"],
    },
    "bottomToolSingle": {
        "normal": ["#ff9100", "#ff5500"],
        "press": ["#e58200", "#e54c00"],
        "disabled": ["#ffc87f", "#ffaa7f"],
    },
    "bottomToolFirst": {
        "normal": ["#fec900", "#ff9100"],
        "press": ["#e58200", "#e54c00"],
        "disabled": ["#ffc87f", "#ffaa7f"],
    },
    "bottomToolSecond": {
        "normal": ["#ff7d00", "#ff5500"],
        "press": ["#e58200", "#e54c00"],
        "disabled": ["#ffc87f", "#ffaa7f"],
    }
};