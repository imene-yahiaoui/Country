# Country and Percentage Management

This project is a simple application for managing a list of countries with assigned percentages. The application includes a form for entering a country name, selecting a country, and specifying a percentage. It ensures that the sum of percentages does not exceed 100%.

## Features

- Add countries and assign percentages.
- Displays a list of added countries with their respective percentages.
- Validates that the total percentage does not exceed 100%.
- Allows deleting countries from the list, updating the total percentage accordingly.

## Technologies Used

- **React**: For building the user interface.
- **Material UI**: For styling and UI components.
- **JsonForms**: For handling JSON schema-based forms.

## Installation

To set up and run this project locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Usage

1. Enter a **name** for the country item.
2. Select a **country** and specify a **percentage**.
3. Click the **Add** button to add the country and percentage to the list.
   - Ensure the total percentage does not exceed 100%. The app will show a warning if it does.
4. The list will display the country name and percentage with an option to delete individual items.
