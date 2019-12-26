import React, { useContext } from "react";
import { ItemGroup, Segment } from "semantic-ui-react";
import { ActivityListItem } from "./activity-list-item/ActivityListItem";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";

const ActivityList: React.FC = () => {
  const {
    activitiesByDate,
    selectActivity,
    deleteActivity,
    deleting
  } = useContext(ActivityStore);

  return (
    <Segment clearing>
      <ItemGroup divided>
        {activitiesByDate.map(item => (
          <ActivityListItem
            activity={item}
            selectActivity={selectActivity}
            deleteActivity={deleteActivity}
            deleting = {deleting.has(item.id)}
            key={item.id}
          />
        ))}
      </ItemGroup>
    </Segment>
  );
};

export default observer(ActivityList);
