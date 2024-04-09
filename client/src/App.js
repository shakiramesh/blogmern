import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'; // Import Bootstrap components

const apiUrl = 'http://localhost:3000';

function App() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        title: '',
        content: ''
    });

    useEffect(() => {
        axios.get(`${apiUrl}/posts`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddPost = () => {
        axios.post(`${apiUrl}/posts`, newPost)
            .then(response => {
                setPosts(prevState => [...prevState, response.data]);
                setNewPost({ title: '', content: '' });
            })
            .catch(error => {
                console.error('Error adding post:', error);
            });
    };

    const handleDeletePost = (id) => {
        axios.delete(`${apiUrl}/posts/${id}`)
            .then(() => {
                setPosts(prevState => prevState.filter(
                    post => post._id !== id));
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    };

    return (
        <div className="app">
            <h1>BLOG APP</h1>
            <Container className="mt-5">
                <Row>
                    <Col md={4}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            value={newPost.title}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="content"
                                            value={newPost.content}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        onClick={handleAddPost}
                                    >
                                        Add Post
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    {posts.map(post => (
                        <Col key={post._id} md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>{post.content}</Card.Text>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeletePost(post._id)}
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default App;
