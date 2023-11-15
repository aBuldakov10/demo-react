## Demo react app
#### Environment
Based on create-react-app.

Used **MUI** for styling without adaptive and minimum SCSS.\
Used **Formik** and **Yup** for validation forms\
Used **Redux**, **Redux-thunk** for state managing\
Used **Firebase** as backend for authenticate\
Used **i18n** for internationalization

Has 2 branches: **'master'** and **'app-context'**\
**Weather** and **ToDo** pages with using 
**Context** instead **Redux** placed in 
**'app-context'** branch

Has **weather**, **to-do** and **authentication** 
routes:

#### Home
- Default page.

#### Weather
- Used [open weather map](https://openweathermap.org/) api.
- The cities list renders data from the js file.
- Location button allows to define your location and provide
the weather data according your coordinates.
- Check if geolocation is enabled in your browser otherwise
you'll get the error notification.

#### To do list
- Used backend on [render](https://render.com/) service.
It **disabled by default** (in sleep mode) that's why it 
can take a few minutes to start server. Or you can 
create tasks while server starting and wait a few minutes.
- Allows create/delete/edit and mark as done tasks.

#### Authentication
- **Authenticate** user icon is displaying in the 
header.
- **Registration** with email and password. Redirect 
to **Profile** page after user has been registered.
- **Log in** with email and password. Redirect 
to **Profile** page after user has been logged in.
- **Reset password** allows user reset password and
create a new one without being logged in.
- **Profile** page displays user info. Here you can change
 user info, password and delete account. Default user name is
"Unknown user", you can change it in profile page.

#### Change language
- It has 2 **language versions**: **'ru'** and **'en'**. It 
is displaying in the application url. App has 2 dynamic 
language routes.
- **Switch language** icon is displaying in the 
header.
- **Languages** content is in local lang files.
- **Translation** is using for the **Weather**, **To do**,
**Authentication** and **Home** pages.
