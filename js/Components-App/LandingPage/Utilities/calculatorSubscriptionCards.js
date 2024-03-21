import {
  colorMainPink,
  colorMainBlueLight,
  colorSecGreenish,
  colorSecBlue,
} from "../../../Settings/cssVariables";

export const subscriptionCards = [
  {
    name: "Basic care",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien.`,
    color: colorMainPink,
    mandatory: true,
    price: 500,
  },
  {
    name: "Dental care",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien.`,
    color: colorMainBlueLight,
    mandatory: false,
    price: 250,
  },
  {
    name: "Hospital care",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien.`,
    color: colorSecGreenish,
    mandatory: false,
    price: 450,
  },
  {
    name: "Pharma care",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien.`,
    color: colorSecBlue,
    mandatory: false,
    price: 100,
  },
];
