# Angular MVVM Sample

The cause is to implement the MVVM pattern in the Angular app.

There are steps to run the app below
1. Clone the [asp-net-rest-api-sample](https://github.com/dennisshevtsov/asp-net-rest-api-sample) repository.
2. Configure and run the API as it described in [readme.md](https://github.com/dennisshevtsov/asp-net-rest-api-sample).
3. Update variable [apiServer](https://github.com/dennisshevtsov/angular-mvvm-sample/blob/main/src/environments/environment.ts) with the URL of the API.
4. Run the app with command `ng serve -o`.

There are steps to run the tests.
1. Karma is configure to run the tests in Firefox. If you want to run the tests in another browser, update the launcher with a proper one in the [karma.conf.js](https://github.com/dennisshevtsov/angular-mvvm-sample/blob/main/karma.conf.js).
2. Run the tests with commang `ng test`.
