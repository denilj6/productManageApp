
import React, { Component } from 'react';
import { View } from 'react-native';
import AppNavigator from './src/pages/AppNavigator';

export default class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <AppNavigator />
    )
  }
}