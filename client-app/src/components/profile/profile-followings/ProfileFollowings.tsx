import React, { useContext } from "react";
import { StoreContext } from "../../../store";
import { Tab, Grid, Header, Card } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ProfileCard from "../profile-card/ProfileCard";

const ProfileFollowings = () => {
  const Store = useContext(StoreContext);
  const {
    profile,
    followings,
    activeTab,
    loadingFollowings
  } = Store.profileStore;

  return (
    <Tab.Pane loading={loadingFollowings}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              activeTab === 3
                ? `People following ${profile?.displayName}`
                : `People ${profile?.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {followings.map(profile => (
              <ProfileCard key={profile.userName} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileFollowings);
