import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

export default function Login() {
    return (
        <div>

            <Container>
                <Form>
                    <Row>
                        <Col></Col>
                        <Col xs={6}>
                            <Form.Group >
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" />
                                
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>

                            <Button variant="primary" type="submit" >
                                Submit
                            </Button>
                        </Col>
                        <Col></Col>

                    </Row>
                </Form>
            </Container>
        </div>
    )
}
