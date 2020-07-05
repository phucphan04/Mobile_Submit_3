import React, { useState, useContext, useEffect} from 'react';
import { View, StyleSheet, Button, ActivityIndicator, FlatList, Text , TouchableOpacity} from 'react-native';
import { Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import useStatsBar from '../utils/useStatusBar';
import Loading from '../components/Loading';
import { List, Divider } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';
export default function AddRoomScreen({ navigation }) {
  useStatsBar('dark-content')
  const [roomName, setRoomName] = useState('');
  const [roomMember, setRoomMember] = useState('');
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([])
  var useremail = auth().currentUser.email;
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('user')
      .where('mail', "==",  useremail)
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            name: {
              mail:'',
              name:'',
              Phone:'',
              Address:'',
              Birthday:''
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
var roomMember1=roomMember+","+useremail
const member = roomMember1.split(",");


  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.closeButtonContainer}>
        <Button
          title="Back"
          size={36}
          color='#6646ee'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
          <Title style={styles.username}>Persional Information</Title>
          <View style={styles.view1}>
          <Text style={styles.titleInfor} >Tài khoản gmail:</Text>
          <Title style={styles.title}>{useremail}</Title>
          <Text style={styles.titleInfor}>Tên nhân viên:</Text>
          <Title style={styles.title}>{threads[0].name}</Title>
          <Text style={styles.titleInfor}>Điện thoại liên hệ:</Text>
          <Title style={styles.title}>{threads[0].Phone}</Title>
          <Text style={styles.titleInfor}>Địa chỉ:</Text>
          <Title style={styles.title}>{threads[0].Address}</Title>
          <Text style={styles.titleInfor}>Ngày sinh:</Text>
          <Title style={styles.title}>{threads[0].Birthday}</Title>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view1:{
    marginTop: 30,
    textAlign: 'center'
  },
  titleInfor:{
    fontSize: 22,
    color: "#996600",
    fontWeight: 'bold'
  },
  username:{
    marginTop: 20,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: "bold",
    color: '#0174DF'
  },
  scroll:{
    paddingTop: 40
  },
  headertitle:{
    marginTop: 30,
    marginLeft: 110,
    justifyContent:'center',
    fontSize: 30,
    fontWeight: "bold",
    color: '#0174DF'
  },
  rootContainer: {
    flex: 1
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1
  },
  innerContainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  buttonLabel: {
    fontSize: 22
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

