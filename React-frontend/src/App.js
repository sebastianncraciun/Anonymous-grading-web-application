import React, { useState } from 'react';
import LoginPage from './LoginPage';
import Form_Send from './Send_Form/Form_Send';
import StudentList from './StudentList';

function App() {
    return(
        <div>
            <LoginPage/>
            <Form_Send/>
            <StudentList/>
        </div>
    )
  }

export default App;
