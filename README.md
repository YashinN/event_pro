# EventPro - Conference Event App

## Description

EventPro is an event tracking and management web application. The main target for the app is conference venues that are consistently holding different events throughout the year and require a system where they can add, display, and track all hosted events. EventPro will be a platform to effectively manage events through a CMS that will allow admin users to manage event content. The app will also provide a simple user interface for users to view and bookmark upcoming events.

## Built with
- Mongo DB
- Express Server
- React
- Node.js


## Link To Production Site

https://wakeful-week-production.up.railway.app/


## How it works?

1. End user not logged in.
   - Has only viewing access.
   - Anyone can access the app wuithout logging in.
   - View events only.

2. End user logged in.
   - View events.
   - Save events to users 'my events' list for later refrence.
   - Remove events from users 'my events list'.

3. Admin user.
   - Has the same capabilities as a normal end user.
   - Can manage events create,edit,delete and update events.

4. Demo Admin.
   - In order to demo the admin functionality the login page has a button to sign in as a admin.



## Security & Authentication
- Helmet middleware is installed to secure the node.js express portion of the application and apply security headers.
- Jwt authentication is used to generate tokens for signed in users to access the application.
- Google & Github authentication strategies are used to validate users.
- Passwords are encrypted and hashed.
- .env file is used to inject key backend variables.
  

## Deployment
- Production builds deployed on Railways hosting services.
- Frontend & Backend are deployed separately for better scalability,performance and modularity.
- Railways was chosen to host backend as it can host an Express server with minimal configuration.
- Railways was chosen to host frontend and backend to improve app performance and communication between client,server & mongoDB database. All aspects are hosted in the same region.

## Installation

To install and run simply download the project, install the required node modules and run npm start from the '/frontend' directory.

#### `npm start` 

- Run 'npm start from '/frontend' directory ensure that the app is running on default  "http://localhost:3000".
- The frontend portion of the app will run locally & connect to the backend hosted on Railways.

#### Backend Configuration

- To make changes to the backend enviroment variables a  .env file must be added to the root '/backend' directory using the below env variables.

   PORT= 'Server default port'  
   MONGO_URI= 'Connection string to mongoDB cloud database'  
   SECRET= 'JWT secret'  
   GOOGLE_CLIENT_ID= 'Google client id credentials'  
   GOOGLE_CLIENT_SECRET='Google client secret'  
   GITHUB_CLIENT_ID='Github client id credentials'  
   GITHUB_CLIENT_SECRET='Github client secret'  
   CLIENT_URL = ' client host eg: http://localhost:3000/ or production client host address'


## Testing

## Run frontend tests

- From '/frontend' directory run 'npm test'.

## Run backend tests

- NB! backend tests require all env variables please see backend connfiguration.
- From '/backend' run 'npm test'


# Software Requirements

## System Architecture

### Tech Stack :

MongoDb, Express, React, Node.js

### Frontend Architecture:

The frontend architecture of the application will utilise a variety of tools, including React, Javascript, CSS, and Bootstrap. The nature of the application is going to be dynamic, where data will continuously be pulled, changed, and altered from the client to the backend. To accommodate the dynamic nature of the application, CRA, or create-react-app, will be used as a single-page application to reduce load times and improve overall performance. The application will be built using reactive functional components to promote reusable items, reduce the codebase size, and save time. To efficiently design the UI of the application, Bootstrap and a third-party styling framework called Bootswatch will be used. The use of a third-party framework means less time will need to be spent building a simple and attractively styled UI, which should drastically reduce the length of the project timeline.

### Backend Architecture:

The backend architecture of the application will be built with Express, MongoDB, and Node. A custom Express server will be built in order to effectively handle API requests between client and server. The express server will handle routing, the protection of routes, and authentication, leveraging the appropriate middleware. A third-party middleware framework called Helmet will be used to ensure the security of the custom Express server. In order to host and store user credentials and event data, a MongoDB cloud server will be used. MongoDB will easily allow for future scalability should the need arise to extend and grow the application.

## System Requirements

### Functional Reqiurements :


1. User registration & authentication.
   - Users can sign in with email & password.
   - Authenticate users by email and password.
   - Authenticate users with google & facebook auth.
   - Admin sign in grants access to CMS content.
     
2. Event Details.
   - Display featured events.
   - Display all events.
   - Filter events by venue,genre and date.
   - Show case event details ,time ,venue and description.

3. Event Management.
   - Admin only access to event management CMS.
   - Create, edit update and delete events.
   - Mark event as featured.
   - Automatically remove expired events.
   - Add event images.
   - Cancel events.

4. General User.
   - View all events.
   - Filter events by date,genre and venue.
   - Bookmark event.
   - Reomove bookmarked event.
   - View my events.
  
### Non-Functional Reqiurements :

1. Usability.
   - Simple UI design.
   - Prompts when functions are completed eg: added event.
   - Separate app functions by pages.
     
2. Reliability.
  - All user input for event creation will be processed and validated to mitigate end-user errors.
  - There is currently no database backup in place. Should the need arise, the MongoDB service can easily be upgraded to accommodate backup procedures.

4. Performance.
   - The App will initially run locally for best performance.
   - A South African MongoDB cloud server will be used for better performance for local use.
   - Should app usage increase, the database can easily be scaled and upgraded to a better-performing tier.
  
5. Security. 
   - Database security is handled by MongoDB and its data encryption procedures.
   - All user passwords will be hashed.
   - JWT authentication will be used for secure user authentication via tokens.

6. Design Constraints. 
   - App will only be designed for tablet and desktop screen sizes.
  

### User Stories:


1. A guest at a hotel would like to plan activities for their stay and bookmark items. As a registered user, they will be able to view events and bookmark them with a simple click on the bookmark button. The guest will be able to log into the event app and check their events and get key details of the event, such as time, date, and venue. With these tools, they will be able to efficiently plan their activities.

2. A tech company would like to host a series of tech-related expos at an events centre, and they require the event details to be readily available online for people to see. An admin will be able to log onto the app and add all the tech companies events along with the relevant details. Headliner events can be placed in the featured section to be easily seen by potential guests.

3. A company requires one of their events to be cancelled due to a guest speaker being ill. They require a way to notify guests that the event has been cancelled. An admin should be notified and update the cancelled event accordingly. The event status on the app will be changed for all users to see.








    
     
 
   














 
