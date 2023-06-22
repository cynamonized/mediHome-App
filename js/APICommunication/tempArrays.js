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
      id: 1,
      completed: false,
      booked: true,
      city: "Warsaw",
    },
    {
      date: DateTime.local(2023, 6, 23, 9, 0),
      specialization: "Internist",
      place: "Puławska Center",
      doctor: "Alan Smith",
      id: 2,
      completed: false,
      booked: true,
      city: "Warsaw",
    },
  ],
  [
    {
      date: DateTime.local(2023, 6, 3, 10, 0),
      specialization: "Orthopaedist",
      place: "Dworzec Gdański 12",
      doctor: "Will Smith",
      id: 3,
      completed: true,
      booked: true,
      city: "Warsaw",
      recommendations: `Recommendation 1 
      Recomendation 2
      Recommendation 3`,
    },
    {
      date: DateTime.local(2023, 6, 5, 14, 30),
      specialization: "Internist",
      place: "Kabaty Centrum",
      doctor: "Adam Sandler",
      id: 4,
      completed: true,
      booked: true,
      city: "Warsaw",
      recommendations: `Recommendation 1
      Recomendation 2
      Recommendation 3
      Recomendation 4
      Recommendation 5
      `,
    },
  ],
];

export const temporaryAppointmentsUser = [
  {
    name: "Mark",
    lastName: "Marco",
    userID: 1,
    userPersonalData: {
      PESEL: 12345678900,
      email: "example_email.gmail.com",
      phone: 123456789,
      birthDate: DateTime.local(1987, 4, 20, 0, 0),
      password: "examplePassword123",
      address: {
        streetName: "Mandarynki",
        apartmentNumber: "4/10",
        postCode: "00-710",
        city: "Warsaw",
        country: "Poland",
      },
    },
    appointments: [
      [
        {
          date: DateTime.local(2023, 6, 23, 8, 30),
          specialization: "Orthopaedist",
          place: "Racławicka 42",
          doctor: "Gordon Freeman",
          id: 1,
          completed: false,
          booked: true,
          city: "Warsaw",
        },
        {
          date: DateTime.local(2023, 6, 23, 9, 0),
          specialization: "Internist",
          place: "Puławska Center",
          doctor: "Alan Smith",
          id: 2,
          completed: false,
          booked: true,
          city: "Warsaw",
        },
      ],
      [
        {
          date: DateTime.local(2023, 6, 3, 10, 0),
          specialization: "Orthopaedist",
          place: "Dworzec Gdański 12",
          doctor: "Will Smith",
          id: 3,
          completed: true,
          booked: true,
          city: "Warsaw",
          recommendations: `Recommendation 1 
        Recomendation 2
        Recommendation 3`,
        },
        {
          date: DateTime.local(2023, 6, 5, 14, 30),
          specialization: "Internist",
          place: "Kabaty Centrum",
          doctor: "Adam Sandler",
          id: 4,
          completed: true,
          booked: true,
          city: "Warsaw",
          recommendations: `Recommendation 1
        Recomendation 2
        Recommendation 3
        Recomendation 4
        Recommendation 5
        `,
        },
      ],
    ],
  },
];

