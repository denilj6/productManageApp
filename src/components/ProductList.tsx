import { Component } from "react";
import React from "react";
import { View, Text, Image, Dimensions, AsyncStorage, Platform, PermissionsAndroid, TextInput, Picker, ToastAndroid, FlatList } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { openDatabase } from 'react-native-sqlite-storage';
import { NavigationEvents } from "react-navigation";

interface Props {
    navigation?: any;
}
interface State {
    productData: any
}

export default class ProductList extends Component<Props, State> {
    private db = openDatabase({ name: 'productmanagement.db' });
    navigationWillFocusListener: any;
    constructor(props: Props) {
        super(props);
       
        this.state = {
            productData: []
        }

    }
   

    componentDidMount() {
        this.db.transaction((tx: any) => {
            tx.executeSql('SELECT * FROM product_list', [], (tx: any, results: any) => {
                let temp: any = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }
                this.setState({
                    productData: temp
                })
            });
        });
    }

    renderItem = (items: any) => {
        let item = items.item
        return (
            <View style={{ flex: 1,maxWidth:150,  margin: 10, elevation: 10, backgroundColor: '#fff', padding: 10 }}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('productDetails',{productData:item})}>
                    <View >
                        <Text style={{ color: '#000', fontSize: 14, marginLeft: 25, fontWeight: 'bold' }}>{item.name}</Text>
                        <Text style={{ color: '#000', fontSize: 14 }}>{'Quantity :' + item.quantity}</Text>
                        <Text style={{ color: '#000', fontSize: 14 }}>{'Price: $ ' + item.price}</Text>
                    </View>
                </TouchableOpacity>
            </View>


        )

    }
    tableView = () => {

        return (
            <View>
                <FlatList
                    key={Math.random()}
                    numColumns={2}
                    data={this.state.productData}
                    renderItem={(item: any) => this.renderItem(item)}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#E5E5EC' }}>
                <View style={{ flex: 1, }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#4A4A50', height: 50, padding: 10 }}>
                        <Image style={{ width: 30, height: 30 }}
                            source={require('../assets/splash.png')} />
                        <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginLeft: 10, marginTop: 5 }}>Billings</Text>
                    </View>
                    {this.state.productData.length > 0 ? <View style={{}}>
                        {this.tableView()}
                    </View> : null}
                </View>
            </View>

        )
    }
}