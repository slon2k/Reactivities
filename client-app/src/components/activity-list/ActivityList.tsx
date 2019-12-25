import React from "react";
import { ItemGroup, Segment } from "semantic-ui-react";
import { ActivityListItem } from "./activity-list-item/ActivityListItem";
import { IActivity } from "../../models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
}

export const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity
}) => {
  return (
    <Segment clearing>
      <ItemGroup divided>
        {activities.map(item => (
          <ActivityListItem activity={item} selectActivity={selectActivity} />
        ))}
      </ItemGroup>
    </Segment>
  );
};
