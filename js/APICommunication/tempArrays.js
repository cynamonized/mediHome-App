import { DateTime } from "luxon";

//Temporary object for blog
export const blogArticleContent = {
  articleTitle: "Lorem ipsum dolor amet",
  articleBody:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent velit nulla...",
  articleImage:
    "https://github.com/cynamonized/mediHome-App/blob/dba4278ef9416d46009aaa863888c6d16f7e5d20/images/Blog%20article%20-%20temp.png?raw=true",
};

// To be replaced with real data representation from API
export const temporaryAppointments = [
  [
    {
      date: DateTime.local(2023, 6, 23, 8, 30),
      specialization: "orthopaedist",
      place: "Racławicka 42",
      doctor: "Gordon Freeman",
      // app ID !!
    },
    {
      date: DateTime.local(2023, 6, 23, 9, 0),
      specialization: "internist",
      place: "Puławska Center",
      doctor: "Alan Smith",
      // app ID !!
    },
  ],
  [
    {
      date: DateTime.local(2023, 6, 3, 10, 0),
      specialization: "orthopaedist",
      place: "Dworzec Gdański 12",
      doctor: "Will Smith",
      // app ID !!
    },
    {
      date: DateTime.local(2023, 6, 5, 14, 30),
      specialization: "internist",
      place: "Kabaty Centrum",
      doctor: "Adam Sandler",
      // app ID !!
    },
  ],
];
