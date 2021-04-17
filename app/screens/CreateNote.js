import React, {useState, useEffect} from 'react';
import { View,
  Text, 
  TextInput, 
  Alert, 
  ToastAndroid, 
  Platform, 
  AlertIOS, 
  StyleSheet, 
  ScrollView, 
 } from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons'; 

import { globalStyles } from '../styles/global';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import * as FirestoreService from '../services/firestore' ;
import NoteTags from '../screens/NoteTags'

//TODO: use pure component ? 
export default function CreateNote({navigation}) {

  const refreshNoteView = navigation.getParam('refreshNotesView');

  let intialId = -1;
  let initialItem = navigation.getParam('item') || {data:{text:"",title:""}};
  let intitalTitle = '';
  let initialContent = '';
  let intitialTags = [];

  let boldSelected = false;
  let italicSelected = false;
  let listSelected = false;
  let underLineSelected = false;

  let tags = navigation.getParam('tags');

  if (initialItem.id != undefined) {
    intialId = initialItem.id;
  }

  if (initialItem.data.title != undefined) {
    intitalTitle = initialItem.data.title;
  }

  if (initialItem.data.text != undefined) {
    initialContent = initialItem.data.text;
  }

  if (initialItem.data.tags != undefined) {
    intitialTags = initialItem.data.tags;
  }

  const [noteId, setNoteId] = useState(intialId);
  const [noteContent, setNoteContent] = useState(initialContent)
  const [noteTitle, setNoteTitle] = useState(intitalTitle)
  const [noteTags, setNoteTags] = useState(intitialTags);
  const [tagModalVisible, setTagModalVisible] = useState(false);
 



  useEffect(() => {
    
    let isEdit = false;
    if (noteId != -1) {
      isEdit = true;
    }
    navigation.setParams({ handleSave: saveNote, handleDelete:removeNote, showDelete:isEdit});

  }, [noteId, noteContent, noteTitle, noteTags])

  function asyncAlert(title, body) {

    return new Promise( (resolve, reject) => {
      Alert.alert(
        title,
        body,
        [
          {
            text: 'No', 
            onPress: () => resolve(false)
          },
          { 
            text: 'Yes', 
            onPress: () => resolve(true) 
          }
        ],
        { cancelable: false }
      );

    } )


  }

  const addNote = async () => {
    return new Promise( (resolve, reject) => {
      try{
        FirestoreService.addNotes(noteTitle, noteContent, noteTags);
        resolve("note saved successfully");
      }
      catch (error) {
        // console.log("error saving note "+node); 
        resolve("error adding note");
      }

    });
  }

  const updateNote = async () => {
      return new Promise( (resolve, reject) => {
        try{
          FirestoreService.updateNote(noteId, noteTitle, noteContent, noteTags);
          resolve(true);
        }
        catch (error) {
          reject("error updating note");
        }

      });
  }

  const deleteNote = async () => {
    return new  Promise ( (resolve, reject) => {
      try{
        FirestoreService.deleteNote(noteId)
        resolve(true);
      }
      catch (error) {
        reject("error deleting note");
      }

    })
  }

  const removeNote = async () => {
    let toastMessage = "error"
    let proceed = await asyncAlert("Delete Note","Proceed to delete note ?")
    if (proceed) {
      try {
        await deleteNote()
        toastMessage = "note deleted"
      }
       catch (e){
         toastMessage = "error deleting note"
        //toast
      }
      navigation.navigate('Notes');
      refreshNoteView(true);
      if (Platform.OS === 'android') {
        ToastAndroid.show(toastMessage, ToastAndroid.SHORT)
      } else {
        AlertIOS.alert(toastMessage);
      }
    } 
  }


  function changeNoteContent(text) {
    setNoteContent(text)
  }

  function changeNoteTitle(text) {
    setNoteTitle(text);
  }

  const saveNote = async () => {     
    if (noteId === -1) {
      let proceed = await asyncAlert("Save Note","Proceed to add note ?")
      let toastMessage = "error"
      if (proceed) {
        try {
          await addNote()
          toastMessage = "note added"
        } 
        catch (e){
          toastMessage = "error saving note"
          // console.log("error");
        }
        // navigation.navigate('Notes');
        navigation.navigate('Notes');
        refreshNoteView(true);
        if (Platform.OS === 'android') {
          ToastAndroid.show(toastMessage, ToastAndroid.SHORT)
        } else {
          AlertIOS.alert(toastMessage);
        }
      }
    }
    else {
      let proceed = await asyncAlert("Edit Note","Proceed to edit note ?")
      if (proceed) {
        let toastMessage ="error";
        try {
          await updateNote();
          toastMessage = "note updated";
        }
        catch (e){
          console.log(e);
        }
        navigation.navigate('Notes');
        refreshNoteView(true);
        if (Platform.OS === 'android') {
          ToastAndroid.show(toastMessage, ToastAndroid.SHORT)
        } else {
          AlertIOS.alert(toastMessage);
        }
      }
    }
  }

  const closeModal = ()=> {
    setTagModalVisible(false);
  }
  



  return (
        

    <View style={styles.container}>
             
        <Modal
          animationType="slide"
          visible={tagModalVisible}
          hasBackDrop={true}
          backdropColor="black"
          backdropOpacity={0.7}
          onBackdropPress={() => closeModal()}
          onRequestClose={() => {
            closeModal()
          }}
          >
            <View style={styles.modelContainer}><NoteTags associatedTags={noteTags} allTags={tags} closeModal={closeModal} addNoteTag={setNoteTags}></NoteTags></View>
            
          </Modal>

        <TextInput
          style ={styles.textEditorTitle}
          placeholder='note title'
          onChangeText={ text => changeNoteTitle(text)}
          value={noteTitle}
          scrollEnabled={true}
          placeholder="Note Title"
        /> 
      <ScrollView>
         <TextInput
          style ={styles.textEditor}
          multiline={true}
          numberOfLines={25}
          multiline minHeight={10}
          onChangeText = { text => changeNoteContent(text)}
          value={noteContent}/>
      </ScrollView>
      <View style = {styles.toolBar}>
            <TouchableOpacity style={styles.toolBarItem}><FontAwesome5 name="bold" size={20} color={boldSelected?'black':'gray'} /></TouchableOpacity>
            <TouchableOpacity><FontAwesome5 name="italic" size={20} color={italicSelected?'black':'gray'} /></TouchableOpacity>
            <TouchableOpacity><FontAwesome5 name="underline" size={20} color={underLineSelected?'black':'gray'} /></TouchableOpacity>
            <TouchableOpacity><FontAwesome5 name="list-ul" size={20} color={listSelected?'black':'gray'} /></TouchableOpacity>
            <TouchableOpacity onPress={()=>setTagModalVisible(true)}><FontAwesome5 name="tags" size={20} color="black" /></TouchableOpacity>
      </View>
    </View>
  )

}


