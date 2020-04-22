import React, { useContext } from 'react';
import { Item } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';
import { Label } from 'semantic-ui-react';

import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate } = activityStore;
  console.log(activitiesByDate);
  return (
    <>
      {activitiesByDate.map(([group, activities]) => (
        <>
          <Label key={group} size='large' color='blue'>
            {group}
          </Label>
          <Item.Group divided>
            {activities.map((activity) => (
              <ActivityListItem activity={activity} key={activity.id} />
            ))}
          </Item.Group>
        </>
      ))}
    </>
  );
};

//this is a necessary step and there's no problem with making every single component an observer is absolutely find and doesn't affect performance at all.
export default observer(ActivityList);
