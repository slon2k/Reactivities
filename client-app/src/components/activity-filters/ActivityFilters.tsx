import React, { Fragment, useContext } from "react";
import { Menu, Header } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { StoreContext } from "../../store";
import { observer } from "mobx-react-lite";

const ActivityFilters = () => {
  const Store = useContext(StoreContext);
  const { predicate, setPredicate } = Store.activityStore;
  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%", marginTop: 50 }}>
        <Header icon={"filter"} attached color={"teal"} content={"Filters"} />
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          content={"All activities"}
        />
        <Menu.Item
          active={predicate.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")}
          color={"blue"}
          name={"username"}
          content={"I am going"}
        />
        <Menu.Item
          active={predicate.has("isHost")}
          onClick={() => setPredicate("isHost", "true")}
          color={"blue"}
          name={"host"}
          content={"I am hosting"}
        />
      </Menu>
      <Header
        icon={"calendar"}
        attached
        color={"teal"}
        content={"Select Date"}
      />
      <Calendar
        value={predicate.get("startDate") || new Date()}
        onChange={date => setPredicate("startDate", date!)}
      />
    </Fragment>
  );
};

export default observer(ActivityFilters);
