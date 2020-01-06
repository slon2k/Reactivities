import React from 'react'
import ProfileHeader from '../components/profile-header/ProfileHeader'
import ProfileContent from '../components/profile-content/ProfileContent'
import { Grid } from 'semantic-ui-react'

const ProfilePage = () => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader />
        <ProfileContent />        
      </Grid.Column>
    </Grid>
  )
}

export default ProfilePage
