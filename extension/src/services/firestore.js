import {db} from '../services/firebaseConf';
import * as firebase from 'firebase';

export const addNotes = (content) => {
    return db.collection('Notes')
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            'text': content
        });    
};

export const deleteNote =  (id) => {
    db.collection("Notes").doc(id).delete();
}

export const updateNote = (id, content) => {
    db.collection("Notes").doc(id).update({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        'text': content
    });
}

export const getNotesRef = () => {
    return db.collection('Notes');
}

//TODO remove try catch and add error boundary component
 export async function getAllNotes(){
    try {  
        const snapshot = await firebase.firestore().collection('Notes').get()
        const documents = [];
        snapshot.forEach(doc => {
        documents.push({
            'id':doc.id,
            'data':doc.data()
            });
        });
        return documents;
    }

    catch (error) {
        console.log(error);
    }
};
