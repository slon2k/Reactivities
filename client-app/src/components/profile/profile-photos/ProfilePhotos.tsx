import React, { useContext } from "react";
import { Tab, Header, Card, Image } from "semantic-ui-react";
import { StoreContext } from "../../../store";
import { observer } from "mobx-react-lite";

const ProfilePhotos = () => {
  const Store = useContext(StoreContext);
  const { profile } = Store.profileStore;
  return (
    <Tab.Pane>
      <Header icon="image" content="photos" />
      <Card.Group itemsPerRow={5}>
        {profile && profile.photos.map((photo) => (
          <Card key={photo.id}>
            <Image src={photo.url}/>
          </Card>
        ))}
      </Card.Group>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
