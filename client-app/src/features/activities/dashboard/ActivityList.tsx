import React, { useContext } from 'react';
import { Item, Segment } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';

import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate } = activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <ActivityListItem activity={activity} key={activity.id} />
        ))}
      </Item.Group>
    </Segment>
  );
};

//this is a necessary step and there's no problem with making every single component an observer is absolutely find and doesn't affect performance at all.
export default observer(ActivityList);
