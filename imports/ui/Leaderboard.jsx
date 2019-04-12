import React from 'react';
import { List, Header, Segment } from 'semantic-ui-react';
import HeaderPage from '/imports/ui/HeaderPage.jsx'

class Leaderboard extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            tabVotes: []
        };
    }

    componentWillMount() {
        //Chercher info avec le slug
        Meteor.call('getAllVotes', this.props.slug, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log(res)
                this.setState({ loading: false, tabVotes: res })
            }
        })


    }

    render() {

        return (
            <div>
                <HeaderPage title='Leaderboard' />
                <Segment loading={this.state.loading}>
                    <Header as='h2'>Leaderboard</Header>

                    <p>How does this work?</p>

                    <p>All the forecasts are processed after every episode. You get points for the correct deaths predicted and at the end of episode 6 you'll get the points for the characters still alive.</p>

                    <List divided relaxed>

                        {this.state.tabVotes.map((vote, i) => {
                            return (
                                <List.Item key={i}>
                                    <List.Icon name='user' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header as='a' href={Meteor.absoluteUrl() + 'vote/' + vote.slug}>
                                            {vote.nickname} - {vote.score} points
                                        </List.Header>
                                        <List.Description as='a'>voted at {vote.createdAt.toString()}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        }
                        )}

                    </List>

                </Segment>
            </div>
        )
    }

}

export default Leaderboard;
