#This is web application is using a redux, react-redux for state management

In the src folder there are three redux compoenents that pieces everything together.
Namely

1. action
2. store :
3. types

and theres the authentication side
The web application is using JWT tokens

the components involved are

1. authProvider : This is where the configurations is done, such as

   > > > > populating headers for every request made to the backend with accessToken for authentication
   > > > > populating redux store with a refreshed token that is then been updated at root level of the application

   Note: refreshed token is fetched from the backend in via authProvider
