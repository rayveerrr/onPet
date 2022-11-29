import { Button, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'
import Footer from '../../components/frontend/Footer'
import Header from '../../components/frontend/Header'
import useAuthentication from '../../hooks/auth/authenticate-user'

function Feedback() {

  useAuthentication('User')

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const feedbackCollectionRef = collection(db, "Feedback");

    const feedback = async () => {
        try {
            setLoading(true);
            await addDoc(feedbackCollectionRef, {Name: name, Date: new Date().toLocaleDateString(), Comment: comment })
            alert('Feedback posted')
            window.location = '/'
        } catch (e) {
            console.log(e.message);
        }
        setLoading(false);
    }

  return (
    
    <div>
        <Header/>
            <Paper sx={{width: '50%', margin: '16vh auto', padding: 10}}>
              <Typography variant='h2' sx={{color: 'black', fontWeight: 'Bold'}}>Feedback</Typography>
              <TextField 
                variant="outlined" 
                label='Enter your alias or name' 
                id="fullname" 
                fullWidth
                onChange={(e) => setName(e.target.value)}
                required
                sx={{marginBottom: 2}}  />
              <TextField 
                variant="outlined" 
                label='Feedback here..' 
                id="feedback" 
                fullWidth
                onChange={(e) => setComment(e.target.value)}
                multiline rows={5}
                required
                sx={{marginBottom: 2}}  />
              <Button onClick={feedback} variant='contained' disabled={loading}>Post Feedback</Button>
            </Paper>
        <Footer/>
    </div>
  )
}

export default Feedback