import {
  colorMainPink,
  colorMainBlueLight,
  colorSecGreenish,
  colorSecBlue,
} from "../../../Settings/cssVariables";

export const SubscriptionCards = [
  {
    name: "Basic care",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien.`,
    color: colorMainPink,
    mandatory: true,
  },
  {
    name: "Dental care",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien.`,
    color: colorMainBlueLight,
    mandatory: false,
  },
  {
    name: "Hospital care",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien.`,
    color: colorSecGreenish,
    mandatory: false,
  },
  {
    name: "Pharma care",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero sapien.`,
    color: colorSecBlue,
    mandatory: false,
  },
];
