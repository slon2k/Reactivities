import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface IProps {
  setImage: (file: Blob) => void;
  imagePreview: string;
}

const PhotoUploadCropper: React.FC<IProps> = ({ setImage, imagePreview }) => {
  const cropper = useRef<Cropper>(null);

  const cropImage = () => {
    if (
      cropper &&
      cropper.current &&
      typeof cropper.current.getCroppedCanvas() === undefined
    ) {
      return;
    }
    cropper &&
      cropper.current &&
      cropper.current.getCroppedCanvas().toBlob((blob: any) => {
        setImage(blob);
      }, "image/jpeg");
  };

  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
      preview=".img-preview"
      guides={false}
      aspectRatio={1 / 1}
      style={{ height: 200, width: "100%" }}
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      crop={cropImage}
    />
  );
};

export default PhotoUploadCropper;
