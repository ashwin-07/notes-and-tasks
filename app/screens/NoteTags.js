import React, {useState, useEffect, useContext} from 'react'
import { View,
    Text, 
    TextInput, 
    ActivityIndicator,
    FlatList, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity
   } from 'react-native';
import {CheckBox} from 'react-native-elements'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { globalStyles } from '../styles/global';
import {getAllTags, addTag, getTagsRef} from '../services/firestore' ;

function NoteTags({associatedTags, allTags, addNoteTag, closeModal}) {

    const [tags, setTags] = useState('initial');
    const [isLoading, setLoading] = useState(true);
    const [tagTitle, setTagTitle] = useState(''); 
    const [selectedTags, setSelectedTags] = useState(associatedTags);
    const [refreshView, setRefreshView] = useState(false);

    useEffect(() => {
        const loadTags = async() => {
            setLoading(true);
            if (tags === 'initial') {
                setTags(allTags);
            }
            else {
                let fetchedTags =  await getAllTags();
                setTags(fetchedTags);
            }
            setLoading(false);
        }
        loadTags();

    }, [refreshView])

    const saveTag = () => {
        if (tagTitle != '') {
            addTag(tagTitle);
            setTagTitle('');
            setRefreshView(!refreshView);
        }
    }

    //todo find efficient way to insert, remove, find tag in selected tag (like map)
    const isTagSelected = (tagId) => {
        if (selectedTags != undefined && selectedTags.indexOf(tagId) > -1) {
            return true;
        }
        return false;
    }

    const toggleTag = (id) => {
        let index = selectedTags.indexOf(id);
        let tags = [...selectedTags];
        if (index > -1) {
            tags.splice(index,1);   
        }
        else {
            tags.push(id);
        }
        setSelectedTags(tags);
    }

    if (isLoading) {
        return (
            <View style={globalStyles.activityIndicator}>
            <ActivityIndicator size='small'></ActivityIndicator>
            </View>
        )
    }

    return (
        <View style={globalStyles.container_column}>
            <View style={styles.topBar}>
                <TextInput
                placeholder='note title'
                style={styles.tagName}
                scrollEnabled={true}
                onChangeText = { text => {setTagTitle(text)}}
                placeholder="Tag Name"
            /> 
                <TouchableOpacity onPress={()=>saveTag()}><AntDesign name="plus" size={28} color="black" /></TouchableOpacity>
            </View>

            <Text>Available Tags:</Text>

            <ScrollView>
                {/* <View style={styles.tagsList}> */}
                    <FlatList data={tags} style={styles.tagsList} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (
                        
                        <View style={styles.tagItem}>
                        <TouchableOpacity onPress={ () => toggleTag(item.id)}>
                            {/* <CheckBox
                            title={item.name}
                            checked={isTagSelected(item.id)}
                            ></CheckBox> */}
                            <MaterialCommunityIcons
                                size={24}
                                color="black"
                                name={ isTagSelected(item.id) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                            />
                           
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => toggleTag(item.id)}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                        </View>
                    )} />
                {/* </View> */}
            </ScrollView>
            <View>
                 <TouchableOpacity onPress={()=>{addNoteTag(selectedTags);closeModal()}}>
                            <Text style={styles.saveBtn}><Text>Save</Text></Text>
                </TouchableOpacity>

             </View>   
      </View>
    )
}


const styles = StyleSheet.create({
    topBar:{
        flexDirection:'row',
        alignItems:'center',
        height:60,
        justifyContent: 'space-between',
        width:'100%',
    },
    tagsList:{
        backgroundColor:'white',
        flexDirection:'row',
        flex:1,
    },
    tagItem:{
        margin:5,
        flex:0.2,
        alignItems:'center',
        flexDirection:'row'
    },
    tagName:{
        height:50,
        flex:0.95,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontWeight:'bold',
        borderRadius: 6,
    },
    saveBtn:{
        marginTop:10,
        alignSelf:'center',
        alignItems:'center',
        borderRadius: 6,
        backgroundColor:'red',
        elevation:2,
        borderWidth:2,
        padding:5,
        width:60,
        borderColor:'black'
    }
})

export default NoteTags
