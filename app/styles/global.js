import { StyleSheet } from 'react-native';
import { withOrientation } from 'react-navigation';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  container_column:{
    flex: 1,
    padding: 0,
    flexDirection:'column'
  },
  headerStyle:{
   backgroundColor: '#9e1616', 
   height: 80
  },
  headerTextColor:{
    color:'#fff2f2'
  },
  activityIndicator:{
    flex:1,
    justifyContent:'center'
  },
  centerScreen:{
    flex:1,
    justifyContent:'center'
  },
  addNoteButton:{
    height:50,
    justifyContent:'center'
  },
  headerElement:{
    color:'white',
    flexDirection:'row',
    padding:5,
    backgroundColor:'white',
    justifyContent:'center'
  },
  selectedNotes:{
    color:'blue'
  },
  normalNotes:{
    color:'white'
  },
  headerButton:{
    margin:5
  }
  
})