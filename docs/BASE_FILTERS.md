# Base Filters Functionality Overview

The goal is to implement a base filter system that allows users to filter listings by various criteria such as price, town, type, and seller. This functionality is integrated into the `PageHome` and `PageListingsCategory` components, and it utilizes a new `FiltersLayoutBasePages` component for handling filter forms and validation.

## Key Components and Updates

### FiltersLayoutBasePages Component

- **Functionality**: Handles the filter form and validation.
- **Responsibilities**:
  - Manages the state of filter values.
  - Passes filter values to other components as needed.

### ListingsFetchWrapper Component

- **Functionality**: Connects the filters and listings fetch logic.
- **Responsibilities**:
  - Receives filter values as props.
  - Uses filter values to fetch filtered listings from the backend API.

### Updated PageHome and PageListingsCategory Components

- **Functionality**: Utilize the base filters by incorporating the `FiltersLayoutBasePages` and `ListingsFetchWrapper` components.
- **Responsibilities**:
  - Ensure the filters are correctly applied and displayed to the user.

### Prop Passing

- **Description**: Base filters are passed as props to `ListingsFetchWrapper` and `ListingsListFetch` components to ensure the listings are fetched and displayed based on the applied filters.

### Backend API Integration

- **Description**: Ensure that the backend API correctly handles the filter values and returns the filtered listings.
- **Debug Logs**: Added debug logs to track filter values and URL fetch requests to help with troubleshooting and validation.

### Updated LayoutBasePages Component

- **Functionality**: Accommodates the new filter functionality by ensuring the layout properly integrates the filter forms and listings display.

### ESLint Fixes

- **Description**: Address any ESLint issues related to prop spreading and nested components to maintain code quality and consistency.
