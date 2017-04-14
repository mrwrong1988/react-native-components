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

export default class ContentMenu extends Component {


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        this.windowWidth = Dimensions.get('window').width;

    }

    closeFunc() {
        this.props.closeFunc && this.props.closeFunc();
    }

    onItemClick(key) {

        this.props.closeFunc && this.props.closeFunc();

        this.props.onItemClick && this.props.onItemClick(key, this.props.rowID);
    }

    _getPosition() {

        if (this.props.right) {
            return {
                top: this.props.bottom-55,
                right: this.windowWidth - this.props.right,
            };
        } else {
            return {
                top: this.props.bottom-55,
                left: this.props.left,
            };
        }

    }

    render() {
        return (

            <View style={[styles.menuDialog, this._getPosition()]}>
                <View style={styles.menuListContainer}>
                    {
                        this.props.menuItems.map((item, index) => {
                            return (
                                <TouchableOpacity style={styles.item} key={index} onPress={() => this.onItemClick(item.key)}>

                                    <Image style={styles.icon} source={item.icon}/>

                                    <Text style={styles.title}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
                <View style={styles.arrowLine}>
                    <Image style={styles.arrowIcon} resizeMode="stretch" source={require("./images/right-arrow.png")} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    menuDialog: {
        flexDirection: 'row',
        position: 'absolute',
        height: 55,
    },
    arrowLine: {
        width: 6,
        backgroundColor: 'transparent',
    },
    arrowIcon: {
        position: 'absolute',
        top: 31,
        left: 0,
        width: 6,
        height: 12,
    },
    menuListContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(51, 51, 51, 0.9)',
        borderRadius: 3,
    },
    item: {
        marginLeft: 14,
        marginRight: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 15,
        height: 15,
    },
    title: {
        marginTop: 8,
        fontSize: 13,
        color: '#fff',
        backgroundColor: 'transparent'
    },
});