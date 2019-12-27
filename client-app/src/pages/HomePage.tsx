import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container style={{ paddingTop: "7em" }}>
      <h2>Home</h2>
      <h3>
        <Link to="/activities">Activities</Link>
      </h3>
    </Container>
  );
};

export default HomePage;
