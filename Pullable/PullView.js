/**
 * Created by wangyu on 2017/4/1.
 */
import React from 'react';
import {
    ScrollView,
} from 'react-native';
import Pullable from './Pullable';


export default class extends Pullable {

    constructor(props) {
        super(props);
        this.scrollTo = this.scrollTo.bind(this);
        this.scrollToEnd = this.scrollToEnd.bind(this);
    }

    scrollTo(...args) {
        this.scroll.scrollTo(...args);
    }

    scrollToEnd(args) {
        this.scroll.scrollTo(args);
    }

    getScrollable(props) {
        return (
            <ScrollView ref={(c) => {this.scroll = c;}} scrollEnabled={this.state.scrollEnabled} onScroll={this.onScroll}>
                {props.children}
            </ScrollView>
        );
    }

}