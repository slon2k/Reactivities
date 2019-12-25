import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

export const NavBar = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ marginRight: "15px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Messages" />
        <Menu.Item>
          <Button positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
