/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';

function Data() {
  const [state, set_State] = useState({data: [], dataDownloaded: false});
  const [modalVisible, set_modalVisible] = useState({
    modalVisible: false,
    type: 'detail',
    title: '',
    body: '',
  });

  const [comments, setComment] = useState([]);
  const [numberofcomments, setNumberofcomments] = useState([]);

  useEffect(() => {
    if (state.dataDownloaded) {
      console.log('bring no of commands');
      bringNumberofComments();
    }
  }, [state]);

  const bringNumberofComments = () => {
    for (let eachpost of state.data) {
      const numofcommentArray = [];
      eachpost.id;
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts/${eachpost.id}/comments`,
        )
        .then(response => {
          //console.log('response', response);
          if (response.status === 200) {
            //console.log('my data will', response.data);
            numofcommentArray.push({
              postID: eachpost.id,
              numberofcomments: response.data.length,
            });
          }
        });
      return numofcommentArray;
    }
  };

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        //console.log('response', response);
        if (response.status === 200) {
          //console.log('my data will', response.data);
          set_State(prev => ({...prev, loading: false, data: response.data}));
        }
      })
      .catch(error => {
        //console.log('error');
        set_State(prev => ({...prev, loading: false}));
        Toast.show('there is network connection problem', Toast.LONG);
      });
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      toggleModal();
    }
  }, [comments]);

  const fetchComments = postID => {
    console.log('postID', postID);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`)
      .then(response => {
        if (response.status === 200) {
          setComment([...response.data]); //updated ->
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const List = () => {
    const myArray = [];
    for (let eachLine of state.data) {
      console.log('eachLine', eachLine);
      myArray.push(
        <TouchableOpacity
          onPress={() => toggleModal2(eachLine.title, eachLine.body)}
          style={{
            backgroundColor: '#fafafa',
            borderBottomWidth: 0.5,
            borderBottomColor: 'grey',
            padding: 10,
          }}>
          <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
            {eachLine.id}
          </Text>
          <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
            {eachLine.title}
          </Text>
          <Text style={{color: 'black', marginTop: 10}}>{eachLine.body}</Text>
          <TouchableOpacity onPress={() => fetchComments(eachLine.id)}>
            <Text style={{color: 'red', marginTop: 10, fontWeight: 'bold'}}>
              Comments
            </Text>
          </TouchableOpacity>
          <View style={{borderWidth: 1, padding: 10}}>
            <Text style={{color: 'red'}}>{bringNumberofComments()}</Text>
          </View>
        </TouchableOpacity>,
      );
    }
    return myArray;
  };

  const myCommentsList = () => {
    var myarray = [];
    for (let eachLine of comments) {
      myarray.push(
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: 'grey',
            padding: 10,
          }}>
          <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
            {eachLine.name}
          </Text>
          <Text style={{color: 'black', marginTop: 10}}>{eachLine.body}</Text>
        </View>,
      );
    }
    return myarray;
  };

  const toggleModal2 = (title, body) => {
    set_modalVisible(prev => ({
      ...prev,
      type: 'detail',
      modalVisible: !modalVisible.modalVisible,
      title,
      body,
    }));
  };

  const toggleModal = () => {
    set_modalVisible(prev => ({
      ...prev,
      type: 'comments',
      modalVisible: !modalVisible.modalVisible,
    }));
  };
  const toggleModel3 = () => {
    set_modalVisible(!modalVisible);
  };
  return (
    <View>
      {state.loading && <ActivityIndicator size="large" color="red" />}
      <ScrollView>{List()}</ScrollView>
      {/* <Modal
        isVisible={modalVisible.modalVisible}
        onBackButtonPress={() => toggleModal()}
        style={{margin: 0, padding: 0}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View>
            {modalVisible.type === 'detail' ? (
              <TouchableOpacity onPress={() => toggleModal2('', '')}>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity onPress={toggleModel3}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginRight: 10,
                      }}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: 'blue',
                      alignItems: 'center',
                      marginTop: 300,
                      fontSize: 30,
                    }}>
                    I am the modal content!
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={toggleModal}>
                <View style={{alignItems: 'flex-end'}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      fontWeight: 'bold',
                      marginRight: 10,
                    }}>
                    Back
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {modalVisible.type === 'detail' && (
            <View style={{}}>
              <Text style={{color: 'black'}}>{modalVisible.title}</Text>
              <Text style={{color: 'black'}}>{modalVisible.body}</Text>
            </View>
          )}

          {modalVisible.type === 'comments' && (
            <ScrollView>{myCommentsList()}</ScrollView>
          )}
        </View>
      </Modal> */}
      <Modal
        isVisible={modalVisible.modalVisible}
        onBackButtonPress={() => toggleModal()}
        style={{margin: 0, padding: 0}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{alignItems: 'flex-end'}}>
            {modalVisible.type === 'detail' ? (
              <TouchableOpacity onPress={() => toggleModal2('', '')}>
                <Text style={{color: 'green'}}>Close</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={toggleModal}>
                <Text style={{color: 'red'}}>Back</Text>
              </TouchableOpacity>
            )}
          </View>

          {modalVisible.type === 'detail' && (
            <View style={{}}>
              <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
                {modalVisible.title}
              </Text>
              <Text style={{color: 'black', marginTop: 10}}>
                {modalVisible.body}
              </Text>
            </View>
          )}

          {modalVisible.type === 'comments' && (
            <ScrollView>{myCommentsList()}</ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
}

export default Data;
