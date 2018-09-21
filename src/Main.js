import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform  } from 'react-native';//, Platform, Image, Text, View, Button, Container, StatusBar } from 'react-native';
import { Button, Text, Icon, Footer, FooterTab, View } from 'native-base';
import Scores from "./Scores.js";
import Map from "./Map.js";
import Profile from "./Profile.js";
import { TabNavigator } from 'react-navigation'
import firebase from 'react-native-firebase'
const d = Dimensions.get("window")

export default (MainScreenNavigator = TabNavigator(
  {
    Scores: { screen: Scores },
    Map: { screen: Map },
    Profile: { screen: Profile }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {

      return (
        <Footer style={styles.footer}>
          <FooterTab>

            <Button style={styles.footerBtn}
              rounded
              active={props.navigationState.index === 0 ? true : false}
              onPress={() => props.navigation.navigate("Scores")}>
              <View style={{
                  backgroundColor: props.navigationState.index  === 0 ? 'rgba(249, 193, 35, 1)' : 'transparent',
                  borderRadius: 40,
                  height: 80,
                  width: 80,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: props.navigationState.index  === 0 ? 0.6 : 0.15,
                  shadowRadius: 2,
                  marginBottom: 7,
                  justifyContent: 'center',
                  alignItems: 'center'}}>
              <Icon name="ios-analytics" style={{
  									color: props.navigationState.index  === 0 ? 'rgba(252, 237, 184, 1)' : 'rgba(252, 237, 184, 1)',
                    fontSize: props.navigationState.index  === 0 ? 35 : 30,
  								}}/>
              </View>
            </Button>

            <Button style={styles.footerBtn}
              rounded
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Map")}>
              <View style={{
                  backgroundColor: props.navigationState.index  === 1 ? 'rgba(249, 193, 35, 1)' : 'transparent',
                  borderRadius: 40,
                  height: 80,
                  width: 80,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: props.navigationState.index  === 1 ? 0.6 : 0.15,
                  shadowRadius: 2,
                  marginBottom: 7,
                  justifyContent: 'center',
                  alignItems: 'center'}}>
              <Icon name="ios-pin" style={{
                  color: props.navigationState.index  === 1 ? 'rgba(252, 237, 184, 1)' : 'rgba(252, 237, 184, 1)',
                  fontSize: props.navigationState.index  === 1 ? 35 : 30,
            }}/>
            </View>
            </Button>

            <Button style={styles.footerBtn}
              rounded
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("Profile")}>
              <View style={{
                  backgroundColor: props.navigationState.index  === 2 ? 'rgba(249, 193, 35, 1)' : 'transparent',
                  borderRadius: 40,
                  height: 80,
                  width: 80,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: props.navigationState.index  === 2 ? 0.6 : 0.15,
                  shadowRadius: 2,
                  marginBottom: 7,
                  justifyContent: 'center',
                  alignItems: 'center'}}>
              <Icon name="ios-contact" style={{
                  color: props.navigationState.index  === 2 ? 'rgba(252, 237, 184, 1)' : 'rgba(252, 237, 184, 1)',
                  fontSize: props.navigationState.index  === 2 ? 35 : 28,
            }}/>
            </View>
            </Button>

          </FooterTab>
        </Footer>
      );
    }
  }
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 2, 2, 1)'
  },
  footer: {
    backgroundColor: 'rgba(239, 139, 30, 1)',
    color: 'rgba(252, 237, 184, 1)',
    borderTopWidth: 0,
    height: Platform.OS === "ios" && (d.height == 812 || d.width == 812) ? 40 : 60,
  },
  footerBtn: {
    backgroundColor: 'transparent',
    width: 50,
    color: 'red',
  },
  icon: {
    fontSize: 30,
    color: 'rgba(252, 237, 184, 1)',
  }
})
