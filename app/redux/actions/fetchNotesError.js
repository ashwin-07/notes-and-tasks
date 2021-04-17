import NOTES_FETCH_ERROR from "../types/NOTES_FETCH_ERROR"


const fetchNotesError = ()=>{
    return ({
        type: NOTES_FETCH_ERROR
    })
}

export default fetchNotesError;