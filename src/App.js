import React , { useState , useEffect  } from 'react';
import { Button } from '@material-ui/core';
import { FormControl , Input , InputLabel } from '@material-ui/core'; 
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import logo from './logo.png';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  

  useEffect(() => {
    
    db.collection('messages').orderBy('timestamp' , 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id:doc.id, message: doc.data()})))
    })
    
  }
  , [])

  useEffect(() => {
    
    setUsername(prompt('Enter Your Name'))
    
  }
  , [])

  const sendMessage = (event) => {
    event.preventDefault(); 
    
    db.collection('messages').add({
      message: input,
      username: username ,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    
    setInput('');
    
  }

  console.log(input);
  return (
    <div className="App">
      <img className="App-img" src ={logo}/>
      <h1>AK's Messenger</h1>
      <h2>Hello {username}</h2>
      <form className="app__form">
      <FormControl className="app__formcontrol">
       
       <Input className="app-input" placeholder="Enter a message..." value={input}  onChange={event => setInput(event.target.value)}/>
       <IconButton className="app__iconbutton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage} >
         <SendIcon />
       </IconButton>
       
      </FormControl>
     
      </form> 
      

      <FlipMove>
      {
        messages.map(({id, message}) => (
          <Message key={id} username={username} message={message} />
        
        ))
      } 
      </FlipMove>
      
    </div>
  );
}

export default App; 
