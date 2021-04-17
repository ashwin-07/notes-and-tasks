import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import CreateNote from '../screens/CreateNote';
import Notes from '../screens/Notes';
import { globalStyles } from '../styles/global';
import {Button} from 'react-native';


const screens = {
  Notes: {
    screen: Notes,
  },
  CreateNote: {
    screen: CreateNote,
  },
};

// home stack navigator screens
const NoteStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
      headerTintColor: '#fff2f2',
      headerStyle: globalStyles.headerStyle,
    }
  });

  //basically a crappy work around to disable tabs on child stacks. needs to changed
  NoteStack.navigationOptions = ({ navigation }) => { 
    
    let tabBarVisible = navigation.state.index > 0 ? false: true;  
    let swipeEnabled = tabBarVisible 
   return {
      tabBarVisible,
      swipeEnabled: tabBarVisible
   }; 
  };

export default NoteStack;


