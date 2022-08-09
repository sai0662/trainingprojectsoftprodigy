/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
const Comments = ({route, navigation, navigation: {goBack}}) => {
  const [state, setState] = useState({
    loading: true,
    data: [],
    commentsData: [],
  });
  const [commentNumber, setCommentNumber] = useState([]);
  const bringComments = id => {
    //console.log(‘id’, id);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => {
        // console.log(‘response’, response)
        if (response.status === 200) {
          // console.log(‘My comments will be’, response.data);
          // console.log(‘Number of comments:’, response.data.length);
          setState(prev => ({...prev, commentsData: response.data}));
          setCommentNumber(() => response.data.length);
        }
      })
      .catch(error => {
        //console.log(‘error’, error);
        setState(prev => ({...prev, loading: false}));
        // Toast.show(‘There is a network error’, Toast.LONG);
      });
  };
  // console.log(‘route::::::::::::’, route);
  // console.log(‘navigation::::::::::::’, navigation);
  //
  // const { itemId } = route.params;
  useEffect(() => bringComments(route.params.itemId), []);
  // bringComments(1)
  return (
    <View>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 20, color: 'blue'}}>
            {commentNumber} Comments
          </Text>
          <TouchableOpacity onPress={() => goBack()}>
            <Text
              style={{
                marginLeft: 210,
                fontWeight: '900',
                fontSize: 16,
                color: 'black',
              }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        {state.commentsData.map(data => (
          <View
            key={data.id}
            style={[
              {borderWidth: 0.5, borderBottomColor: 'grey', padding: 10},
            ]}>
            <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
              {data.name}
            </Text>
            {/* <Text style={{color: 'black', fontSize: 15}}>{data.email}</Text> */}
            <Text style={{color: 'black', fontSize: 14, marginTop: 10}}>
              {data.body}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default Comments;
const styles = StyleSheet.create({});
