import { Component } from "react";
import React from "react";
import { View, Text, Image, Dimensions, AsyncStorage, Platform, PermissionsAndroid, TextInput, Picker, ToastAndroid, FlatList } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { openDatabase } from 'react-native-sqlite-storage';

interface Props {
}
interface State {
    name: string;
    quantity: any;
    price: any,
    state: any,
    productData: any,
}

export default class AddProducts extends Component<Props, State> {
    private db = openDatabase({ name: 'productmanagement.db' });
    constructor(props: Props) {
        super(props);
        this.state = {
            name: '',
            quantity: '',
            price: '',
            state: '0',
            productData: []
        }

    }
    componentDidMount() {

    }

    renderPicker = () => {
        return (
            <View style={{ margin: 10 }}>
                <Picker
                    selectedValue={this.state.state.toString()}
                    style={{ height: 50, width: Dimensions.get('screen').width, borderWidth: 1, borderColor: '#000' }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ state: parseInt(itemValue) })}
                >
                    <Picker.Item label="Choose a state tax" value='0' />
                    <Picker.Item label="UP 2%" value="2" />
                    <Picker.Item label="KL 6%" value="6" />
                    <Picker.Item label="TN 3.5%" value="3.5" />
                    <Picker.Item label="KK 6%" value="6" />

                </Picker>
            </View>

        )
    }
    saveProduct = () => {

        if (this.state.state === '0') {
            ToastAndroid.showWithGravity("Please choose a product tax", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (this.state.name == '') {
            ToastAndroid.showWithGravity("Please choose a valid  product label", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (this.state.quantity == '') {
            ToastAndroid.showWithGravity("Please choose a valid product quantity", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (this.state.price == '') {
            ToastAndroid.showWithGravity("Please choose a product price", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
            let quantity=parseInt(this.state.quantity);
            let price=parseInt(this.state.price);
            let state=parseInt(this.state.state);
            let name=(this.state.name);

            let id=parseInt(''+(Math.random() * 10) + 1);
            this.db.transaction(function (tx: any) {                
                tx.executeSql(
                    'INSERT INTO product_list (id,name, price,quantity,tax) VALUES (?,?,?,?,?)',
                    [id, name, price,quantity,state],
                    (tx: any, results: any) => {
                      if (results.rowsAffected > 0) {
                      }
                    }
                  );
                  ;
              })


            let a = {
                quantity: this.state.quantity,
                name: this.state.name,
                price: this.state.price
            }
            this.setState({
                productData: [
                    ...this.state.productData,
                    a
                ],
                quantity: '',
                name: '',
                price: ''
            })
        }
    }
    renderProductView = () => {
        return (
            <View style={{ margin: 5 }}>
                <TextInput
                    style={{ borderRadius: 10, borderWidth: 1, textAlign: 'center' }}
                    underlineColorAndroid='transparent'
                    placeholder={'Add product label'}
                    onChangeText={text => this.setState({ name: text })}
                    value={this.state.name}
                />
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <TextInput
                        style={{ flex: 1, marginRight: 5, borderRadius: 10, borderWidth: 1, textAlign: 'center' }}
                        underlineColorAndroid='transparent'
                        keyboardType='number-pad'
                        placeholder={'Add product quantity'}
                        onChangeText={text => this.setState({ quantity: parseInt(text) })}
                        value={!!this.state.quantity ? (this.state.quantity).toString() : ''}
                    />
                    <TextInput
                        style={{ flex: 1, marginLeft: 5, borderRadius: 10, borderWidth: 1, textAlign: 'center' }}
                        underlineColorAndroid='transparent'
                        placeholder={'Add product price'}
                        keyboardType='number-pad'
                        onChangeText={text => this.setState({ price: parseInt(text) })}
                        value={!!this.state.price ? (this.state.price).toString() : ''}
                    />
                </View>
                <TouchableOpacity onPress={this.saveProduct} style={{ backgroundColor: '#111DD8', marginTop: 10, height: 50, borderRadius: 10 }}>
                    <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 15, fontWeight: 'bold' }}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderItem = (items: any) => {
        let item = items.item
        return (
            <View style={{ flexDirection: 'row', height: 50, padding: 5 }}>
                <Text style={{ flex: 1, color: '#000', fontSize: 14 }}>{item.name}</Text>
                <Text style={{ flex: 1, color: '#000', fontSize: 14 }}>{item.quantity}</Text>
                <Text style={{ flex: 1, color: '#000', fontSize: 14 }}>{item.price}</Text>
            </View>
        )

    }

    tableView = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', height: 50, paddingLeft: 10 }}>
                    <Text style={{ flex: 1, color: '#000', fontWeight: 'bold', fontSize: 18 }}>name</Text>
                    <Text style={{ flex: 1, color: '#000', fontWeight: 'bold', fontSize: 18 }}>quantity</Text>
                    <Text style={{ flex: 1, color: '#000', fontWeight: 'bold', fontSize: 18 }}>price</Text>
                </View>
                <FlatList
                    key={Math.random()}
                    data={this.state.productData}
                    renderItem={(item: any) => this.renderItem(item)}
                />
            </View>
        )
    }
    getTotal = () => {
        let total = 0;
        this.state.productData.forEach(element => {
            total = total + parseInt(element.price)
        });
        return (total).toFixed(2)
    }
    getTax = () => {
        let tax = 0;
        tax =parseFloat(this.getTotal())  * (this.state.state / 100)
        return tax.toFixed(2)
    }
    getGrandTotal = () => {
        let total = 0;
        total =parseFloat(this.getTotal())  +  parseFloat(this.getTax())
        return total.toFixed(2)
    }
    renderTotalPrices = () => {
        return (
            <View style={{ margin: 10 }}>
                <Text style={{ flex: 1, color: '#000', fontWeight: 'bold', fontSize: 18 }}>{'Total price without tax: $' + this.getTotal()}</Text>
                <Text style={{ flex: 1, color: '#000', fontWeight: 'bold', fontSize: 18 }}>{'Discount 3.0 %:     $30.00'}</Text>
                <Text style={{ flex: 1, color: '#000', fontWeight: 'bold', fontSize: 18 }}>{'Tax ' + this.state.state + '%  '}</Text>
                <Text style={{ flex: 1, color: '#000', fontWeight: 'bold', fontSize: 18 }}>{'Total Price  $' + (parseInt(this.getGrandTotal()))}</Text>

            </View>
        )
    }
    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, }}>
                    <View style={{ flex: 1, backgroundColor: '#C5F5F0' }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#D3D4DC', height: 50, padding: 10 }}>
                            <Image style={{ width: 30, height: 30 }}
                                source={require('../assets/splash.png')} />
                            <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginLeft: 10, marginTop: 5 }}>Add Products</Text>
                        </View>
                        {this.renderPicker()}
                        {this.renderProductView()}
                    </View>
                    {this.state.productData.length > 0 ? <View style={{ flex: 1, minHeight: 250, backgroundColor: '#91988D' }}>
                        {this.tableView()}
                    </View> : null}
                    {this.state.productData.length > 0 ? <View style={{ minHeight: 250, flex: 1, backgroundColor: '#6474F6' }}>
                        {this.renderTotalPrices()}
                    </View> : null}
                </View>
            </ScrollView>

        )
    }
}