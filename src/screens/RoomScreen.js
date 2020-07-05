import React, { useState, useContext, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet,Button,Text,TouchableOpacity, Alert,FlatList } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { List, Divider } from 'react-native-paper';
import useStatsBar from '../utils/useStatusBar';
import auth from '@react-native-firebase/auth';
export default function RoomScreen({ route,navigation }) {
  useStatsBar('light-content');

  const [messages, setMessages] = useState([]);
  const { thread } = route.params;
  const { user } = useContext(AuthContext);
  const currentUser = user.toJSON();
  const [state, setState] = useState([])
  const[test, setTest] = useState([])
  useEffect(() => {
    const messagesListener = firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('number', 'asc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: '',
            subject:'',
            teacher:'',
            Day:'',
            createdAt: new Date().getTime(),
            ...firebaseData
          };
          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);
 
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var fullday = date + '/' + month +'/'+year
  return (
<View style={styles.container}>
  <Text style={styles.username}>Danh sách các phòng</Text>
    <FlatList
        data={messages}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('RoomInfor',{ name12:item.text, thread: thread._id})}
          >
            <List.Item
              title={item.text}
              description={
                fullday + "-"+item.subject + "-" + item.teacher 
              }
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },
  username:{
    marginTop: 20,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: "bold",
    color: '#0174DF'
  },
  listTitle: {
    fontSize: 22,
    color: "#996600",
    fontWeight: 'bold'
  },
  listDescription: {
    fontSize: 20
  }
});
