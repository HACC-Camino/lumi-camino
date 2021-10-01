import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import { Divider, Grid, Header, Icon, Menu } from 'semantic-ui-react';

// campus settings
// notification settings
// affiliation status
// housing status
// online studying/working status
const padding = { paddingTop: 20, marginLeft: 35 };

class Profile extends React.Component {
  render() {
    return (
      <div style={padding}>
      <Grid container>
          <div style={{ marginTop: 30, marginBottom: 30 }}>
          <Grid.Row>
            <Header textAlign="left" as="h1" color='yellow'>
              Profile: {this.props.currentUser}</Header>
          </Grid.Row>
          </div>
        <Divider/>

          <Grid.Row id="'user'"
                    as={NavLink} exact to="/home" onClick={this.handleShowClick}>
            <Grid.Column>
              <Icon name='heart' size='large' color='yellow'/>
            </Grid.Column>
            <Grid.Column width={10} >
              <Header color='yellow'>My Dashboard</Header>
            </Grid.Column>
            <Grid.Column width={3}>
              <Icon size="big" name="angle right" color='yellow'/>
            </Grid.Column>
          </Grid.Row>

          <Divider/>

          <Divider/>

          <Grid.Row id="'user'"
                     as={NavLink} exact to="/health" onClick={this.handleShowClick}>
            <Grid.Column>
              <Icon name='history' size='large' color='yellow'/>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header color='yellow'>My History</Header>
            </Grid.Column>
            <Grid.Column width={2}>
              <Icon size="big" name="angle right" color='yellow'/>
            </Grid.Column>
          </Grid.Row>

          <Divider/>
          <Grid.Row>
            <Grid.Column>
              <Icon name='add' size='large' color='yellow'/>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header color='yellow'>Add Vaccine Data</Header>
            </Grid.Column>
            <Grid.Column width={2}>
              <Icon size="big" name="angle right" color='yellow'/>
            </Grid.Column>
          </Grid.Row>

      </Grid>
      </div>
    );
  }
}
/** Declare the types of all properties. */
Profile.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const ProfileLink = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Profile);

export default withRouter(ProfileLink);
