import React, { useContext, useEffect } from "react";
import { ProfileContent, ProfileHeader } from "../components/profile";
import { Grid } from "semantic-ui-react";
import { RouteComponentProps } from "react-router";
import { StoreContext } from "../store";
import { observer } from "mobx-react-lite";
import Loading from "../components/loading/Loading";

interface RouteParams {
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({ match }) => {
  const Store = useContext(StoreContext);
  const {
    loadProfile,
    loadingProfile,
    profile,
    follow,
    unfollow,
    updatingFollowing,
    isCurrentUser
  } = Store.profileStore;

  useEffect(() => {
    loadProfile(match.params.username);
  }, [loadProfile, match]);

  if (loadingProfile) {
    return <Loading content="Loading profile ..." />;
  }

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && <ProfileHeader profile={profile} follow={follow} unfollow={unfollow} updatingFollowing={updatingFollowing}
    isCurrentUser={isCurrentUser} />}
        <ProfileContent />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilePage);
