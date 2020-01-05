import React, { Fragment } from "react";
import { Segment, List } from "semantic-ui-react";
import { IAttendee } from "../../../models/attendee";
import ActivityDetailsSidebarItem from "./ActivityDetailsSidebarItem";
import { observer } from "mobx-react-lite";

const ActivityDetailsSidebar: React.FC<{ attendees: IAttendee[] }> = ({
  attendees
}) => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} {attendees.length === 1 ? "Person" : "People"} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map(attendee => (
            <ActivityDetailsSidebarItem attendee={attendee} key={attendee.userName}/>
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailsSidebar);
