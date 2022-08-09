/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HomePage = ({navigation, route, params}) => {
  const [state, setState] = useState({
    loading: true,
    data: [],
    postData: [],
    commentsData: [],
  });
  const [modalVisible, set_modalVisible] = useState({
    modalVisible: false,
    type: 'Comments',
    title: '',
    body: '',
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
  useEffect(() => bringComments(), []);

  const [post, setPost] = useState([]);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        // console.log(‘response’, response)
        if (response.status === 200) {
          // console.log(‘My data will be’, response);
          setState(prev => ({
            ...prev,
            loading: false,
            data: response.data,
            postData: response.data,
            commentsData: response.data,
          }));
          setPost(() => response.data.length);
          setCommentNumber(() => response.data.length);
        }
      })
      .catch(error => {
        //console.log(‘error’, error);
        setState(prev => ({...prev, loading: false}));
        // Toast.show(‘There is a network error’, Toast.LONG);
      });
    // Toast.show(‘This is a toast.’);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 10,
          right: 10,
          zIndex: 999,
        }}
        onPress={() => navigation.navigate('AddPost')}>
        <AntDesign name="plus" size={17} color={'white'} />
      </TouchableOpacity>
      {state.loading && <ActivityIndicator size="large" color="blue" />}

      <ScrollView>
        <Text style={{fontSize: 20, color: 'blue'}}>Total post {post}</Text>
        {state.data.map(data => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {
                id: data.id,
                title: data.title,
                body: data.body,
              })
            }>
            <View
              key={data.postData}
              style={[
                {borderWidth: 0.5, borderBottomColor: 'grey', padding: 10},
              ]}>
              <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
                {data.id}
              </Text>
              <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
                {data.title}
              </Text>
              <Text style={{color: 'black', fontSize: 14, marginTop: 10}}>
                {data.body}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Comments', {
                    itemId: data.id,
                  })
                }>
                <Text style={{color: 'red'}}>{commentNumber} Comments</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modals: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomePage;
