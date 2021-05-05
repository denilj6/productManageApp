import { Component } from "react";
import React from "react";
import { View, Text, Image, Dimensions, AsyncStorage } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddProducts from "../components/AddProducts";
import ProductList from "../components/ProductList";

interface Props {
    navigation: any;
}
interface State {
    reloadBuffer: number
}

export default class HomePage extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            reloadBuffer: 0
        }

    }
    componentDidMount() {

    }

    billing = () => {
        return (
            <AddProducts></AddProducts>
        );
    }
    products = () => {
        return (
            <ProductList navigation={this.props.navigation}></ProductList>
        );
    }
logout=()=>{
    AsyncStorage.setItem('isLogin','0')
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
            routeName: 'LoginScreen',
            params: { isFromIndex: true }
        }),
        ],
    });
    this.props.navigation.dispatch(resetAction);
}
    SettingsScreen=()=> {
        return (
                 <TouchableOpacity onPress={this.logout} style={{ backgroundColor: '#111DD8', marginTop: 10, height: 50, borderRadius: 10 }}>
                    <Text style={{ color: '#ffffff', textAlign: 'center', marginTop: 15, fontWeight: 'bold' }}>Logout </Text>
                </TouchableOpacity>
        );
    }
    render() {
        const Tab = createBottomTabNavigator();

        return (
            <View style={{ flex: 1 }}>
                <NavigationContainer  >
                    <Tab.Navigator

                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;

                                if (route.name === 'Billing') {
                                    iconName = focused
                                        ? 'add-circle'
                                        : 'add-circle-outline';
                                } else if (route.name === 'Settings') {
                                    iconName = focused ? 'build-sharp' : 'build-outline';
                                } else {
                                    iconName = focused ? 'md-list-circle-sharp' : 'md-list-outline';
                                }

                                return <Ionicons name={iconName} size={size} color={color} />;
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: 'tomato',
                            inactiveTintColor: 'gray',
                        }}>
                        <Tab.Screen options={{ unmountOnBlur: true }}
                            name="Billing" component={this.billing} />
                        <Tab.Screen options={{ unmountOnBlur: true }} name="Products" component={this.products} />
                        <Tab.Screen options={{ unmountOnBlur: true }} name="Settings" component={this.SettingsScreen} />
                    </Tab.Navigator>
                </NavigationContainer>

            </View>
        )
    }
}
