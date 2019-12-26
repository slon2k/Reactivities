import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface IProps {
  content?: string;
}

const Loading : React.FC<IProps> = ({content}) => {
  return (
    <Dimmer active inverted>
      <Loader content={content}/>
    </Dimmer>
  )
}

export default Loading
