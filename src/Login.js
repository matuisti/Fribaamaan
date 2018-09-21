import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button } from 'native-base';
import firebase from 'react-native-firebase';
import FribaamaanIcon from './Img/FribaamaanIcon.png';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: 'Väärä käyttäjätunnuts tai salasana.' })) // error.message
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image source={FribaamaanIcon} style={styles.image}/>
        </View>
        <Text style={{marginBottom: 50, fontWeight: '300', fontSize: 25}}>Fribaamaan</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'rgba(46, 44, 45, 1)', marginBottom: 5}}>
            {this.state.errorMessage}
          </Text>}
        <View style={styles.inputContainer}>
          <Icon style={{fontSize: 22, position: 'absolute', left: 13}} name="ios-mail" color="#000"/>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Sähköposti"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
        </View>
        <View style={styles.inputContainer}>
        <Icon style={{fontSize: 22, position: 'absolute', left: 13}} name="ios-lock" color="#000"/>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            autoCapitalize="none"
            placeholder="Salasana"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtnContainer}
          onPress={this.handleLogin}>
          <View>
            <Text style={styles.inputBtn}>Kirjaudu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtnContainer}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <View>
            <Text style={styles.inputBtn}>Rekisteröidy</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 193, 35, 1)',
  },
  image: {
    resizeMode: 'contain',
    width: 150,
    height: 70,
    //marginBottom: 0,
    marginTop: 10,
  },
  imageView: {
    width: 200,
    height: 200,
    //borderTopLeftRadius: 250/2,
    //borderTopRightRadius: 250/2,
    borderRadius: 200/2,
    backgroundColor: 'rgba(249, 193, 35, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    height: 45,
    width: '80%',
    textAlign: 'center',
    borderRadius: 22,
    borderColor: 'rgba(46, 44, 45, 1)',
    borderWidth: 1.5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  textInput: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 20,
  },
  loginBtnContainer: {
    height: 40,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'rgba(46, 44, 45, 1)',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  inputBtn: {
    fontWeight: '300',
    fontSize: 18,
    color: 'rgba(249, 193, 35, 1)',
  }
})
