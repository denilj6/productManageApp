import { Component } from "react";
import React from "react";
import { View, Text, Image, Dimensions, AsyncStorage, Platform, PermissionsAndroid, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { openDatabase } from 'react-native-sqlite-storage';

interface Props {
    navigation: any;
}
interface State {
    userName: string;
    password: string
}

export default class LoginScreen extends Component<Props, State> {
  private db = openDatabase({ name: 'productmanagement.db' });

    constructor(props: Props) {
        super(props);
        this.state = {
            userName: 'denilj6@gmail.com',
            password: 'denil@123'
        }

    }
    componentDidMount() {      
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(response => {
            if (!response) {
              this.grantPermission()
            }else{
              this.createTables()
            }
          });
    }
    grantPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "We need storage write access",
            message:
              "We need storage write access " +
              "so you can store your products.",
            buttonPositive: "OK"
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.createTables()
        } else {
          this.createTables()
        }
      }
      createTables = () => {
        this.db.transaction(function (tx: any) {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS product_list(id INTEGER PRIMARY KEY , name VARCHAR(20), price INTEGER, quantity INTEGER, tax INTEGER)',
            []
          );
        })
        
      }
    login = () => {
       AsyncStorage.setItem('isLogin','1');
       this.props.navigation.navigate('HomePage')
    }
    render() {
        return (
            <View style={{ flex: 1, margin: 10, }}>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Image style={{ width: 60, height: 60 }}
                        source={require('../assets/splash.png')} />
                    <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginLeft: 10, marginTop: 20 }}>Login</Text>
                </View>
                <View style={{ marginTop: 150 }}>
                    <View style={{ margin: 10 }}>
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder={'Email id'}
                            onChange={()=>this.setState({userName:'denilj6@gmail.com'})}
                            value={this.state.userName}
                        />
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder={'Password'}
                            secureTextEntry={true}
                            onChange={()=>this.setState({userName:'denil@123'})}
                            value={this.state.password}
                        />
                        <TouchableOpacity onPress={this.login} style={{ backgroundColor: '#111DD8', height: 50 }}>
                            <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 15, fontWeight: 'bold' }}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>



            </View>
        )
    }
}