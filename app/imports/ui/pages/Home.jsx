import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { VaccineDatas } from '../../api/vaccine/VaccineDataCollection';
import ResourcesCard from '../components/other/ResourcesCard';
import CheckInCard from '../components/other/CheckInCard';
import VaccinationCard from '../components/vaccine/VaccinationCard';
import COVIDStatusCard from '../components/covid-status/COVIDStatusCard';
import { HealthStatuses } from '../../api/health-status/HealthStatusCollection';

const padding = { paddingTop: 30, marginLeft: 35 };

const Home = (
    {
      ready,
      todayHealthStatus,
      vaccineData,
    },
) => (ready ? (
        <div style={padding}>
          <Grid container stackable>
            <Grid.Row>
              <Grid.Column>
                <Header as={'h1'} content={'On-Campus Check-in'} color='yellow'/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column computer={10}>
                <COVIDStatusCard
                    healthStatus={todayHealthStatus}
                    vaccineData={vaccineData}
                    page={'home'}
                />
                <CheckInCard/>
              </Grid.Column>

              <Grid.Column computer={6}>
                <VaccinationCard vaccineData={vaccineData}/>
                <ResourcesCard/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ) :
      <Loader active>Getting User Data</Loader>
);

Home.propTypes = {
  ready: PropTypes.bool.isRequired,
  todayHealthStatus: PropTypes.object,
  vaccineData: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const username = Meteor.user()?.username;
  const ready = HealthStatuses.subscribeHealthStatus().ready()
       && VaccineDatas.subscribeVaccine().ready()
       && username !== undefined;
  const todayHealthStatus = HealthStatuses.getTodayHealthStatus(username);
  const vaccineData = VaccineDatas.getUserVaccineData(username);
  return {
    ready,
    todayHealthStatus,
    vaccineData,
  };
})(Home);
