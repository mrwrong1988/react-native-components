/**
 * Created by wangyu on 2016/6/29.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import baseStyle from '../baseStyle';
import {BarHeight} from '../StatusBar/index';


export default class OptionMenu extends Component {

    // 构造
    constructor(props) {
        super(props);

        this.menuItems = [];
        this.show = false;

        // 初始状态
        this.state = {
            layerSize: this.hideSize,
        };

        let {width, height} = Dimensions.get('window');
        this.layerSize = {
            width: width,
            height: height - BarHeight,
        };

        this.hideSize = {
            width: 0,
            height: 0,
        };

    }

    initMenuItems(menuItems) {
        this.menuItems = menuItems;
    }

    toggle() {
        if (this.show) {
            this.hideMenu();
        } else {
            this.showMenu();
        }
    }

    isShow() {
        return this.show;
    }

    showMenu() {
        this.setState({
            layerSize: this.layerSize,
        }, () => {
            this.show = true;
        });
    }

    hideMenu() {
        this.setState({
            layerSize: this.hideSize,
        }, () => {
            this.show = false;
        });
    }


    closeFunc() {
        this.hideMenu();
        this.props.closeFunc && this.props.closeFunc();
    }

    onMenuClick(event) {

        this.props.closeFunc && this.props.closeFunc();

        this.props.onMenuClick && this.props.onMenuClick(event);
    }


    _getMenuListView() {
        let menuList = [];
        let lastIndex = this.menuItems.length-1;
        this.menuItems.forEach((item, index) => {
            menuList.push(
                <TouchableOpacity key={index} onPress={() => this.onMenuClick(this.menuItems[index])}>
                    <View style={[styles.item]}>
                        <Image style={styles.icon} resizeMode='stretch' source={item.icon}/>

                        <Text style={styles.title}>
                            {item.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            );

            if (index !== lastIndex) {
                menuList.push(<View key={"Line"+index} style={styles.separatorLine} />);
            }
        });

        return menuList;
    }

    render() {
        return (
            <TouchableOpacity style={[styles.menuLayer, this.state.layerSize]}
                              activeOpacity={1.0}
                              onPress={() => this.closeFunc() }>
                {
                    this.state.layerSize === this.layerSize ?
                        <View style={styles.menuDialog}>
                            <View style={styles.arrowLine} />
                            <View style={styles.menuListContainer}>
                                {
                                    this._getMenuListView()
                                }
                            </View>
                            <Image style={styles.arrowIcon} resizeMode="stretch" source={require("./images/top-arrow.png")} />
                        </View>
                        :
                        null
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    menuLayer: {
        position: 'absolute',
        right: 0,
        top: BarHeight,
        backgroundColor: 'transparent',
    },
    menuDialog: {
        position: 'absolute',
        top: 45,
        right: 5,
    },
    arrowLine: {
        height: 7.5,
        backgroundColor: 'transparent',
    },
    arrowIcon: {
        position: 'absolute',
        top: 0,
        right: 16,
        width: 11,
        height: 7.6,
    },
    menuListContainer: {
        backgroundColor: 'rgba(51, 51, 51, 0.9)',
        borderRadius: 3,
    },
    item: {
        height: 43,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 110,
    },
    icon: {
        marginLeft: 10,
        width: 20,
        height: 20,
    },
    title: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 14,
        color: '#fff'
    },
    separatorLine: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
});