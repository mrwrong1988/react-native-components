/**
 * Created by wangyu on 2017/4/5.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';
import LceView from "./LceView";
import PullList from "../Pullable/PullList";
import omit from "../util/omit";
import { LceMode } from "./LceView";
export const SelectMode = {
    NULL: "null",
    SINGLE: "single",
    MULTI: "multy",
};

export default class LceList extends LceView {

    static defaultProps = {
        autoLoad: true,
        paging: false,
        pullable: true,
        selectMode: SelectMode.NULL,
        onEndReachedThreshold: 40,
    };


    // 构造
    constructor(props) {
        super(props);

        this.listProps = omit(this.props, "autoLoad", "paging", "selectMode");

        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return (r1 !== r2);
            }
        });

        this.dataList = [];
        this.allSelect = false;
        this.totalRecords = undefined;
        this.pageNo = 0;


        // 初始状态
        this.state = {
            ...this.state,
            ds: this.ds.cloneWithRows(this.dataList),
            selectMode: this.props.selectMode,
        };

        this.beforeModeChange = this.beforeModeChange.bind(this);
        this.onRefreshing = this.onRefreshing.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    }

    isMultiMode() {
        return this.state.selectMode === SelectMode.MULTI;
    }

    isSingleMode() {
        return this.state.selectMode === SelectMode.SINGLE;
    }

    // 切换到多选模式
    switchToMultiMode() {
        this.dataList.forEach((element) => {
            element.isSelect = false;
        });
        this.setState({
            ds: this.ds.cloneWithRows(this.dataList),
            selectMode: SelectMode.MULTI,
        });
    }

    // 切换到单选模式
    switchToSingleMode() {
        this.setState({
            ds: this.ds.cloneWithRows(this.dataList),
            selectMode: SelectMode.SINGLE,
        });
    }

    // 切换到正常模式,onPress
    switchToNormal() {
        this.setState({
            ds: this.ds.cloneWithRows(this.dataList),
            selectMode: SelectMode.NULL,
        });
    }

    // 选中一行
    selectOne(index) {
        if (this.isSingleMode()) {
            this.dataList.forEach((element) => {
                element.isSelect = false;
            });
            this.dataList[index].isSelect = true;
        } else {
            this.dataList[index].isSelect = !this.dataList[index].isSelect;
            if (!this.dataList[index].isSelect) {
                this.allSelect = false; // 清除全选模式
            }
        }
        this.renderList();
    }

    selectAll(flag) {

        this.dataList.forEach((element) => {
            element.isSelect = flag;
        });
        this.allSelect = flag;

        this.renderList();
    }

    isAllSelect() {
        return this.dataList.every((item, index, array) => item.isSelect);
    }

    getSelectInfo() {
        let selectCount = 0;
        this.dataList.forEach((element) => {
            if(element.isSelect) {
                selectCount++;
            }
        });
        return {selectAll: selectCount == this.dataList.length, selectCount: selectCount}
    }

    getList() {
        return this.dataList;
    }

    setList(dataList) {
        this.dataList = dataList;
        if (!Array.isArray(this.dataList)) {
            this.dataList = [];
        }
        this.renderList();
    }

    addItem(data, index) {
        if (typeof index === 'number') {
            this.dataList.splice(index, 0, data);
        } else {
            this.dataList.push(data);
        }
        this.renderList();
    }

    addItemList(dataList) {
        this.dataList = this.dataList.concat(dataList);
        this.renderList();
    }

    addItemListHead(dataList) {
        this.dataList = dataList.concat(this.dataList);
        this.renderList();
    }

    deleteItem(index) {
        this.dataList.splice(index, 1);
        this.renderList();
    }

    renderList() {
        //TODO 无数据处理
        //let asyncState = this.dataList.length > 0 ? 'loaded' : 'nodata';
        this.setState({
            mode: LceMode.CONTENT,
            ds: this.ds.cloneWithRows(this.dataList)
        });
    }

    setArgs(args) {
        this.loadArgs = args;
    }


    onLoadFinish() {
        //console.warn("onLoadFinish");
    }

    beforeModeChange(mode, loadedData, error) {
        super.beforeModeChange(mode, loadedData, error);
        if (mode === LceMode.CONTENT) {
            this.dataList = loadedData;
            this.state.ds = this.ds.cloneWithRows(this.dataList);
            this.pageNo = 1;
        }
    }

    onRefreshing() {
        return this.props.loadData(this.loadArgs, 1).then((result) => {
            if (result) {
                this.dataList = result;
                this.setState({
                    ds: this.ds.cloneWithRows(this.dataList),
                });
                this.pageNo = 1;
                this.onLoadFinish();
            }
        });
    }

    onLoadMore() {
        return this.props.loadData(this.loadArgs, this.pageNo+1).then((result) => {
            if (result) {
                this.dataList = this.dataList.concat(result);
                this.setState({
                    ds: this.ds.cloneWithRows(this.dataList),
                });
                this.pageNo += 1;
                this.onLoadFinish();
            }
        });
    }

    onEndReached() {
        if (this.props.paging) {
            if (typeof this.totalRecords === "undefined" || this.dataList.length < this.totalRecords) {
                this.onLoadMore();
            }
        }

        this.props.onEndReached && this.props.onEndReached();
    }

    componentWillReceiveProps(nextProps) {
        //super.componentWillReceiveProps(nextProps);
        this.listProps = omit(this.props, "autoLoad", "paging", "selectMode");
    }

    getContentView() {
        return (
            <PullList {...this.listProps}
                      dataSource={this.state.ds}
                      onRefreshing={this.onRefreshing}
                      onEndReached={this.onEndReached} />
        );
    }
}