import React from "react";
import { List, Image, Popup } from "semantic-ui-react";
import { IAttendee } from "../../../models/attendee";

const ActivityListItemAttendees: React.FC<{ attendees: IAttendee[] }> = ({
  attendees
}) => {
  return (
    <List horizontal>
      {attendees.map(item => (
        <List.Item key={item.userName}>
          <Popup
            header={item.displayName}
            trigger={
              <Image
                size="mini"
                circular
                src={item.image || "/assets/user.png"}
              />
            }
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListItemAttendees;
