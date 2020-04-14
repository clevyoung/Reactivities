import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, Icon } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';

import { IActivity } from '../models/activity';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  useEffect(() => {
    axios
      .get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        setActivities(response.data);
      });
    //if I remove the array here then what's going to happens is I'am going to send my component into loop,
    //because if I don't have this here then there's noting to stop this from running every single time my component renders.
  }, []);

  return (
    <div className='App'>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivity</Header.Content>
      </Header>
      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
