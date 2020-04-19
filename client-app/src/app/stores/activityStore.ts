import { observable, action, computed } from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

class ActivityStore {
  //we are going to be using decorators for our react mobx stores but we can use without decorators
  //What we could do is specify just an empty array and if we hover over this and instead of being never array it's now got
  //a type of an array
  @observable activityRegistry = new Map();
  // The observable map gives us a bit more functionality than  just a plain old array to store our activities
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
  }
  //We use computed properties when we already have the data inside our store but we can work out what the results of this
  //should be based on already existing data and soring the activities by dates is a kind of ideal candidate for a computed property

  @action loadActivities = async () => {
    this.loadingInitial = true; // we wouldn't be allowed to do this in redux beause we're mutating our state here this is perfectly valid code in mobx it's designed to be mutated
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split('.')[0];
        this.activityRegistry.set(activity.id, activity);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
/*
What we can do now is we can access our store from our components by using the useContext hook 
*/
