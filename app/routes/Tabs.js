import React from 'react';
import {createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator } from 'react-navigation-tabs';
import TaskStack from './TaskStack';
import NoteStack from './NoteStack';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
const tabs = {
     Notes: {
        screen: NoteStack,
        navigationOptions: {
            //tabBarLabel: 'Signout', 
            tabBarIcon: ({ tintColor }) => (
              <MaterialIcons name="library-books" size={24} color={tintColor} />
            )
          } 
    },
     Tasks: {
        screen: TaskStack,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <FontAwesome5 name="tasks" size={24} color={tintColor} />
            )
          }
    }
};

const RootTabNavigator = createMaterialTopTabNavigator (
    tabs,
    {
      
      tabBarPosition: 'bottom',
      tabBarOptions: {
        showIcon: true, 
        showLabel:false,
        activeTintColor: '#000010',
        inactiveTintColor: '#84868a',
        style: {
          backgroundColor: '#d6d6d6'
        },
        indicatorStyle: {
          borderBottomColor: '#000010',
          borderBottomWidth: 4,
        }
      },
    }
  );

  export default createAppContainer(RootTabNavigator);