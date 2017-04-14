/**
 * Created by wangyu on 2017/4/1.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import styles from "./styles";
import { PullState } from "./Pullable";

export default class DefaultPullIndicator extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            showIndicator: false,
            tipText: "下拉刷新...",
        };

        this.updateIndicator = this.updateIndicator.bind(this);
    }

    updateIndicator(pullState, gesturePosition) {
        if (!this.mounted) {
            return;
        }

        switch (pullState) {
            case PullState.PULL_TO_REFRESH:
                this.setState({
                    showIndicator: false,
                    tipText: "下拉刷新...",
                });
                break;
            case PullState.RELEASE_TO_REFRESH:
                this.setState({
                    showIndicator: false,
                    tipText: "松开刷新...",
                });
                break;
            case PullState.REFRESHING:
                this.setState({
                    showIndicator: true,
                    tipText: "玩命刷新中...",
                });
                break;
        }
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <View style={[styles.defaultIndicator, {height: this.props.indicatorHeight}]}>
                {
                    this.state.showIndicator &&
                    <ActivityIndicator size="small" color="gray" />
                }
                <Text style={styles.hide}>{this.state.tipText}</Text>
            </View>
        );
    }
}