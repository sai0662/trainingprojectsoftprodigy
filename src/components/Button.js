/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';

const Width = Dimensions.get('window').width;
// const Height = Dimensions.get('window').height;
const Button = props => {
  return (
    <View
      style={{
        borderRadius: 10,
        marginLeft: 25,
        backgroundColor: props.backgroundColor,
        marginTop: props.marginTop,
        justifyContent: 'center',
        marginBottom: 10,
        padding: props.padding,
        width: Width - 300,
      }}>
      <TouchableOpacity
        style={{padding: 5, alignItems: 'center'}}
        onPress={props.runit}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
          {props.name}{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
