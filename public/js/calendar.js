const { google, outlook, office365, yahoo, ics } = require("calendar-link");

const event = {
  start: "2022-08-19",
  allDay: true,
  duration: [1, "day"],
  title: "Unsubscribe from Netflix",
};

document
  .querySelector('.calendarLink')
  .addEventListener('submit', google(event));