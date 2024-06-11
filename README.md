## Demo react app

Follow the [demo-app](https://abuldakov10.github.io/demo-react/#/ru) 
link to see the project. It has _**'Home'**_, _**'Weather'**_,
 _**'To Do'**_, _**'Orders'**_ and _**authentication**_ pages.

#### Environment
Based on create-react-app.\
Used **MUI** for styling without adaptive and minimum SCSS.\
Used **Redux** for state managing.\
Used native **Fetch** in **async/await** functions for http
 requests.\
Used **Formik** and **Yup** for validation forms.\
Used **Firebase** as backend for authenticate.\
Used **Swiper** for slider.\
Used **Session storage** as backend for orders.\
Used **i18n** for internationalization (Ru/En).\
Used **YaMap** for displaying selected city on the _weather_ page.\
Used **react-helmet** for change head pages data for more 
friendly SEO.\
Used **prettier** for js linting.

> [!NOTE]
> Has 2 branches: _'master'_ and _'app-context'_.
  _**Weather**_ and _**ToDo**_ pages with using 
  **Context** instead **Redux** placed in 
  _'app-context'_ branch

#### Pages:
##### Home
- Displays **device version** on resize (mobile, tablet or desktop)
- Shows **timer** until some event.
- **Slider** with thumbs. Slider data is in own component.
- Has internationalization.
- Full adaptive.

##### Weather
- Used [open weather map](https://openweathermap.org/) api.
- The city list renders data from the js file. 10 cities by default.
- Location button **allows to define your location** and provide
the weather data according your coordinates. (must be enabled
 geolocation in your browser).
- Check if geolocation is enabled in your browser otherwise
you'll get the error notification.
- **Map** allows to see the selected city on the _weather_ page.
- Has internationalization.
- Full adaptive.

##### To do list
- Used my backend on [render](https://render.com/) service.
It **disabled by default** (in sleep mode) that's why it 
can take a few minutes to start server. Or you can 
create tasks while server starting and wait a few minutes.
- Allows create/delete/edit and mark as done tasks.
- Has internationalization.
- Full adaptive.

##### Orders
- Show orders table data rendered from js file.
- **Custom** table **without MUI**.
- **Pagination** with **MUI**.
- **Sort** by asc/desc in column.
- **Search** by 'Client name' column.
- Add, edit and delete(one or more at once) orders.
- Used **session storage** instead backend.
- No internationalization.
- Full adaptive.

##### Authentication
- **Authenticate** user icon is displaying in the header.
- **Registration** with email and password. Redirect 
to **Profile** page after user has been registered.
- **Log in** with email and password. Redirect 
to **Profile** page after user has been logged in.
- **Reset password** allows user reset password and
create a new one without being logged in.
- **Profile** page displays user info. Here you can change
 user info, password and delete account. Default user name is
"Unknown user", you can change it in profile page.
- Has internationalization.
- Full adaptive.

##### Change language
- **Switch language** icon is displaying in the 
header.
- **Languages** content is in local lang files.
