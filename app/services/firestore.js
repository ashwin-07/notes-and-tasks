import {db} from '../services/firebaseConf';
import * as firebase from 'firebase';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getOrdinal(date) {
    if (date > 3 && date < 21) return 'th';
    switch (date % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
}


export const addNotes = (title, content, tags) => {
    return db.collection('Notes')
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            'text': content,
            'title':title,
            'tags':tags
        });
        
};

export const deleteNote =  (id) => {
    db.collection("Notes").doc(id).delete();
}

export const updateNote = (id, title, content, tags) => {
    db.collection("Notes").doc(id).update({
        'text': content,
        'title':title,
        'tags':tags
    });
}


export const getNotesRef = () => {
    return db.collection('Notes');
}

export const getTagsRef = () => {
    return db.collection('Tags');
}

//TODO remove try catch and add error boundary component
export const getAllTags = async() => {
    const documents = [];
    try {  
        const snapshot = await firebase.firestore().collection('Tags').get()
        snapshot.forEach(doc => {
            documents.push({
                'id':doc.id,
                'name':doc.data().name
                });
            });
    }
    catch (error) {
        console.log(error);
    }
    return documents;
}

export const addTag = (name) => {
    return db.collection('Tags')
        .add({
            'name':name
        });
        
};

//TODO remove try catch and add error boundary component

 export async function getAllNotes(){
    const documents = [];
    const snapshot = await firebase.firestore().collection('Notes').get()
    snapshot.forEach((doc) => {
        let createdDate = '';
        try {
            let fullDate =new Date(doc.data().created.toDate());
            let date = fullDate.getDate();
            let month = monthNames[fullDate.getMonth()];
            let year = fullDate.getFullYear();
            createdDate = `${date}${getOrdinal(date)} ${month} ${year}`;
        }
        catch(e) {
            createdDate='unknown'
        }
        documents.push({
            'id':doc.id,
            'data':doc.data(),
            'date':createdDate
        });
    });
    return documents;
};
