import React from "react";
import { IAttendee } from "../../../models/attendee";
import { Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ActivityDetailsSidebarItem: React.FC<{ attendee: IAttendee }> = ({
  attendee
}) => {
  return (
    <Item style={{ position: "relative" }}>
      {attendee.isHost && (
        <Label style={{ position: "absolute" }} color="orange" ribbon="right">
          Host
        </Label>
      )}
      <Image size="tiny" src={attendee.image || "/assets/user.png"} />
      <Item.Content verticalAlign="middle">
        <Item.Header as="h3">
          <Link to={`/profile/${attendee.userName}`}>{attendee.displayName}</Link>
        </Item.Header>
        <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ActivityDetailsSidebarItem;
