import React, { Fragment, useState, useEffect } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import PhotoUploadDropzone from "./PhotoUploadDropzone";

const PhotoUpload = () => {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  });

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <PhotoUploadDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 2 - Resize Image" />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 3 - Preview & Upload" />
          {files.length > 0 && <Image src={files[0].preview} />}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default PhotoUpload;
