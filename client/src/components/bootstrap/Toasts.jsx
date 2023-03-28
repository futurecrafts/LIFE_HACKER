import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';

export default function Toasts() {

    const [show, toggleShow] = useState(false);

    return (
        <>
            {!show && <Button variant="light" onClick={() => toggleShow(true)}>Show Toast</Button>}
            {/*
            // @ts-ignore */}
            <Toast show={show} onClose={() => toggleShow(false)}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Info</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hi! This is a toast message.</Toast.Body>
            </Toast>
        </>
    );
  }