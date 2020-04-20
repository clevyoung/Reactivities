import React, { useEffect, useContext } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';

import { observer } from 'mobx-react-lite';

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { loadActivities, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivities();
    //Because we're using a function inside our useEffect then we have to tell our useEffect about dependencies that it needs to
    //run this particular function. We have to specify in this dependency array
  }, [activityStore]);

  if (loadingInitial) return <LoadingComponent content='Loading activities' />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
