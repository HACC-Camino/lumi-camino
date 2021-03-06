import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import SignInModal from '../components/landing/SignInModal';
import SignUpModal from '../components/landing/SignUpModal';

const textStyle = { paddingTop: 50 };
const padding = { paddingTop: 130 };
/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='background-landing' >
          <Grid centered container>
            <Grid.Row>
                <Image size='small' src='images/landing-page/white-shaka.png' />
                <span position='center' style={textStyle} className='landing-text'> <h1>
                  CAMINO <br/> LUMISIGHT </h1> </span>
            </Grid.Row>
            <Grid.Row style={padding}>
              <SignInModal/>
            </Grid.Row>

            <Grid.Row>
              <SignUpModal/>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default withRouter(Landing);
