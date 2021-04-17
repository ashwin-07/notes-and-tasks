import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function Notes({navigation}) {

    return(

        <View style={globalStyles.container}>
            <Text>Tasks</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreateTask')}>
                <Text>add</Text>
            </TouchableOpacity>
        </View>


    )

} 