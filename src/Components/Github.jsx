import React, { useState, useEffect } from 'react'
import './styles.css'
import { Col, Row, Figure, Jumbotron, Container, Navbar, Form, Button, Card, ListGroup} from 'react-bootstrap'


function Github() {

    const [username, setUsername] = useState('');
    const [followers, setFollowers] = useState('');
    const [following, setFollowing] = useState('');
    const [avatar, setAvatar] = useState('');
    const [link, setLink] = useState('');
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState(null);
    const [repos, setRepos] = useState([]);



    useEffect(() => {
        fetch('https://api.github.com/users/example')
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data);
            });
    }, []);

    const setData = ({

        login,
        followers,
        following,
        avatar_url,
        html_url
    }) => {
        setUsername(login);
        setFollowers(followers);
        setFollowing(following);
        setAvatar(avatar_url);
        setLink(html_url);
    }

    const handleSearch = (e) => {
        setUserInput(e.target.value);
    }

    const handleSubmit = () => {
        fetch(`https://api.github.com/users/${userInput}`)
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setError(data.message);
                } else {
                    setData(data);
                    console.log(data);
                    setError(null)
                }
            })

        fetch(`https://api.github.com/users/${userInput}/repos`)
            .then(res => res.json())
            .then(data => {
                setRepos(data);
                console.log(data);
            })
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img
                        src="https://img.icons8.com/fluent/48/000000/github.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Github Logo"
                    />
                Github API Extractor
                </Navbar.Brand>
            </Navbar>
            <Jumbotron >
                <Container>
                    <h1 className="header">Search Github Account</h1> <br />
                    <Form inline >

                        <Form.Control className="search" type="text" placeholder="search" onChange={handleSearch} value={userInput} />
                        <Button id="button" variant="outline-success" onClick={handleSubmit}>Search</Button>
                    </Form>
                    <br />

                    {error ? (
                        <h1>{error}</h1>
                    ) : (

                            <div className="main">
                                <Card style={{ width: '70rem' }}>
                                    <Row>
                                        <Col sm={3}>
                                            <Figure id="photo" >
                                                <Figure.Image roundedCircle
                                                    width={171}
                                                    height={180}
                                                    alt="171x180"
                                                    src={avatar}
                                                />
                                                <Figure.Caption><strong>{username}</strong><br />
                                                    {followers} Followers  .  {following} Following <br />
                                                    <a href={link}>Github Url</a>
                                                </Figure.Caption>
                                            </Figure>
                                        </Col>
                                        <Col sm={9}>
                                            <h4 className="header1">{username}'s Repositories.</h4> <br />
                                            <ListGroup variant="flush">
                                                {repos.map(repo => {
                                                    return (
                                                                <ListGroup.Item className="repo-details">
                                                                    <h5>{repo.full_name}</h5><br />
                                                                    <p>Description: <br />
                                                                        {repo.description}</p> <br />
                                                                    <a href={repo.html_url}>Repo's Url</a>
                                                                    <br />
                                                                </ListGroup.Item> 
                                                    )
                                                })}
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        )}
                </Container>
            </Jumbotron>

            <Jumbotron fluid className="footer">
                <Container>
                    <p><strong>Designed with ❤ By Hrithik</strong></p>

                </Container>
            </Jumbotron>
        </div>
    )
}

export default Github
