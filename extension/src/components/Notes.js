import React, {useState, useEffect, useRef} from 'react';
import * as FirestoreService from '../services/firestore';
import SnackBar from './Utils/SnackBar';





function Notes() {

  const [content, setContent] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  let noteContentBeforeEdit = "";
  let snackbarRef = useRef(null);

  useEffect(() => {

    let notesDBListener = FirestoreService.getNotesRef();
    notesDBListener.onSnapshot(function(querySnapshot) {
      setLoading(true)
      let fetchedNotes = [];
      querySnapshot.forEach( (doc) => {
        fetchedNotes.push({
          'id':doc.id,
          'data':doc.data()
          });
      })
      setNotes(fetchedNotes);
      setLoading(false);
    });

    //unsubscribe to listener
    return notesDBListener

  }, []);

  


  const addNote = async () => {
    try {
      await FirestoreService.addNotes(content);
      // setNotesModified(!notesModified);
      setContent('');
      snackbarRef.current.showSuccessMessage('note has been added');
      return true;
    }
    catch (e) {
      return false;
    }
  }

  //TODO remove try catch and add error boundary component
  const deleteNoteasync = async (e) => {
    const noteID = e.parentNode.parentNode.parentNode.getAttribute('value')
    try {
      await FirestoreService.deleteNote(noteID)
      snackbarRef.current.showSuccessMessage('note has been deleted');
    } 
    catch (error) {
      console.log("error deleting note "+e); 
    }
  }

  const handleEdit = (targetNode) => {

    let cardActionsItems = document.getElementsByClassName("cardActionsItems");
    let editActionItems = document.getElementsByClassName("editActionItems");
    const noteID = targetNode.parentNode.parentNode.parentNode.getAttribute('value')
    let noteTextArea = document.getElementById("NoteContent"+noteID);
    noteTextArea.readOnly = false;
    noteContentBeforeEdit = noteTextArea.value;

    for(let i = 0; i < cardActionsItems.length; i++) {
      cardActionsItems[i].style.display = "none"; 
    }
    for(let i = 0; i < editActionItems.length; i++) {
      editActionItems[i].style.display = "inline-block";
    }

  }

  const copyToClipBoard = (node) => {
    const noteID = node.parentNode.parentNode.parentNode.getAttribute('value')
    let noteTextArea = document.getElementById("NoteContent"+noteID);
    noteTextArea.select();
    noteTextArea.setSelectionRange(0, 99999)
    document.execCommand("copy");
    snackbarRef.current.showSuccessMessage('note copied to clipboard');
  }

  const discardEdit = (node) => {

    const noteID = node.parentNode.parentNode.parentNode.getAttribute('value')
    let cardActionsItems = document.getElementsByClassName("cardActionsItems");
    let editActionItems = document.getElementsByClassName("editActionItems");
    let noteTextArea = document.getElementById("NoteContent"+noteID);
    noteTextArea.value = noteContentBeforeEdit;
    noteContentBeforeEdit= '';
    noteTextArea.readOnly = true;
    for(let i = 0; i < editActionItems.length; i++) {
      editActionItems[i].style.display = "none";
    }
    for(let i = 0; i < cardActionsItems.length; i++) {
      cardActionsItems[i].style.display = "inline-block"; 
    }
  } 

  //TODO remove try catch and add error boundary component
  const updateNote = async (node) => {
    try {
      const noteID = node.parentNode.parentNode.parentNode.getAttribute('value')
      const content = document.getElementById("NoteContent"+noteID).value;
      await FirestoreService.updateNote(noteID, content);
      snackbarRef.current.showSuccessMessage('note has been edited');
    } catch (error) {
      console.log("error updatin note "+node); 
    }
  }


  return (
      
    <div className="Container">     
          <div className="addNotes">
            Add a new note 
          <input type="text" onChange={(e) => setContent(e.target.value)} value={content}></input>
          <button onClick={addNote}> </button>
          </div>

        {
          isLoading? (<div className="Loading"></div>) : 
          notes.length === 0? (<div>Wow such empty!</div>) :  
          
          <div>  
            <div className="NoteListsContainer">
              <ul className="NotesList">
                {
                  notes.map( (item) => 
                      <li className ="card" key={item.id} value={item.id}>
                        <div className="cardContainer">
                          <textarea id={"NoteContent"+item.id} readOnly>  
                            {item.data.text} 
                          </textarea>
                          <div className="cardActions">
                            <div className="cardActionsItems" onClick = { (e) => copyToClipBoard(e.target)}>copy</div>
                            <div className="cardActionsItems" onClick = { (e) => handleEdit(e.target)}>edit</div>
                            <div className="cardActionsItems" onClick = { (e) => deleteNote(e.target)}>delete</div>
                            <div className ="editActionItems" onClick = { (e) => updateNote(e.target)}>save</div>
                            <div className ="editActionItems" onClick = { (e) => discardEdit(e.target)}>discard</div>
                          </div>

                        </div>
                      </li> 
                    )
                  } 
               </ul>
            </div>
          </div>      
        }
      <SnackBar ref={snackbarRef}></SnackBar>
      </div>
    );


}

export default Notes;
