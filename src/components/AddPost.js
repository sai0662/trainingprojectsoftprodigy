/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Appearance,
  Platform,
  Button,
} from 'react-native';
import toast from 'react-native-simple-toast';
import axios from 'axios';

const colorScheme = Appearance.getColorScheme();

const styles = {
  //
  mytextcolor: {
    color: colorScheme === 'light' ? 'black' : 'white',
    fontSize: 15,
  },
};
export default function AddPost({navigation, route, navigation: {goBack}}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    console.log('hello');
  }, []);

  const Submit = () => {
    var titleRefined = String(title).trim();

    if (titleRefined.length < 5) {
      toast.show('Title must be 100 characters long.');
      return;
    }
    var data = {
      userId: 1,
      id: 101,
      title: String(title).trim(),
      body: String(description).trim(),
    };
    axios
      .post('https://jsonplaceholder.typicode.com/posts', data)
      .then(res => {
        toast.show('Post added successfully');
        setTitle('');
        setDescription('');
        navigation.goBack();
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 10}}>
        <Text style={{color: 'black', fontSize: 24, paddingVertical: 30}}>
          Create A Blog Post
        </Text>

        <Text style={styles.mytextcolor}>
          Title{' '}
          <Text style={{color: 'red', fontSize: 9}}>(min 100 characters)</Text>
        </Text>
        <TextInput
          value={title}
          onChangeText={text => setTitle(text)}
          style={{
            ...styles.mytextcolor,
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 4,
            padding: 3,
          }}
        />

        <View style={{marginVertical: 10}}>
          <Text style={styles.mytextcolor}>Description</Text>
          <TextInput
            multiline
            numberOfLines={3}
            value={description}
            onChangeText={text => setDescription(text)}
            style={{
              ...styles.mytextcolor,
              borderWidth: 1,
              borderColor: 'grey',
              borderRadius: 4,
              padding: 3,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            width: 400,
            height: 40,
          }}>
          {/* <Text style={{color: 'black'}}>Submit</Text> */}
          <TouchableOpacity
            disabled={
              String(title).length < 1 || String(description).length < 1
            }
            style={{
              backgroundColor: 'blue',
              borderRadius: 5,
              width: 380,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 26,
            }}
            onPress={() => Submit()}>
            <Text>Add A Post</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}
