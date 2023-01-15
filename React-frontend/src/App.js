import React, { useState } from 'react';
import LoginPage from './LoginPage';
import Form_Send from './Send_Form/Form_Send';
import StudentList from './StudentList';
import './App.css';

function App() {
    return(
        <div className='container'>
            {/* <LoginPage/> */}
            <Form_Send/>
            <StudentList/>
        </div>
    )
  }

export default App;
