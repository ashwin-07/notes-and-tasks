import FETCH_NOTES from "../types/FETCH_NOTES"
import NOTES_FETCHED from "../types/NOTES_FETCHED"
import NOTES_FETCH_ERROR from "../types/NOTES_FETCH_ERROR"

const defaultState = {
    isLoading:true,
    notes:[],
    error:""
    
}

const notesReducer = (state = defaultState, action)=>{

    switch(action.type){
        case  FETCH_NOTES:
            return{
                ...state,
                isLoading:true
            }
        case NOTES_FETCHED:
            return{
                ...state,
                isLoading:false,
                notes:action.payload,
                error:""
            }
        case NOTES_FETCH_ERROR:
            return{
                ...state,
                isLoading:false,
                posts:[],
                error:action.payload
            }
        default:
            return state    

    }

}

export default notesReducer