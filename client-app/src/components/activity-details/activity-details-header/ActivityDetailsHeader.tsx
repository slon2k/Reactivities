import React, { useContext } from "react";
import { IActivity } from "../../../models/activity";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../store";

const activityImageStyle = {
  filter: "brightness(30%)"
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const ActivityDetailsHeader: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  const Store = useContext(StoreContext);
  const { attendActivity, cancelAttendance } = Store.activityStore;
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date!, "eeee do MMMM")}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <Button
            as={Link}
            to={`/edit/${activity.id}`}
            color="orange"
            floated="right"
            content="Manage Event"
          />
        ) : activity.isGoing ? (
          <Button onClick={cancelAttendance}>Cancel attendance</Button>
        ) : (
          <Button onClick={attendActivity} color="teal">Join Activity</Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailsHeader);
