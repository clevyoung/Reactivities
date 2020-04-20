import React, { useState, useEffect, SyntheticEvent, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import agent from '../api/agent';

import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import LoadingComponent from './LoadingComponent';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';

const App = () => {
  const activityStore = useContext(ActivityStore);

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  ); //union type : Selected activity can be a type of activity or it can be null
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((a) => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };
  useEffect(() => {
    activityStore.loadActivities();
    //Because we're using a function inside our useEffect then we have to tell our useEffect about dependencies that it needs to
    //run this particular function. We have to specify in this dependency array
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading activities' />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </>
  );
};

//We didn't see anything of it inside our component unless we make our component an observer.
//The observer is a higher order component and a higher order component takes another component as its parameter and it returns a new component with extra powers
//Any child component that's receiving observables we also want to make an observer as well
export default observer(App);
