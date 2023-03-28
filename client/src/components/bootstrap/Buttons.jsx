import React from 'react';
//import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"; 
import { MDBBtn } from 'mdb-react-ui-kit';

export default function Buttons() {
    return (
        <div className="p-1">
            <MDBBtn className='me-1' color="secondary">
                <Link to="/api/chat">Chat</Link>
            </MDBBtn>
            <MDBBtn className='me-1' color="primary">
                primary
            </MDBBtn>
            <MDBBtn className='me-1' color='success'>
                Success
            </MDBBtn>
            <MDBBtn className='me-1' color="warning">
                Warning
            </MDBBtn>
            <MDBBtn className='me-1' color="danger">
                Danger
            </MDBBtn>
            <MDBBtn className='me-1' color="info">
                Info
            </MDBBtn>
            <MDBBtn className='me-1' color="light">
                Light
            </MDBBtn>
            <MDBBtn className='me-1' color="dark">
                Dark
            </MDBBtn>
            <MDBBtn className='me-1' color="link">
                Link
            </MDBBtn>
        </div>
    );
  }