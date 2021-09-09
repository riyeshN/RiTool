import { FILESTOUPLOAD } from "./type";

export const filesToUpload = (fileUpload) => {
  console.log('files to upload', fileUpload);
  return {
    type: FILESTOUPLOAD,
    payload: {
      fileUpload: fileUpload,
    },
  };
};
