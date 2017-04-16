/**
 * Created by wwt on 2017/3/10.
 * 封装checkbox控件
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import StyleSheet from 'StyleSheet';

function TextLabel(props) {
    return (
        <Text>
            {props.children}
        </Text>
    );
}

export default class CheckBox extends Component {

    static defaultProps = {
        value: 0,
        selMode: "single",
        unSelIcon: require("../asset/icon_unselect.png"),
        selIcon: require("../asset/icon_select.png"),
        iconStyle: {width: 22,height: 22, marginRight: 10},
    };

    // 构造
    constructor(props) {
        super(props);
        this.state={
            value: this.props.value,
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        });
    }

    /**
     * 当前是否选中，选中返回1，未选中返回0
     * @instance
     * @return {number}
     */
    isSelected() {
        return this.value;
    }

    toggle() {
        if (!(this.props.selMode === "single" && this.state.value === 1)) {
            this.setState({
                value: this.state.value === 0 ? 1 : 0,
            }, () => {
                this.props.onToggle && this.props.onToggle(this.state.value);
            });
        }
    }

    _getChildren() {
        if (typeof this.props.children === "undefined") {
            return null;
        } else if (typeof this.props.children === "string") {
            return <TextLabel>{this.props.children}</TextLabel>;
        } else {
            return this.props.children;
        }
    }

    render() {
        return (
            <TouchableOpacity style={[this.props.style, styles.container]}
                              onPress={this.toggle}>
                <Image style={this.props.iconStyle}
                       source={this.state.value ? this.props.selIcon : this.props.unSelIcon }/>
                {
                    this._getChildren()
                }
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
});
