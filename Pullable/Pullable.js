/**
 * Created by wangyu on 2017/4/1.
 */
import React, { Component } from 'react';
import {
    View,
    PanResponder,
    Animated,
    Easing,
} from 'react-native';
import styles from "./styles";
import omit from "../util/omit";
import DefaultPullIndicator from "./DefaultPullIndicator";

export const PullState = {
    INIT: 1,
    PULL_TO_REFRESH: 2,
    RELEASE_TO_REFRESH: 3,
    REFRESHING: 4,
};

const isDownGesture = (x, y) => {
    return y > 0 && (y > Math.abs(x));
};
const isUpGesture = (x, y) => {
    return y < 0 && (Math.abs(x) < Math.abs(y));
};
const isVerticalGesture = (x, y) => {
    return (Math.abs(x) < Math.abs(y));
};

export default class extends Component {

    static defaultProps = {
        indicatorHeight: 60,
        duration: 300,
        pullOkMargin: 100,
        pullable: true,
        isPullEnd: false,
        PullIndicator: null,
        style: null,
        onPushing: null,
        onPullToRefresh: null,
        onReleaseToRefresh: null,
        onRefreshing: () => new Promise( (resolve, reject) => { setTimeout(() => resolve(), 300) } ),
    };

    constructor(props) {
        super(props);

        this.scrollViewProps = omit(this.props, "indicatorHeight", "duration", "pullOkMargin", "pullable",
            "isPullEnd", "PullIndicator", "style", "onPushing", "onPullToRefresh", "onReleaseToRefresh", "onRefreshing");

        this.pullable = this.props.pullable;
        this.defaultScrollEnabled = false;
        this.defaultXY = {x: 0, y: this.props.indicatorHeight * -1};
        this.state = {
            pullPan: new Animated.ValueXY(this.defaultXY),
            scrollEnabled: this.defaultScrollEnabled,
            height: 0
        };
        this.gesturePosition = {x: 0, y: 0};

        this.flag = PullState.INIT;

        this.onScroll = this.onScroll.bind(this);
        this.onLayout = this.onLayout.bind(this);
        this.resetDefaultXYHandler = this.resetDefaultXYHandler.bind(this);
        this.resolveHandler = this.resolveHandler.bind(this);
        this.setPullState = this.setPullState.bind(this);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
            onMoveShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
            onPanResponderGrant: () => {},
            onPanResponderMove: this.onPanResponderMove.bind(this),
            onPanResponderRelease: this.onPanResponderRelease.bind(this),
            onPanResponderTerminate: this.onPanResponderRelease.bind(this),
        });
    }

    onShouldSetPanResponder(e, gesture) {
        if (!this.pullable || !isVerticalGesture(gesture.dx, gesture.dy)) { //不使用pullable,或非向上 或向下手势不响应
            return false;
        }
        if (!this.state.scrollEnabled) {
            this.lastY = this.state.pullPan.y._value;
            return true;
        } else {
            return false;
        }
    }

    onPanResponderMove(e, gesture) {
        this.gesturePosition = {x: this.defaultXY.x, y: gesture.dy};
        if (isUpGesture(gesture.dx, gesture.dy)) { //向上滑动
            if(this.flag !== PullState.INIT) {
                this.resetDefaultXYHandler();
            } else if(this.props.onPushing && this.props.onPushing(this.gesturePosition)) {
                // do nothing, handling by this.props.onPushing
            } else {
                this.scroll.scrollTo({x:0, y: gesture.dy * -1});
            }

        } else if (isDownGesture(gesture.dx, gesture.dy)) { //下拉
            this.state.pullPan.setValue({x: this.defaultXY.x, y: this.lastY + gesture.dy / 2});
            if (this.flag !== PullState.REFRESHING) {
                if (gesture.dy < this.props.indicatorHeight + this.props.pullOkMargin) { //正在下拉
                    if (this.flag !== PullState.PULL_TO_REFRESH) {
                        this.props.onPullToRefresh && this.props.onPullToRefresh();
                    }
                    this.setPullState(PullState.PULL_TO_REFRESH);
                } else { //下拉到位
                    if (this.flag !== PullState.RELEASE_TO_REFRESH) {
                        this.props.onReleaseToRefresh && this.props.onReleaseToRefresh();
                    }
                    this.setPullState(PullState.RELEASE_TO_REFRESH);
                }
            }

        }
    }

    onPanResponderRelease(e, gesture) {
        if (this.flag === PullState.PULL_TO_REFRESH) { //没有下拉到位
            this.resetDefaultXYHandler(); //重置状态
        } else if (this.flag === PullState.RELEASE_TO_REFRESH) {
            let promiseResult = Promise.resolve(this.props.onRefreshing());
            promiseResult.then(() => {
                this.resolveHandler();
                return true;
            }, () => {
                this.resolveHandler();
                return false;
            });

            this.setPullState(PullState.REFRESHING); //完成下拉，已松开
            Animated.timing(this.state.pullPan, {
                toValue: {x: 0, y: 0},
                easing: Easing.linear,
                duration: this.props.duration
            }).start();
        } else if (this.flag === PullState.REFRESHING) {
            if (this.state.pullPan.y._value > 0) {
                Animated.timing(this.state.pullPan, {
                    toValue: {x: 0, y: 0},
                    easing: Easing.linear,
                    duration: this.props.duration
                }).start();
            }
        }
    }

    onScroll(e) {
        if (e.nativeEvent.contentOffset.y <= 0) {
            if (this.state.scrollEnabled !== this.defaultScrollEnabled) {
                this.setState({scrollEnabled: this.defaultScrollEnabled});
            }
        } else if(this.flag === PullState.INIT) {
            if (!this.state.scrollEnabled) {
                this.setState({scrollEnabled: true});
            }
        }
    }

    setPullState(flag) {
        if (this.flag !== flag) {
            this.flag = flag;
            if (this.indicatorRef && this.indicatorRef.updateIndicator) {
                this.indicatorRef.updateIndicator(this.flag, this.gesturePosition);
            }
        }
    }

    /** 数据加载完成后调用此方法进行重置归位
     */
    resolveHandler() {
        if (this.flag === PullState.REFRESHING) { //仅触摸松开时才触发
            this.resetDefaultXYHandler();
        }
    }

    resetDefaultXYHandler() {
        this.flag = PullState.INIT;
        this.state.pullPan.setValue(this.defaultXY);
    }

    componentWillReceiveProps(nextProps) {
        this.scrollViewProps = omit(nextProps, "indicatorHeight", "duration", "pullOkMargin", "pullable",
            "isPullEnd", "PullIndicator", "style", "onPushing", "onPullToRefresh", "onReleaseToRefresh", "onRefreshing");
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.isPullEnd) {
            this.resetDefaultXYHandler();
        }
    }

    onLayout(e) {
        if (this.state.width !== e.nativeEvent.layout.width || this.state.height !== e.nativeEvent.layout.height) {
            this.scrollContainer.setNativeProps({style: {width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height}});
            this.width = e.nativeEvent.layout.width;
            this.height = e.nativeEvent.layout.height;
        }
    }

    render() {
        let PullIndicator = this.props.PullIndicator || DefaultPullIndicator;
        return (
            <View style={[styles.pullableWrap, this.props.style]} onLayout={this.onLayout}>
                <Animated.View style={[this.state.pullPan.getLayout()]}>
                    <PullIndicator ref={ ref => this.indicatorRef = ref} indicatorHeight={this.props.indicatorHeight} />
                    <View ref={(c) => {this.scrollContainer = c;}}
                          {...this.panResponder.panHandlers}
                          style={{width: this.state.width, height: this.state.height}}>
                        {this.getScrollable(this.scrollViewProps)}
                    </View>
                </Animated.View>
            </View>
        );
    }
}
