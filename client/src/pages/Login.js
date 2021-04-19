import React, { useState } from 'react'
import { Button, Col, Container, Form, Jumbotron, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';

export default function Login() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    const history= useHistory()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/v1/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password
            }),
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                console.log(data.error)
            }
            else{
                dispatch(setUser(data))
                history.push('/')
            }
        })
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    return (
        <div>
            <Container className="mt-5">
            <Jumbotron  fluid className="aniJumbo" >
                <Form onSubmit= {handleSubmit}>
                    <Row>
                        <Col></Col>
                        <Col xs={6}>
                            <h1 className="twice">Login</h1>
                            <Form.Group >
                                <Form.Label >Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" 
                                onChange={handleChange}
                                 value= {form.username} 
                                 name= "username"
                                 />
                                
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                 onChange={handleChange} 
                                 value= {form.password}
                                 name= "password"
                                 />
                            </Form.Group>
                            <Form.Text className="text-muted mb-3">
                                    Don't have an account register <Link to = "/register">here</Link>
                            </Form.Text>

                            <Button variant="primary" type="submit"  >
                                Submit
                            </Button>
                        </Col>
                        <Col></Col>

                    </Row>
                </Form>
            </Jumbotron>
            </Container>
        </div>
    )
}
