# Train Schedule Application

This is a Train Schedule Application that allows you to manage train routes. You can create, edit, delete, update, and search train routes.

## The project consists of two pages:

1. Train Routes List Page: Displays a list of routes with the ability to filter by activated status. Above the table is a filter/dropdown - with options: “Show All”, “Show Active”, “Show Deactive”. By default is “Show All”. By default, when creating a new route, the activated status is set to true.
Also here is a link to the “Add a Route” page. 
You can edit the activation status or delete a route from DB, but only if the record is deactivated. 
Clicking on the edit button will redirect you to another page where you can edit the selected route's data. Clicking on the "Deactivate" toggle in the actions group highlights the record to indicate that it is deactivated. The "Re-Activate" toggle performs the opposite function of the "Deactivate" button. The delete button is only visible for deactivated records.

2. Add/Edit Route Page: Allows creating/edit routes. The form contains fields for entering the number of trains, departure city, arrival city, start time, duration in route(hours, minutes), departure days and additional information(not required).
On creatinf new route  activated is true(defaulte). Route's data is stored on the server and can be obtained through a REST API.

## Steps to run the project:

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install`.
3. Start the application by running `npm start`.
4. Open your web browser and navigate to http://localhost:3000/ to access the application.

Technologies:
 - React
 - TypeScript
 - React Router
 - Context API
 - Bulma
