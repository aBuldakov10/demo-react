## Demo app
Based on react-template (node 18.12.1, npm 8.19.3).\
Used **MUI** for styling without adaptive.\
Used **Formik** and **Yup** for validation forms\
Has **weather** and **tasks** routes:
#### Weather page
- Used [open weather map](https://openweathermap.org/) api
- The cities list renders data from the js file
- Location button allows define your location and provide
the weather data according your coordinates.
- Check if geolocation is enabled in your browser otherwise
you'll get the error notification
#### Task list
- Used backend on [render](https://render.com/) service.
It disabled by default (in sleep mode).
- Allows create tasks