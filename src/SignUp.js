import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'

export default class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: null
  }

  handleSignUp = () => {
    const { email, password } = this.state

    firebase.auth()
    .createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then(() => {
      firebase.database().ref('users').child(firebase.auth().currentUser.uid).set(
        {
          email: email
        }
      ).then(() => {
        console.log('New user created');
      }).catch((error) => {
        console.log(error);
      })
      user => this.props.navigation.navigate('Main')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Rekisteröidy</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Sähköposti"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Salasana"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
      <Button title="Rekisteröidy" onPress={this.handleSignUp} />
        <Button
          title="Jos sinulla on jo käyttäjätili kirjaudu sisään!"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
