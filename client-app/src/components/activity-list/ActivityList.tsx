import React, { useContext } from "react";
import { ItemGroup, Segment } from "semantic-ui-react";
import { ActivityListItem } from "./activity-list-item/ActivityListItem";
import { IActivity } from "../../models/activity";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";

const ActivityList: React.FC = () => {
  const {
    activities,
    selectActivity,
    deleteActivity
  } = useContext(ActivityStore);

  return (
    <Segment clearing>
      <ItemGroup divided>
        {activities.map(item => (
          <ActivityListItem
            activity={item}
            selectActivity={selectActivity}
            deleteActivity={deleteActivity}
            key={item.id}
          />
        ))}
      </ItemGroup>
    </Segment>
  );
};

export default observer(ActivityList);