CreateNote['navigationOptions'] = ({navigation}) =>  {
  const handleSave = navigation.getParam('handleSave');
  const showDelete = navigation.getParam('showDelete', false);
  const handleDelete = navigation.getParam('handleDelete');

  return {
    headerRight: () =>(
      <View style={globalStyles.headerElement}>

        {
        showDelete &&
        <View style={globalStyles.headerButton}>
          <TouchableOpacity onPress = {()=>(handleDelete())}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
        }
        <View style={globalStyles.headerButton}>
          <TouchableOpacity onPress = {()=>(handleSave())}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    )            
  }   
}

const styles = StyleSheet.create({ 


  container:{
    flexDirection:'column',
    flex:1,
  },
  toolBar:{
    flexDirection:'row',
    color:"grey",
    alignItems:"center",
    justifyContent:'space-evenly',
    height:50
  },
  toolBarItem :{
    marginRight:5
  },

  textEditorTitle:{
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize:18,
    fontWeight:'bold',
    marginLeft:5,
    borderRadius: 6,
  },
  textEditor:{
    textAlignVertical: 'top',
    padding:15,
    backgroundColor:'white',
  },
  modalContent: {
    backgroundColor: 'black',

  },

  modelContainer: {
    height:300,
    padding: 22,
    backgroundColor:'#f7f2ed',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  }

})