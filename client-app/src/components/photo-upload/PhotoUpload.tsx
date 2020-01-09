import React, { Fragment, useState, useEffect } from "react";
import { Grid, Header } from "semantic-ui-react";
import PhotoUploadDropzone from "./PhotoUploadDropzone";
import PhotoUploadCropper from "./PhotoUploadCropper";

const PhotoUpload = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [image, setImage] = useState<Blob | null>(null);

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
          {files.length > 0 && (
            <PhotoUploadCropper
              setImage={setImage}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 3 - Preview & Upload" />
          {files.length > 0 && (
            <div
              className="img-preview"
              style={{ minHeight: "200px", overflow: "hidden" }}
            />
          )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default PhotoUpload;
