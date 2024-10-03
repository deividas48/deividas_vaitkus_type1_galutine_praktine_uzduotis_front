# Photo Upload Functionality Overview

The goal is to implement a photo upload feature that allows users to upload multiple photos when creating a new listing. This functionality is integrated into the `PageAddListing` component on the front end and the `listingRoutes.js` file on the back end.

## Key Components and Updates

### Front-End: `PageAddListing` Component

- **Functionality**: Enables users to select and upload multiple photos as part of the listing creation form.
- **Responsibilities**:
  - Integrates a file input field that accepts multiple files.
  - Manages photo files within the form state using Formik.
  - Displays selected photo filenames to the user for confirmation.
  - Submits form data, including photos, to the back-end API using `FormData`.

### Back-End: `listingRoutes.js`

- **Functionality**: Handles the reception and storage of uploaded photo files on the server.
- **Responsibilities**:
  - Configures Multer middleware to handle `multipart/form-data` and file uploads.
  - Defines the storage destination and filename structure for uploaded photos.
  - Processes incoming form data and files from the front end.
  - Inserts listing data into the database, including references to uploaded photo filenames.

### Multer Configuration

- **Description**: Uses Multer for handling file uploads in the Express application.
- **Implementation**:
  - Configures storage settings with `diskStorage`, specifying the destination directory and filename format.
  - Uses `path` and `fileURLToPath` to resolve the absolute path for the upload directory.
  - Ensures the upload directory exists, creating it if necessary.
  - Sets up the middleware to accept multiple files with a limit (e.g., up to 10 photos).

### FormData Usage in Front-End

- **Description**: Utilizes the `FormData` API to send form data and photos in a single POST request.
- **Implementation**:
  - Creates a new `FormData` instance in the `onSubmit` handler.
  - Appends form fields and photo files to the `FormData` object.
  - Configures Axios to send the `FormData` with the correct `Content-Type` header (`multipart/form-data`).

### Database Integration

- **Description**: Stores references to uploaded photos in the database alongside listing details.
- **Implementation**:
  - Updates the `INSERT` SQL statement to include columns for photo filenames (`main_image_url`, `list_image_url_1`, etc.).
  - Ensures the number of columns matches the number of values in the SQL query.
  - Handles optional photo fields by inserting `NULL` when no photo is provided.
  - Uses an array (`argArr`) to map values to the corresponding columns.

### Error Handling and Validation

- **Front End**:

  - Uses Yup for form validation, ensuring required fields are filled and data formats are correct.
  - Provides user feedback on validation errors before submission.
  - Displays error messages if the submission fails.

- **Back End**:
  - Validates required fields in the POST route handler.
  - Wraps database operations in `try...catch` blocks to handle errors gracefully.
  - Returns appropriate HTTP status codes and error messages for client-side handling.

### ESLint and Code Quality

- **Description**: Addressed ESLint issues to maintain code quality and consistency.
- **Actions**:
  - Updated ESLint configuration to allow `__dirname` and `__filename` by adjusting the `no-underscore-dangle` rule.
  - Ensured consistent use of ES modules (`import`/`export`) and resolved issues related to `__dirname` in ES module scope.
  - Fixed any remaining ESLint warnings or errors in both front-end and back-end code.

## Conclusion

The photo upload functionality enriches the listing creation process by allowing users to attach multiple images, enhancing the attractiveness and informativeness of listings. By properly integrating front-end and back-end components, the application ensures a seamless user experience and reliable data handling.

---

**Note**: This implementation assumes that the necessary directories and database schema are correctly set up to handle the uploaded files and associated data. Regular testing and validation are recommended to ensure the feature works as intended across different environments.
