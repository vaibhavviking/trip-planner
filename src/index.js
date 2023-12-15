import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Navbar expand="lg" className="tw-bg-orange-500">
            <Container>
                <Navbar.Brand href="#home" style={{margin:"auto"}} className=' tw-font-bold'>AI Trip Assistant</Navbar.Brand>
            </Container>
        </Navbar>
        <App />
    </>
);