export const AllAppos = {
  Available: {
    Poznan: {
      Internist: [
        {
          date: DateTime.local(2023, 7, 1, 8, 30),
          specialization: "Internist",
          place: "Puławska Center",
          doctor: "Gordon Freeman",
          id: 5,
          booked: false,
          completed: false,
          patientID: "",
          city: "Poznan",
        },
        {
          date: DateTime.local(2023, 7, 1, 9, 0),
          specialization: "Internist",
          place: "Puławska Center",
          doctor: "Gordon Freeman",
          id: 6,
          booked: false,
          completed: false,
          patientID: "",
          city: "Poznan",
        },
      ],
      Orthopaedist: [
        {
          date: DateTime.local(2023, 7, 12, 8, 30),
          specialization: "Orthopaedist",
          place: "Racławicka 42",
          doctor: "Cristiano Ronaldo",
          id: 7,
          booked: false,
          completed: false,
          patientID: "",
          city: "Poznan",
        },
        {
          date: DateTime.local(2023, 7, 12, 9, 0),
          specialization: "Orthopaedist",
          place: "Racławicka 42",
          doctor: "Cristiano Ronaldo",
          id: 8,
          booked: false,
          completed: false,
          patientID: "",
          city: "Poznan",
        },
      ],
      Orthodontist: [
        {
          date: DateTime.local(2023, 7, 20, 15, 30),
          specialization: "Ortodontist",
          place: "Biedronki 12",
          doctor: "Adam Crazy",
          id: 9,
          booked: false,
          completed: false,
          patientID: "",
          city: "Poznan",
        },
        {
          date: DateTime.local(2023, 7, 20, 16, 0),
          specialization: "Ortodontist",
          place: "Biedronki 12",
          doctor: "Adam Crazy",
          id: 10,
          booked: false,
          completed: false,
          patientID: "",
          city: "Poznan",
        },
      ],
    },
    Krakow: {
      Internist: [
        {
          date: DateTime.local(2023, 7, 2, 12, 30),
          specialization: "Internist",
          place: "Rondo Grzegorzeckie 16",
          doctor: "Gregor McKinsey",
          id: 11,
          booked: false,
          completed: false,
          patientID: "",
          city: "Krakow",
        },
        {
          date: DateTime.local(2023, 7, 2, 14, 0),
          specialization: "Internist",
          place: "Rondo Grzegorzeckie 16",
          doctor: "Gregor McKinsey",
          id: 12,
          booked: false,
          completed: false,
          patientID: "",
          city: "Krakow",
        },
      ],
      Orthopaedist: [
        {
          date: DateTime.local(2023, 7, 13, 18, 30),
          specialization: "Orthopaedist",
          place: "Krowodrza Gorka Center",
          doctor: "Oliver Wynman",
          id: 13,
          booked: false,
          completed: false,
          patientID: "",
          city: "Krakow",
        },
        {
          date: DateTime.local(2023, 7, 13, 19, 0),
          specialization: "Orthopaedist",
          place: "Krowodrza Gorka Center",
          doctor: "Oliver Wynman",
          id: 14,
          booked: false,
          completed: false,
          patientID: "",
          city: "Krakow",
        },
      ],
      Orthodontist: [
        {
          date: DateTime.local(2023, 7, 10, 12, 30),
          specialization: "Ortodontist",
          place: "Aleja Trzech Wieszczow",
          doctor: "George Kinder",
          id: 15,
          booked: false,
          completed: false,
          patientID: "",
          city: "Krakow",
        },
        {
          date: DateTime.local(2023, 7, 10, 14, 0),
          specialization: "Ortodontist",
          place: "Aleja Trzech Wieszczow",
          doctor: "George Kinder",
          id: 16,
          booked: false,
          completed: false,
          patientID: "",
          city: "Krakow",
        },
      ],
    },
    Warsaw: {
      Internist: [
        {
          date: DateTime.local(2023, 7, 4, 12, 30),
          specialization: "Internist",
          place: "Main Square Center",
          doctor: "Jerry Wisdom",
          id: 17,
          booked: false,
          completed: false,
          patientID: "",
          city: "Warsaw",
        },
        {
          date: DateTime.local(2023, 7, 4, 15, 0),
          specialization: "Internist",
          place: "Main Square Center",
          doctor: "Jerry Wisdom",
          id: 18,
          booked: false,
          completed: false,
          patientID: "",
          city: "Warsaw",
        },
      ],
      Orthopaedist: [
        {
          date: DateTime.local(2023, 7, 22, 18, 30),
          specialization: "Orthopaedist",
          place: "Kabaty Center",
          doctor: "Jean Pierre",
          id: 19,
          booked: false,
          completed: false,
          patientID: "",
          city: "Warsaw",
        },
        {
          date: DateTime.local(2023, 7, 23, 15, 0),
          specialization: "Orthopaedist",
          place: "Kabaty Center",
          doctor: "Jean Pierre",
          id: 20,
          booked: false,
          completed: false,
          patientID: "",
          city: "Warsaw",
        },
      ],
      Orthodontist: [
        {
          date: DateTime.local(2023, 7, 10, 14, 30),
          specialization: "Ortodontist",
          place: "Mlociny Center",
          doctor: "Josh Browser",
          id: 21,
          booked: false,
          completed: false,
          patientID: "",
          city: "Warsaw",
        },
        {
          date: DateTime.local(2023, 7, 11, 17, 0),
          specialization: "Ortodontist",
          place: "Mlociny Center",
          doctor: "Josh Browser",
          id: 22,
          booked: false,
          completed: false,
          patientID: "",
          city: "Warsaw",
        },
      ],
    },
  },
  Booked: {
    Poznan: {
      Internist: [],
      Orthopaedist: [],
      Orthodontist: [],
    },
    Krakow: {
      Internist: [],
      Orthopaedist: [],
      Orthodontist: [],
    },
    Warsaw: {
      Internist: [
        {
          date: DateTime.local(2023, 6, 23, 9, 0),
          specialization: "Internist",
          place: "Puławska Center",
          doctor: "Alan Smith",
          id: 2,
          completed: false,
          booked: true,
          patientID: 1,
          city: "Warsaw",
        },
        {
          date: DateTime.local(2023, 6, 30, 14, 0),
          specialization: "Internist",
          place: "Small Street 11",
          doctor: "Ian McKellen",
          id: 23,
          booked: true,
          completed: false,
          patientID: 2,
          city: "Warsaw",
        },
      ],
      Orthopaedist: [
        {
          date: DateTime.local(2023, 6, 23, 8, 30),
          specialization: "Orthopaedist",
          place: "Racławicka 42",
          doctor: "Gordon Freeman",
          id: 1,
          completed: false,
          booked: true,
          patientID: 1,
          city: "Warsaw",
        },
        {
          date: DateTime.local(2023, 6, 23, 10, 30),
          specialization: "Orthopaedist",
          place: "Racławicka 42",
          doctor: "Gordon Freeman",
          id: 24,
          completed: false,
          booked: true,
          patientID: 2,
          city: "Warsaw",
        },
      ],
      Orthodontist: [],
    },
  },
};
