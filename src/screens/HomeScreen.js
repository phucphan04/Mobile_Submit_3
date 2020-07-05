import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity,Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import useStatsBar from '../utils/useStatusBar';
import auth from '@react-native-firebase/auth';






export default function HomeScreen({ navigation }) {
  useStatsBar('light-content');
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([])
  var useremail = auth().currentUser.email;
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .orderBy('infor.priority', 'asc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            infor: {
              text: '',
              priority:''
            },
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
      <Text style={styles.username}>Danh sách các toà</Text>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Room', { thread: item })}
          >
            <List.Item
              title={item.name}
              description={
                item.infor.text
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
  username:{
    marginTop: 20,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: "bold",
    color: '#0174DF'
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,

  },
  text:{
    paddingBottom: 40,
    paddingLeft: 50
    
  },
  listTitle: {
    fontSize: 22,
    color: "#996600",
    fontWeight: 'bold'
  },
  listDescription: {
    fontSize: 16
  }
});
