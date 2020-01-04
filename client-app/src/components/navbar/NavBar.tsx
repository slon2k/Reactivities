import React, { useContext } from "react";
import { Menu, Container, Button, Image, Dropdown } from "semantic-ui-react";
import { StoreContext } from "../../store";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const Store = useContext(StoreContext);
  const { clearSelectedActivity } = Store.activityStore;
  const { user, logout } = Store.userStore;

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header exact as={NavLink} to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "15px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item as={NavLink} to="/create">
          <Button
            onClick={() => clearSelectedActivity()}
            positive
            content="Create Activity"
          />
        </Menu.Item>
        {user && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={user.image || "/assets/user.png"}
            />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
