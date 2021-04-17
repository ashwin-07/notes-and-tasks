import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import CreateTask from '../screens/CreateTask';
import Tasks from '../screens/Tasks';
import { globalStyles } from '../styles/global';


const screens = {
  Tasks: {
    screen: Tasks,
  },
  CreateTask: {
    screen: CreateTask,
  },
};

// home stack navigator screens
const TaskStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#fff2f2',
    headerStyle: globalStyles.headerStyle,
  }
});

export default TaskStack;


