# SupChat Frontend

SupChat is a messaging application that allows users to send messages to each other and customize their user profiles. This repository contains the front-end code for the SupChat application.

## Features

- User authentication and authorization
- Sending messages to other users
- Customizing user profiles with a profile picture and bio

## Technologies Used

- React
- React Router
- Styled-components
- Axios
- JWT
- Netlify (for deployment)

## Demo

Check out the live demo of the application [here](https://jfoti64-supchat.netlify.app/login).

## Screenshots

![Screenshot 1](/src/assets/screenshots/Screenshot%202024-06-30%20at%209.55.52 PM.png)
![Screenshot 2](/src/assets/screenshots/Screenshot%202024-06-30%20at%2010.01.00 PM.png)
![Screenshot 3](/src/assets/screenshots/Screenshot%202024-06-30%20at%208.58.30 PM.png)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v12 or higher)
- npm (v6 or higher) or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/supchat-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd supchat-frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

To run the application locally, use the following command:

```bash
npm start
# or
yarn start
```

This will start the development server and open the application in your default web browser. The app will be available at `http://localhost:3000`.

### Deployment

This project is deployed using Netlify. To deploy your own instance:

1. Create a new site on [Netlify](https://www.netlify.com/).
2. Connect your repository.
3. Set the build command to `npm run build` or `yarn build`.
4. Set the publish directory to `build`.

Ensure you have a `_redirects` file or a `netlify.toml` file to handle routing correctly.

### `_redirects` file

Create a `_redirects` file in the `public` directory with the following content:

```
/*    /index.html   200
```

### `netlify.toml` file

Create a `netlify.toml` file in the root directory with the following content:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.
