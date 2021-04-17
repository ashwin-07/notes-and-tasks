import FETCH_NOTES from "../types/FETCH_NOTES"


const fetchNotes = ()=>{
    return ({
        type: FETCH_NOTES
    })
}

export default fetchNotes;