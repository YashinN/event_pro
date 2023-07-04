# EventPro - Conference Event App

## Description

EventPro is going to be a an event tracking and managment web application. The main target for the app is conference venues that are consistently holding different events through out the year and require a system where they can add ,display and track all hosted events. The EventPro will be a platform to effectively manage events through a CMS that will allow admin users to manage event content. The app will also provide a simple user interface for users to view and bookmark up and coming events. 


# Software Requirements

## System Architecture

### Tech Stack :

MongoDb, Express, React, Node.js

### Frontend Architecture:

The frontend architecture of the application will utilise a vairety of tools React, Javascript, Css and Bootstrap. The nature of the application is going to be dynamic where data will consitently be pulled changed and altered from the client to the backend. To accomodate for the dyncamic nature of the application CRA or create-react-app will be used as a single page application to reduce load times and improve overall performance. The application will be built using react functional components to promote reusable items ,reduce codebase size and save time. To efficently design the UI of the application Bootstrap and a third party stlying frame work called bootswatch will be used. The use of a 3rd party framework means less time will need to be spent building a simple and attractively styled UI , this should drastically reduce the length of the project timeline.

### Backend Architecture:

The backend architecture of the application will be built with Express ,MongoDb and Node. A custom express server will be built in order to effectively handle Api requests between client and server. The express server will handle routeing ,the protection of routes and authentication leveraging the appropriate middleware. A third party middleware Helmet will be used to ensure the security of the custom express server. In order to host and store user credentials and event data a MongoDb cloud server will be used. MongoDb will easily allow for future scalablity should the need arise to extend and grow the application. 

## System Requirements

### Functional Reqiurements :


1. User registration & Authentication.
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
   - Admin only access to event managment CMS.
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
   - Seperate app functions by pages.
     
2. Reliability.
  - All user input for event creation will processed and validated to mitigate end user errors.
  - Currently no database backup in place. Should the need arise MongoDb service can easily be upgraded to accomodate backup procedures.

4. Performance.
   - App will iniitally run locally for best performance.
   - South African MongoDb cloud server will be used, better performance for local use.
   - Should app usage increase database can easily be scaled and upgraded to a better performing tier.
  
5. Security. 
   - Database security is handled by MongoDb and it's data encryption procedures.
   - All user passwords will be hashed.
   - JWT authenitcation will be used for secure user authentication via tokens.

6. Design Constraints. 
   - App will only be designed for tablet and desktop screen sizes.
  

### User Stories:


1. A guest at a hotel would like to plan activities for there stay and bookmark items. As a registered user they will be able to view events and bookmark said events with a simple click on a bookmark button. The guest will be able to log into the event app and check there events and get key details of the event such as time , date and venue. With these tools they will be able to efficently plan there acitivites.

2. A tech company would like to host a series of tech related expos at a events centre , they require the event details to be readily available online for people to see. A admin will be able to log onto the app and add all the tech companies events along with the relevant details , headliner events can be placed in the featured section to be easily seen by potential guests.

3. A company requires one of there events to be canceled due to a guest speaker being ill. They require a way to notify guests that the event has been canceled. A admin should be notified and update the canceled event accordingly . The event status on the app will be changed for all users to see.








    
     
 
   














 
