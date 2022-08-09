/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import axios from 'axios';
const Width = Dimensions.get('window').width;
// const Height = Dimensions.get('window').height;
export default function Details({navigation, route, navigation: {goBack}}) {
  var id = route.params.id ? route.params.id : '';
  var title = route.params.title ? route.params.title : '';
  var body = route.params.body ? route.params.body : '';

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (route.params.id) {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts/${route.params.id}}/comments`,
        )
        .then(response => {
          // console.log(‘response’, response)
          if (response.status === 200) {
            setComments([...response.data]);
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }, []);
  return (
    <View style={{}}>
      <View style={[{padding: 10}]}>
        <TouchableOpacity onPress={() => goBack()}>
          <Text
            style={{
              marginLeft: 320,
              fontWeight: '900',
              fontSize: 16,
              color: 'black',
            }}>
            Back
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            borderTopWidth: 1,
            color: 'black',
            fontSize: 17,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
        <Text style={{color: 'black', fontSize: 14, marginTop: 10}}>
          {body}
        </Text>
      </View>
    </View>
  );
}
