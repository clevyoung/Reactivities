import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialformState,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    // This runs every single time our component renders and we only attempt to load
    // an activity when we're editing an activity we don't want to run this particular funtion
    //when we're creating an activity
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => {
        initialformState && setActivity(initialformState);
      });
    }

    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialformState,
    activity.id.length,
  ]);
  // const handleSubmit = (event: any) => {
  //   event.preventDefault();
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };

  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  placeholder='Title'
                  name='title'
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  placeholder='Description'
                  name='description'
                  value={activity.description}
                  component={TextInput}
                />
                <Field
                  placeholder='Category'
                  name='category'
                  value={activity.category}
                />
                <Field
                  type='datetime-local'
                  placeholder='Date'
                  name='date'
                  value={activity.date}
                />
                <Field placeholder='City' name='city' value={activity.city} />
                <Field
                  placeholder='Venue'
                  name='venue'
                  value={activity.venue}
                />
                <Button
                  loading={submitting}
                  floated='right'
                  positive
                  type='submit'
                  content='submit'
                />
                <Button
                  onClick={() => history.push('/activities')}
                  floated='right'
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          ></FinalForm>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
