import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { fetchUserAttributes } from 'aws-amplify/auth';

// Custom Toggle component for the Dropdown
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

// Custom Menu component for the Dropdown
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

const UserProfile = ({ signOut }) => {
    const [show, setShow] = useState(false); // Controls modal visibility
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [user, setUser] = useState();

    // Dummy user for avatar display


    const handleShow = () => setShow(true); // Show the modal
    const handleClose = () => setShow(false); // Close the modal


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile updated:', { name, phoneNumber, city, companyName });
        handleClose();
    };

    useEffect(() => {
        async function handleFetchUserAttributes() {
            try {
              const userAttributes = await fetchUserAttributes();
              setUser(userAttributes);
              console.log(`user`, userAttributes);
            } catch (error) {
              console.log(error);
            }
          }
        handleFetchUserAttributes();
    }, [])

    return (
        <>
            {/* Custom Dropdown with Avatar */}
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <div style={styles.avatar}>
                        {user ? user.email.charAt(0).toUpperCase(): 'a'}
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item onClick={handleShow} disabled>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Modal for updating user profile */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Enter name" 
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                                placeholder="Enter phone number" 
                            />
                        </Form.Group>

                        <Form.Group controlId="formCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={city}
                                onChange={(e) => setCity(e.target.value)} 
                                placeholder="Enter city" 
                            />
                        </Form.Group>

                        <Form.Group controlId="formCompany">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)} 
                                placeholder="Enter company name" 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

// Basic avatar styles
const styles = {
    avatar: {
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007bff',
        color: '#fff',
    }
};

export default UserProfile;