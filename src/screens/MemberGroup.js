import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity,Text, Button,Platform, TextInput } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import useStatsBar from '../utils/useStatusBar';
import auth from '@react-native-firebase/auth';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';


function addUser(email){
  threads1[0].member=[]
}
export default function MemberGroup({ navigation,route }) {
  useStatsBar('light-content');
  const [threads, setThreads] = useState([]);
  const [adduser, setadduser] = useState('');
  const { Data } = route.params;
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([])
  var useremail = auth().currentUser.email;
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .where('name','in',[Data])
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            latestMessage: {
              text: ''
            },
            member:'',
            ...documentSnapshot.data()
          };
        });
        setThreads(threads);
        if (loading) {
          setLoading(false);
        }
      });
    return () => unsubscribe();
  }, []);
   
 
  if (loading) {
    return <Loading />;
  }



  return (
    <View style={styles.container}>
      <Text style={styles.listmember}>ListMember</Text>
      <FlatList
        data={threads[0].member}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
            <List.Item
              title={item}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listmember:{
    marginTop: 30,
    marginLeft: 110,
    justifyContent:'center',
    fontSize: 30,
    fontWeight: "bold",
    color: '#0174DF'
  },
  ButtonaAdd:{
    width: 100,
    justifyContent:'center'
  },
  addnew:{
    marginTop:20,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',

  },
  text:{
    paddingBottom: 40,
    paddingLeft: 50
    
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  }
});
