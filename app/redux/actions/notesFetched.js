import NOTES_FETCHED from "../types/NOTES_FETCHED"

const notesFetched = (notes)=>{
    return({
        type:NOTES_FETCHED,
        payload:notes
    })
}

export default notesFetched