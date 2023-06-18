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
      specialization: "Orthopaedist",
      place: "Racławicka 42",
      doctor: "Gordon Freeman",
      id: 1234,
      completed: false,
    },
    {
      date: DateTime.local(2023, 6, 23, 9, 0),
      specialization: "Internist",
      place: "Puławska Center",
      doctor: "Alan Smith",
      id: 1235,
      completed: false,
    },
  ],
  [
    {
      date: DateTime.local(2023, 6, 3, 10, 0),
      specialization: "Orthopaedist",
      place: "Dworzec Gdański 12",
      doctor: "Will Smith",
      id: 1236,
      completed: true,
      recommendations: `Recommendation 1 
      Recomendation 2
      Recommendation 3`,
    },
    {
      date: DateTime.local(2023, 6, 5, 14, 30),
      specialization: "Internist",
      place: "Kabaty Centrum",
      doctor: "Adam Sandler",
      id: 1237,
      completed: true,
      recommendations: `Recommendation 1
      Recomendation 2
      Recommendation 3
      Recomendation 4
      Recommendation 5
      `,
    },
  ],
];

export const availableAppos = [];
