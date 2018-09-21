import React, { Component, TouchableOpacity } from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, Input, label, Item, Icon, Content } from 'react-native'
import mapStyleColorful from "./MapStyle.js";
import firebase from 'react-native-firebase'
import { TabNavigator } from 'react-navigation'
import MapView from 'react-native-maps';
import { Callout } from 'react-native-maps';
import pinOrange from '../node_modules/native-base/Fonts/icons/pinOrange.png'
//import {param} from './Scores'
export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: null,
      coordinates: [],
      show: true,
    }
    this.onMarkerPress = this.onMarkerPress.bind(this)
}

addData(){
  //onPress={() => this.addData()}
  var time = new Date().toLocaleString()
  firebase.database().ref('users').child(this.state.currentUser.uid).child('games').push(
    {
      trackId: 4,
      players: ['lotu@gmail.com'],
      time: time
    }
  ).then(() => {
  }).catch((error) => {
    console.log(error);
  })
}

onMarkerPress = (e, title) => {
  const { show } = this.state;
  this.setState({show: !show})
  console.log(e.nativeEvent.id, title);

}

componentDidMount() {
  const { currentUser } = firebase.auth()
  this.setState({ currentUser })
  var query =firebase.database().ref('tracks')
  query.on('value', (snapshot) => {
    var response = [];
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      response.push({ key: key, location: childData.location, title: childData.name });
    });
  this.setState({
    coordinates: response
  })
  console.log(response);
  });
}

render() {
  if (true) {

  }
  return (
    <View style={{flex: 1}}>
    <MapView
      style={styles.map}
      showsUserLocation={true}
      showsMyLocationButton={true}
      followsUserLocation={true}
      showCompass={true}
      provider="google"
      customMapStyle={mapStyleColorful}
      initialRegion={{
         longitude: 22.2668,
         latitude: 60.4487,
         latitudeDelta: 0.15,
         longitudeDelta: 0.15,
      }}>

      {
        this.state.coordinates.map(({key, location, title}) =>
        <MapView.Marker
          key={key}
          identifier={key}
          coordinate={location}
          title={title}
          onPress={(e) => {this.onMarkerPress(e, title)}}
          >
          <Image source={pinOrange} style={{
              height: 32,
              width: 32
            }}/>
        </MapView.Marker>)
      }
    </MapView>
    { this.state.show && <GameView/>}
  </View>);
}
}

class GameView extends Component {
  constructor(props){
  		super(props);
  		this.state = {
        data: []
  	  }
  }
  render() {
    console.log(this.props);
    return (
      <View style={{
        top: 0,
        width: '100%',
        height: 100,
        backgroundColor: 'orange',
        opacity: 0.7,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text>JEps</Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5DD90'
  },
  text: {
    fontSize: 37,
    color: 'white',
  },
  map: {
    flex:1,
  },
})
