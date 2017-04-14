/**
 * Created by wangyu on 2017/3/28.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    InteractionManager,
} from 'react-native';
import Err from "../util/Err";

export const LceMode = {
    INIT: "init",
    LOADING: "loading",
    CONTENT: "content",
    ERROR: "error",
};

export default class LceView extends Component {

    static defaultProps = {
        autoLoad: true,

    };

    // 构造
    constructor(props) {
        super(props);


        this.loadArgs = this.props.args;
        this.isMounted = false;

        // 初始状态
        this.state = {
            mode: LceMode.INIT,
        };

        this.beforeModeChange = this.beforeModeChange.bind(this);
    }

    // 设置对应状态数据
    beforeModeChange(mode, loadedData, error) {
        if (mode === LceMode.ERROR) {
            this.state.errorText = error;
        }
    }


    setMode(mode, loadedData, error) {
        this.beforeModeChange(mode, loadedData, error);
        this.setState({
            mode: mode,
        });
    }

    async initData() {
        if (typeof this.props.loadData !== 'function') {
            return;
        }
        this.setState({
            mode: LceMode.LOADING,
        });

        let mode = LceMode.CONTENT;
        let errorText = "";
        let loadedData = null;
        try {
            loadedData = await this.props.loadData(this.loadArgs);
        } catch (e) {
            mode = LceMode.ERROR;
            errorText = Err.getDesc(e);
        }
        this.setMode(mode, loadedData, errorText);

        this.onLoadFinish && this.onLoadFinish();
    }

    componentWillUnmount() {
        this.isMounted = false;
    }

    componentDidMount() {
        this.isMounted = true;
        if (this.props.autoLoad) {
            InteractionManager.runAfterInteractions(() => {
                this.initData(this.loadArgs);
            });
        }
    }


    render() {

        switch (this.state.mode) {
            case LceMode.LOADING:
                return <View style={{flex: 1}}><Text>Loading</Text></View>;
            case LceMode.CONTENT:
                return this.getContentView();
            case LceMode.ERROR:
                return <View style={{flex: 1}}><Text>Error</Text></View>;
            default:
                return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    error: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});