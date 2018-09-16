import React, { Component } from 'react';
import { StyleSheet, Platform, View  } from 'react-native';
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text, ListItem } from "native-base";
import firebase from 'react-native-firebase'

export default class Profile extends React.Component {
  state = {
    currentUser: null,
    allUserData: null
  }

handleSignOut = () => {
  firebase
    .auth()
    .signOut()
    .then(user => this.props.navigation.navigate('Login'))
    .catch(error => this.setState({ errorMessage: error.message }))
}

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })

  }

  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>
        <Header padder="padder" style={styles.header}>
          <Left/>
          <Body>
            <Title>Profiili</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.handleSignOut}>
              <Icon name="ios-log-out" style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}/>
            </Button>
          </Right>
        </Header>
        <View style={styles.profileView}>
        <View style={styles.imageView}>
        </View>
          <Text style={styles.userText}>
            {currentUser && currentUser.uid && currentUser.email }
          </Text>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5DD90'
  },
  header: {
    height: 60,
    borderBottomWidth: 0,
    backgroundColor: 'rgba(249, 193, 35, 1)',
  },
  imageView: {
    height: 300,
    width: 300,
    marginBottom: 20,
    borderRadius: 150,
    backgroundColor: 'rgba(249, 193, 35, 1)',
  },
  profileView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userText: {
    fontWeight: "500",
    fontSize: 20,
  }
})
