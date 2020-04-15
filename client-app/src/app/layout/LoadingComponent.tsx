import React from 'react';
import { Dimmer, Loader, Image } from 'semantic-ui-react';

const LoadingComponent: React.FC<{ inverted?: boolean; content?: string }> = ({
  inverted = true,
  content,
}) => {
  return (
    <>
      <Dimmer active inverted={inverted}>
        <Loader content={content} />
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </>
  );
};

export default LoadingComponent;
