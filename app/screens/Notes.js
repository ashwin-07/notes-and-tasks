import React, { useState, useEffect } from 'react';
import { StyleSheet, Button,Text, View, FlatList, ActivityIndicator } from 'react-native';
import { globalStyles } from '../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as FirestoreService from '../services/firestore' ;
import Card from '../components/card';
import {connect} from 'react-redux';

let tagIdName = new Map();
let hasRerendered = false

export default function Notes({navigation}) {

    
    const [isLoading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]); 
    const [refreshView, setRefreshView] = useState(false);
    // let doRefetch = navigation.getParam('rerender');


    //need to change this use effect to fetch notes and tags efficiently.
    useEffect( () => {

        // let focusListener = navigation.addListener('didFocus', () => {
        //     if (refreshView) {
        //         // fetchData();
        //         setRefreshView(false);
        //     }
            
        // });
        async function fetchData() { 
            setLoading(true);
            let fetchedNotes = await FirestoreService.getAllNotes();
            // notesListener();
            let fetchedTags = await FirestoreService.getAllTags();
            setNotes(fetchedNotes);
            setTags(fetchedTags);
            tagIdName = new Map();
            fetchedTags.forEach((data) => tagIdName.set(data.id, data.name));
            setLoading(false);
         }

         fetchData();

    }, [refreshView]);




    const renderTags = (element)=>{
        let tagNames = []
        if (element != undefined && element.length > 0) {
            return (
                <View style={styles.noteTags}>
                    <Text>Tags:</Text>
                    {element.map(elem =><Text key={elem} style={styles.tags}>{tagIdName.get(elem)}</Text>)}
                </View>
            )
        }
            
    }

    const toggleRefreshView = () => {
        setRefreshView(!refreshView);
    }
  

    if (isLoading) {
            return (
                <View style={globalStyles.activityIndicator}>
                <ActivityIndicator size='large'></ActivityIndicator>
                </View>
            )
    }
    else {
        return(

            <View style={globalStyles.container}>
    
                <View style={globalStyles.addNoteButton}>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateNote', {refreshNotesView:() => toggleRefreshView(),'tags':tags})}>
                        <Text> Add new note </Text>
                    </TouchableOpacity>
                </View>
    
                {  
                notes.length === 0 ?(<Text style = {globalStyles.centerScreen}>Wow such empty!</Text>) : 
                <FlatList data={notes} renderItem={({ item }) => (
                    
                    <TouchableOpacity onPress={ () => navigation.navigate('CreateNote',{'item':item,refreshNotesView:() => toggleRefreshView(),'tags':tags})}>
                        <Card>
                            <Text style={styles.noteTitle}>{ item.data.title }</Text>
                            <Text style={styles.noteDate}>created at: { item.date }</Text>
                            <Text numberOfLines={4} ellipsizeMode='tail'>{ item.data.text }</Text>
                            {renderTags(item.data.tags)}
                        </Card>
                    </TouchableOpacity>
                )} />  
                }
            </View>
        )
    }
} 

Notes['navigationOptions'] = ({navigation}) =>  {
   return {
        headerRight: () =>(
            <View style={globalStyles.headerElement}>
                <TouchableOpacity onPress = {()=>navigation.navigate('CreateNote')}>
                    <Text>Add Note</Text>
                </TouchableOpacity>
            </View>
        )
           
        
    }
    
}

const styles = StyleSheet.create ({
    noteTitle:{
        fontSize:16,
        marginBottom:2,
        fontWeight:'bold'
    },
    noteDate:{
        color:'gray',
        marginBottom:10
    },
    noteTags:{
    //  backgroundColor:'grey',
     marginTop:10,
     alignItems:'center',
     flexDirection:'row'
    },
    tags:{
        borderRadius: 5,
        borderWidth: 2,

        // Setting up Text Font Color.
        color: '#fff',
        // Setting Up Background Color of Text component.
        backgroundColor : 'green',
        paddingLeft :5 ,
        paddingRight: 5,
        textAlign: 'center',
        margin: 5
    }
})

const mapStateToProps = (state,previousProps) => {
    return {
        ...previousProps,
        posts: state.posts.data,
        error: state.error,
        isLoading: state.isLoading
    };
};

const mapDispatchToProps = (dispatch, previousProps)=>{
    return {
        ...previousProps,
        loadPost: () => dispatch(loadPosts())
    }

}



export default connect(mapStateToProps,mapDispatchToProps)(Posts);
