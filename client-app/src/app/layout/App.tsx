import React, { useEffect, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import LoadingComponent from './LoadingComponent';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';

const App = () => {
  const activityStore = useContext(ActivityStore);
  const { loadActivities, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivities();
    //Because we're using a function inside our useEffect then we have to tell our useEffect about dependencies that it needs to
    //run this particular function. We have to specify in this dependency array
  }, [activityStore]);

  if (loadingInitial) return <LoadingComponent content='Loading activities' />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </>
  );
};

//We didn't see anything of it inside our component unless we make our component an observer.
//The observer is a higher order component and a higher order component takes another component as its parameter and it returns a new component with extra powers
//Any child component that's receiving observables we also want to make an observer as well
export default observer(App);
