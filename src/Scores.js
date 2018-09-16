import React from "react";
import { AppRegistry, View, StatusBar, StyleSheet, FlatList, ImageBackground, ActivityIndicator, YellowBox } from "react-native";
import { Container, Body, Content, Header, Left, Right, Image, Icon, Title, Input, Item, Label, Button, Text, ListItem, Alert } from "native-base";
import firebase from 'react-native-firebase';
import { TabNavigator } from 'react-navigation'
import Map from "./Map.js";
import mapImg from './map.jpg';

export default class Scores extends React.Component {
  constructor() {
   super();
   this.state = {
     isLoading: true,
     allUserData: null,
     gameList: []
   };
   YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
  ]);
 }

 componentWillMount() {
   const { currentUser } = firebase.auth()
   this.setState({ currentUser })

   const db = firebase.database().ref();
   const attendees = db.child('users/' + currentUser.uid + '/games').orderByChild('trackId');
   var gameArr = [];
   var childArr = [];
   attendees.on('child_added', snap => {
     childArr.push(snap.val());
     const userRef = db.child('tracks/' + snap.val().trackId);
     userRef.once('value')
     .then(function(userSnap) {
       var places = userSnap.val();
       gameArr.push({
         place: places,
         data: snap.val()
       });
       if (gameArr.length == childArr.length) {
         this.setState({
           gameList: gameArr,
           isLoading: false
         });
         console.log(this.state.gameList);
       }
     }.bind(this));
   });

   // var query =firebase.database().ref('users/'+ currentUser.uid + '/games').orderByChild("trackId")
   // query.on('value', (snapshot) => {
   //   var response = [];
   //   snapshot.forEach(function(childSnapshot) {
   //     var key = childSnapshot.key;
   //     var childData = childSnapshot.val();
   //     response.push(childData);
   //     //console.log(response);
   //   });
   // this.setState({
   //   allUserData: response
   // })
   // //console.log(response);
   // //console.log(this.state.allUserData);
   // });
}

renderItem = ({item}) => {
  if (item.place) {
    return (
      <ListItem style={{borderBottomWidth: 0}}>
        <Body style={styles.flatlistLabel}>
          <Text>{item.place.name}</Text>
          <Text>{'Väyliä: ' + item.place.pathways}</Text>
          <Text>{item.data.time}</Text>
          <Text>{item.data.players}</Text>
        </Body>
      </ListItem>);
  }
}

render() {
  if (this.state.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator  size="large"/>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header padder="padder" style={styles.header}>
        <Title>Pelit</Title>
      </Header>
      <FlatList
        noBorder
        data={this.state.gameList}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
    );
  }
}

//export const param = this.state.gameList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(249, 193, 35, 1)'
  },
  text: {
    color: 'black',
    fontSize: 30,
  },
  header: {
    height: 60,
    borderBottomWidth: 0,
    backgroundColor: 'rgba(249, 193, 35, 1)',
  },
  flatlistLabel: {
    height: 120,
    opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  }
})
