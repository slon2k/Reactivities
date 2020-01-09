import React, { useContext, useState } from "react";
import { Tab, Header, Card, Image, Button, Grid } from "semantic-ui-react";
import { StoreContext } from "../../../store";
import { observer } from "mobx-react-lite";
import PhotoUpload from "../../photo-upload/PhotoUpload"

const ProfilePhotos = () => {
  const Store = useContext(StoreContext);
  const { profile, isCurrentUser, uploadPhoto, uploadingPhoto } = Store.profileStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(photo).then(() => setAddPhotoMode(false));
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header icon="image" content="photos" floated="left" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUpload uploadPhoto={handleUploadImage} loading={uploadingPhoto}/>
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map(photo => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button basic positive content="Main" />
                        <Button basic negative icon="trash" />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
