import { Component } from "react";
import React from "react";
import { View, Text, Image, Dimensions, AsyncStorage, Platform, PermissionsAndroid, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { openDatabase } from 'react-native-sqlite-storage';

interface Props {
  navigation: any;
}
interface State {
  productData: any
}

export default class ProductDetails extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      productData: {}
    }

  }
  componentDidMount() {
    const { params } = this.props.navigation.state
    console.log('kksssss ', params.productData);

    this.setState({
      productData: params.productData
    })
  }

  getGrandTotal = () => {
    let total = 0;
    total = (parseFloat(this.state.productData.price) - (this.state.productData.price * .3)) + (this.state.productData.price * (this.state.productData.tax / 100))
    return total.toFixed(2)
  }
  renderTotalPrices = () => {    
    return (
      <View style={{flex:1, margin: 10 }}>
        <Text style={{  color: '#000', fontWeight: 'bold', fontSize: 18 }}>{'Total price without tax: $' + this.state.productData.price}</Text>
        <Text style={{  color: '#000', fontWeight: 'bold', fontSize: 18 }}>{'Discount 3.0 %'}</Text>
        <Text style={{  color: '#000', fontWeight: 'bold', fontSize: 18 }}>{'Tax ' + this.state.productData.tax + '%'}</Text>
        <Text style={{  color: '#000', fontWeight: 'bold', fontSize: 18 }}>{'Total Price:   $' + (this.getGrandTotal())}</Text>

      </View>
    )
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#4A4A50', height: 50, padding: 10 }}>
            <Image style={{ width: 30, height: 30 }}
              source={require('../assets/splash.png')} />
            <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginLeft: 10, marginTop: 5 }}>Product Details</Text>
          </View>
          {this.renderTotalPrices()}
        </View>
    )
  }
}