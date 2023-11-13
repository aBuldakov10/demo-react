// Create dates
const endDate = new Date(2023, 11, 29, 0, 0); // end date
const currentDate = new Date(); // current date

// Initial timer state in seconds: 'end date' or 0
export const initTimerState = () => ((endDate - currentDate) / 1000 > 0 ? (endDate - currentDate) / 1000 : 0);

// Convert time to integer value and fill by 0 if value less than 10
export const convertTime = (time) => Math.trunc(time).toString().padStart(2, '0');
