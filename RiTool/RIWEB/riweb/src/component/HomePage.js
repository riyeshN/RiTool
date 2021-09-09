import React from 'react';
import { Container, Grid, Header, Image, Segment } from 'semantic-ui-react';
import personalPict from '../image/personA.png';

const HomePage = () => {
    return (
        <div>
            <Segment basic color='blue'>
                <Segment color='teal' basic>
                    <Grid>
                        <Grid.Column width={5}>
                            <Image src={personalPict} size='medium' />
                        </Grid.Column>
                        <Grid.Column textAlign='center' width={11}>
                            <Grid.Row>
                                <Header color='violet' content='About Me' size='large' />
                                <Segment basic color='blue'>
                                    <Container>
                                        <h3>Here will be some information on myself.</h3>
                                    </Container>
                                </Segment>
                            </Grid.Row>
                            <Grid.Row>
                                <Header color='violet' content='Technology Stack' size='large' />
                                <Segment basic color='blue'>
                                    <Container>
                                        <h3>Here will be some information on myself.</h3>
                                    </Container>
                                </Segment>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Segment>
        </div>
    );
}

export default HomePage;