import React, { useContext, Fragment } from "react";
import { ItemGroup, Label } from "semantic-ui-react";
import { ActivityListItem } from "./activity-list-item/ActivityListItem";
import { StoreContext } from "../../store";
import { observer } from "mobx-react-lite";
import { IActivity } from "../../models/activity";
import { format } from "date-fns";

const Group = (activities: IActivity[], group: string) => {
  return (
    <Fragment key={group}>
      <Label size="large" color="blue">
        {format(group, 'eeee do MMMM')}
      </Label>
      <ItemGroup divided>
        {activities.map(item => (
          <ActivityListItem activity={item} key={item.id} />
        ))}
      </ItemGroup>
    </Fragment>
  );
};

const ActivityList: React.FC = () => {
  const Store = useContext(StoreContext);
  const { activitiesByDate } = Store.activityStore;

  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => Group(activities, group))}
    </Fragment>
  );
};

export default observer(ActivityList);
