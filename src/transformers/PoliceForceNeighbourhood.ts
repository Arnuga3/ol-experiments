import {
  earthOutline,
  linkOutline,
  locationOutline,
  mailOutline,
} from "ionicons/icons";
import _ from "lodash";

type ContactType = "email" | "website" | "address";

function getDetailIcon(type: ContactType) {
  switch (type.toLowerCase()) {
    case "email":
      return mailOutline;
    case "website":
      return earthOutline;
    case "address":
      return locationOutline;
    default:
      return linkOutline;
  }
}

export function transformNeighbourhoodData(data: any) {
  let details: any = [];
  const contacts = data.contact_details;

  if (contacts?.email) {
    details = [
      ...details,
      {
        name: "Email",
        type: "email",
        icon: getDetailIcon("email"),
        url: `mailto:${contacts.email}`,
      },
    ];
  }

  if (data?.locations) {
    data.locations.forEach((location: any) => {
      if (location.address && location.postcode) {
        details = [
          ...details,
          {
            name:
              location.address +
              (!location.address.includes(location.postcode)
                ? `, ${location.postcode}`
                : ""),
            type: "address",
            icon: getDetailIcon("address"),
          },
        ];
      }
    });
  }

  if (data?.url_force) {
    details = [
      ...details,
      {
        name: "Website",
        type: "website",
        icon: getDetailIcon("website"),
        url: data.url_force,
      },
    ];
  }

  return {
    ...data,
    details: _.sortBy(details, 'type'),
  };
}
