import React, { useContext, useState } from "react";
import { Tab, Grid, Header, Button, GridColumn } from "semantic-ui-react";
import { StoreContext } from "../../../store";
import ProfileUpdateForm from "../profile-update-form/ProfileUpdateForm";
import { observer } from "mobx-react-lite";

const ProfileAbout = () => {
  const Store = useContext(StoreContext);
  const {
    isCurrentUser,
    profile,
    updatingProfile,
    updateProfile
  } = Store.profileStore;

  const [editMode, setEditMode] = useState(false);
  const displayName = profile ? profile.displayName : "";
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          {editMode ? (
            <Header icon="user" floated="left" content="Edit profile" />
          ) : (
            <Header icon="user" floated="left" content={displayName} />
          )}

          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <GridColumn width={16}>
          {editMode && profile ? (
            <ProfileUpdateForm
              profile={profile}
              updating={updatingProfile}
              updateProfile={updateProfile}
              setEditMode={setEditMode}
            />
          ) : (
            <div>
              <h3>Bio:</h3>
              <p>{profile?.bio}</p>
            </div>
          )}
        </GridColumn>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileAbout);
