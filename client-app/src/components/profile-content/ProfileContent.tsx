import React from 'react'
import { Tab } from 'semantic-ui-react'

const panes = [
  { menuItem: "About", render: () => <Tab.Pane>About</Tab.Pane> },
  { menuItem: "Photos", render: () => <Tab.Pane>Photos</Tab.Pane> },
  { menuItem: "Activities", render: () => <Tab.Pane>Activities</Tab.Pane> },
  { menuItem: "Followers", render: () => <Tab.Pane>Followers</Tab.Pane> },
  { menuItem: "Following", render: () => <Tab.Pane>Following</Tab.Pane> }
]

const ProfileContent = () => {
  return (
    <Tab
      menuPosition='right'
      menu={{ fliud: true, vertical: true }}
      panes={panes}
    />
  )
}

export default ProfileContent
