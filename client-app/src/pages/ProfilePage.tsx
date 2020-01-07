import React, { useContext, useEffect } from 'react'
import ProfileHeader from '../components/profile-header/ProfileHeader'
import ProfileContent from '../components/profile-content/ProfileContent'
import { Grid } from 'semantic-ui-react'
import { RouteComponentProps } from 'react-router'
import { StoreContext } from '../store'
import { observer } from 'mobx-react-lite'
import Loading from '../components/loading/Loading'

interface RouteParams {
  username: string
}

interface IProps extends RouteComponentProps<RouteParams> { }

const ProfilePage: React.FC<IProps> = ({ match }) => {

  const Store = useContext(StoreContext);
  const { loadProfile, loadingProfile, profile } = Store.profileStore;

  useEffect(() => {
    loadProfile(match.params.username)
  }, [loadProfile, match]);

  if (loadingProfile) {
    return <Loading content="Loading profile ..." />
  }

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile &&
          <ProfileHeader profile={profile} />
        }

        <ProfileContent />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ProfilePage)
