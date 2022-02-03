# Food Bunnies - Frontend

This is the frontend code for www.FoodBunnies.com - a platform that helps ghost kitchens find delivery drivers.

![Screenshot](https://github.com/lavaboom/fb-frontend/blob/main/screenshot.png?raw=true)

Language: JavaScript

Framework: React

Preprocessor: Sass

## Setting up the test environment

Please first have the backend [service](https://github.com/lavaboom/fb-backend) set up and running.

Run `npm install` to install all dependencies.

Rename `.env.example` to `.env`.

Finally, run `npm start` to start the app in development mode (will run on port 3000 by default).

## Testing use cases

There are 2 user profiles: Kitchen (i.e. sender) and Driver. User can switch between Kitchen view and Driver view from the top navigation bar.

Both user profiles have the same authentication mechanism.

### Authentication
New users can sign up via the link http://localhost:3000/signup.

Returning users can log in at http://localhost:3000/login.

### For Kitchen - add a new trip
Users can add a new delivery trip at http://localhost:3000/addtrip or by clicking on the "Add a new trip" button from the dashboard (http://localhost:3000/kitchen).

Form validation is in place to ensure job date is not in the past.

### For Driver - bid on a trip
Register as a new driver, then click on "Switch to Driver view" in the navbar to switch to driver view (http://localhost:3000/driver).

Bid on a trip by click on the bid button and submit.

### For Kitchen - select a driver for the trip
Once a trip has received at least 1 bid, upon refreshing the page the Kitchen user will be able to choose a driver for the delivery trip. Driver's rating will be shown if available.

Log out and register a new driver user or use one of the existing seed drivers (e.g. Niko@hotmail.ca - password "123") to simulate scenarios where multiple drivers submit bids on the same delivery job.

Aggregate rating for a driver is calculated at the frontend (backend only provides the raw individual reviews data; the math is done by the frontend).

### For Kitchen - review the driver
Once a trip is completed (i.e. recipient confirms with sender that the order has been successfully delivered), Kitchen should mark the trip as completed by clicking on the button "mark as completed". Doing so will take them to the review page where they can leave a review for the driver.