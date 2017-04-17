/**
 * Created by wangyu on 2017/4/17.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import StyleSheet from 'StyleSheet';


export default class Button extends Component {

    static defaultProps = {
        type: "round",
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
                <View style={[containerStyle[this.props.type][this.state.status], this.props.style]}>
                    {
                        this.props.icon &&
                        <Image source={this.props.icon} />
                    }
                    <Text style={[textStyle[this.props.type][this.state.status], this.props.textStyle]}>
                        {this.props.children}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}


const styles = StyleSheet.create({
    containerRound: {
        paddingLeft: 14,
        paddingRight: 14,
        justifyContent: "center",
        height: 28,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ff5500",
        backgroundColor: "#fff",
    },
    textRound: {
        fontSize: 14,
        color: "#ff5500",
        backgroundColor: "transparent",
    },
    containerRoundFull: {
        paddingLeft: 13,
        paddingRight: 13,
        justifyContent: "center",
        height: 28,
        borderWidth: 1,
        borderRadius: 14,
        borderColor: "#ff5500",
        backgroundColor: "#fff",
    },
    textRoundFull: {
        fontSize: 14,
        color: "#ff5500",
        backgroundColor: "transparent",
    },
    containerRoundDefault: {
        paddingLeft: 7,
        paddingRight: 7,
        justifyContent: "center",
        height: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#999999",
        backgroundColor: "#fff",
    },
    textRoundDefault: {
        fontSize: 14,
        color: "#666666",
        backgroundColor: "transparent",
    },
});

const containerStyle = {
    "round": {
        "normal": styles.containerRound,
        "press": [styles.containerRound, {backgroundColor: "#ff5500"}],
        "disabled": [styles.containerRound, {borderColor: "#dfdfdf"}],
    },
    "roundFull": {
        "normal": styles.containerRoundFull,
        "press": [styles.containerRoundFull, {backgroundColor: "#ff5500"}],
        "disabled": [styles.containerRoundFull, {borderColor: "#cccccc"}],
    },
    "roundDefault": {
        "normal": styles.containerRoundDefault,
        "press": styles.containerRoundDefault,
        "disabled": [styles.containerRoundDefault, {borderColor: "#cccccc"}],
    },
    "roundFullDefault": {
        "normal": [styles.containerRoundFull, {borderColor: "#999999"}],
        "press": [styles.containerRoundFull, {borderColor: "#999999"}],
        "disabled": [styles.containerRoundFull, {borderColor: "#cccccc"}],
    },
};

const textStyle = {
    "round": {
        "normal": styles.textRound,
        "press": [styles.textRound, {color: "#fff"}],
        "disabled": [styles.textRound, {color: "#cccccc"}],
    },
    "roundFull": {
        "normal": styles.textRound,
        "press": [styles.textRound, {color: "#fff"}],
        "disabled": [styles.textRound, {color: "#cccccc"}],
    },
    "roundDefault": {
        "normal": styles.textRoundDefault,
        "press": styles.textRoundDefault,
        "disabled": [styles.textRoundDefault, {color: "#cccccc"}],
    },
    "roundFullDefault": {
        "normal": [styles.textRound, {color: "#333333"}],
        "press": [styles.textRound, {color: "#333333"}],
        "disabled": [styles.textRound, {color: "#cccccc"}],
    },
};