import fetchNotes from '../redux/actions/fetchNotes';
import fetchNotesError from '../redux/actions/fetchNotesError';
import notesFetched from '../redux/actions/notesFetched';
import { getAllNotes } from '../../services/firestore';

export const loadNotes = () => {
    return dispatch => {
      dispatch(fetchNotes());
      getAllNotes()
      .then( data => dispatch(notesFetched(data)))
      .catch( e => dispatch(fetchNotesError(e)))
    };
  };