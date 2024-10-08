// src\components\forms\validations\VPageAddListingImg.jsx
// Files (images) validation

import * as Yup from 'yup';

export default function VPageAddListingImg() {
  // Function to validate the dimensions of the image
  const validateImageDimensions = (
    uploadedFile,
    minWidth = 500,
    minHeight = 500,
  ) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          resolve(img.width >= minWidth && img.height >= minHeight);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(uploadedFile);
    });
  };

  // Image validation schema
  const imageValidation = Yup.mixed()
    .nullable() // Allows the field to be null
    .notRequired() // Makes it not required,
    .test(
      'fileType',
      'Only .jpeg, .jpg, .png, and .webp files are allowed',
      (
        uploadedFile, // file (image). 'uploadedFile' is just created with a random name here.
      ) => {
        if (!uploadedFile) return true; // Stop if it's 'true'.
        return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
          uploadedFile.type,
        );
      },
    )
    .test('fileSize', 'File must be less than 5 MB', (uploadedFile) => {
      if (!uploadedFile) return true; // If no file, it's fine
      return uploadedFile.size <= 5 * 1024 * 1024;
    })
    .test(
      'dimensions',
      'Image must be at least 500x500 pixels',
      async (uploadedFile) => {
        if (!uploadedFile) return true; // If no file, it's fine
        return await validateImageDimensions(uploadedFile);
      },
    );

  return <></>;
}
