import React from 'react';
import { Container, Segment, Card, Image, Icon, Select, Button, Input } from 'semantic-ui-react';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            voteSaved: false,
            tabCharacters: []
        }
    }

    componentDidMount() {
        Meteor.call('getAllCharacters', (err, res) => {
            if (res) {
                this.setState({ tabCharacters: res, loading: false })
            } else {
                console.log('Error');
                //TODO : graceful handling
            }
        })
    }

    render() {

        let deathOptions = [
            { key: 'neverdies', text: 'Never dies', value: 0 }
        ];

        for (let i = 1; i < 7; i++) {
            deathOptions.push({ key: 'dies' + i, text: 'Dies at episode ' + i, value: i });
        }

        return (
            <Container style={{ paddingBottom: '50px' }}>

                <h1>Who dies when in Game of Thrones season 8 ?</h1>

                <Segment>
                    <p>
                        Welcome to WDM (who dies when) where you can try to forecast who will die in the season 8 of Game of Thrones and when !
                    </p>
                </Segment>

                <Segment>
                    Menu : <a href='/leaderboard'>check the leaderboard</a> | <a href='/stats'>see the statistics</a> | <a href='/about'>About this</a>
                </Segment>

                <Segment loading={this.state.loading} attached>
                    <h2>Cast your vote!</h2>


                    <Card.Group itemsPerRow={4}>
                        {this.state.tabCharacters.map((item) => {
                            return (
                                <Card key={item.id}>
                                    <Image src={'https://static.whodieswhen.com/' + item.id + '.jpeg'} />
                                    <Card.Content>
                                        <Card.Header>{item.name}</Card.Header>
                                        <Card.Meta>Still alive !</Card.Meta>
                                        <Card.Description>{item.info}</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            <Icon name='bullseye' />
                                            Your forecast ?
                                        </a>
                                        <Select placeholder='Choose from below' options={deathOptions} />
                                    </Card.Content>
                                </Card>
                            )
                        })
                        }
                    </Card.Group>

                    <Segment>
                        Please input your nickname for the leaderboard (and fame)
                        <Input placeholder='Nickame...' />
                        Not mandatory but you can also add your email address to get news from this
                        <Input placeholder='Email...' type='email' />
                        {/*Todo : si email alors mettre une case à cocher*/}
                    </Segment>

                </Segment>

                <Button attached='bottom'>Submit my vote !</Button>

                <a href='https://hosakka-stud.io' style={{ display: 'block', marginTop: '20px' }} target='_blank'>Made with passion by Hosakkā Studio</a>

            </Container>
        )
    }

}

export default Home;
