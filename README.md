SupChat Frontend

SupChat is a messaging application that allows users to send messages to each other and customize their user profiles. This repository contains the front-end code for the SupChat application.

Features

User authentication and authorization
Sending messages to other users
Customizing user profiles with a profile picture and bio
Technologies Used

React
React Router
Styled-components
Axios
JWT
Netlify (for deployment)
Getting Started

Prerequisites
Ensure you have the following installed:

Node.js (v12 or higher)
npm (v6 or higher) or yarn
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/jfoti64/supchat-frontend.git
Navigate to the project directory:

bash
Copy code
cd supchat-frontend
Install the dependencies:

bash
Copy code
npm install

# or

yarn install
Running the Application
To run the application locally, use the following command:

bash
Copy code
npm start

# or

yarn start
This will start the development server and open the application in your default web browser. The app will be available at http://localhost:3000.

Deployment
This project is deployed using Netlify. To deploy your own instance:

Create a new site on Netlify.
Connect your repository.
Set the build command to npm run build or yarn build.
Set the publish directory to build.
Ensure you have a \_redirects file or a netlify.toml file to handle routing correctly.

\_redirects file
Create a \_redirects file in the public directory with the following content:

bash
Copy code
/\* /index.html 200
netlify.toml file
Create a netlify.toml file in the root directory with the following content:

toml
Copy code
[[redirects]]
from = "/\*"
to = "/index.html"
status = 200
Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

License

This project is licensed under the MIT License.
