/**
 * Created by wangyu on 2017/3/30.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class Header extends Component {

    static defaultProps = {
        onHeaderEvent: (event) => console.warn(JSON.stringify(event)),
        getHeaderOptions: () => {},
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {

        let {routeStack, presentedIndex} = this.props.navState;
        let options = this.props.getHeaderOptions(routeStack[routeStack.length-1]);
        let rightBtns = options.rightBtns || [];

        return (
            <View style={{position: "absolute", left: 0, top: 0, right: 0, flexDirection: "row",height: 44, backgroundColor: "#4a9df8", alignItems: "center"}}>
                <TouchableOpacity style={{flexDirection: "row", width: 80}}
                                  onPress={this.props.onHeaderBack}>
                    <Image style={styles.backIcon} source={require("./images/back_icon.png")}/>
                    <Text>back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, alignItems: "center"}}
                                  activeOpacity={1.0}
                                  onPress={() => this.props.onHeaderEvent({id: "title"})}>
                    <Text>{options.title}</Text>
                    <Text>sub title</Text>
                </TouchableOpacity>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-end", width: 80}}>
                    {
                        rightBtns.map((item, index) => {
                            return (
                                <TouchableOpacity key={item.id} onPress={() => this.props.onHeaderEvent({id: item.id})}>
                                    {
                                        item.icon ?
                                            <Image source={item.icon} />
                                            :
                                            <Text>{item.title}</Text>
                                    }
                                </TouchableOpacity>
                            )
                        })
                    }
                    {
                        options.menuItems && options.menuItems.length > 0 &&
                        <TouchableOpacity onPress={ () => this.props.onHeaderEvent({id: "optionMenuToggle"}) }>
                            <Image source={require("./images/back_icon.png")} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backIcon: {
        width: 11.5,
        height: 22,
    }
});