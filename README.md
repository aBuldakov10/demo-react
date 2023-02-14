## Demo react app
Based on react-template (node 18.12.1, npm 8.19.3).\
Used **MUI** for styling without adaptive and minimum SCSS.\
Used **Formik** and **Yup** for validation forms\
Has **weather** and **tasks** routes:
#### Weather page
- Used [open weather map](https://openweathermap.org/) api
- Used context to provide data between components
- The cities list renders data from the js file
- Location button allows define your location and provide
the weather data according your coordinates.
- Check if geolocation is enabled in your browser otherwise
you'll get the error notification
#### Task list
- Used context to provide data between components
- Used backend on [render](https://render.com/) service.
It **disabled by default** (in sleep mode) that's why it 
can takes a few minutes to start server. Or you can 
create tasks while server starting and wait a few minutes.
- Allows create/delete/edit and mark as done tasks.
