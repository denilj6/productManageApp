import { Component } from "react";
import React from "react";
import { View, Text, Image, Dimensions, AsyncStorage } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

interface Props {
    navigation: any;
}
interface State {
}

export default class LoadingPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {

        let _this = this;
        setTimeout(function timer() {
            AsyncStorage.getItem('isLogin').then(isLogin => {
                if (isLogin === '1') {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({
                            routeName: 'HomePage',
                            params: {  }
                        }),
                        ],
                    });
                    _this.props.navigation.dispatch(resetAction);
                }else{
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({
                            routeName: 'LoginScreen',
                            params: {  }
                        }),
                        ],
                    });
                    _this.props.navigation.dispatch(resetAction);
                }
            })
          
        }, 3000)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Image style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                    source={require('../assets/splash.png')} />
                    <Text style={{fontSize:30,fontWeight:'bold',textAlign:'center'}}> Product Management...</Text>
            </View>
        )
    }
}