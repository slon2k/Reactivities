import React, { useContext } from "react";
import { StoreContext } from "../../../store";
import { Tab, Grid, Header, Card } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ProfileCard from "../profile-card/ProfileCard";

const ProfileFollowings = () => {
  const Store = useContext(StoreContext);
  const { profile } = Store.profileStore;
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header 
            floated="left"
            icon="user"
            content={
              true 
              ? "People following user"
              : "People user is following"
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            <ProfileCard />
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileFollowings);
