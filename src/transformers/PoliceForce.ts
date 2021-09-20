import {
  globeOutline,
  logoTwitter,
  callOutline,
  linkOutline,
  logoFacebook,
  logoYoutube,
} from "ionicons/icons";
import _ from "lodash";

type ContactType = "website" | "twitter" | "telephone";

function getEngagementMethodIcon(type: ContactType) {
  switch (type.toLowerCase()) {
    case "website":
      return globeOutline;
    case "twitter":
      return logoTwitter;
    case "facebook":
      return logoFacebook;
    case "youtube":
      return logoYoutube;
    case "telephone":
      return callOutline;
    default:
      return linkOutline;
  }
}

export function transformForceData(data: any) {
  let engagement_methods: any = [];

  if (data.telephone) {
    engagement_methods = [
      ...engagement_methods,
      {
        name: data.telephone,
        type: "telephone",
        icon: getEngagementMethodIcon("telephone"),
        url: `tel:${data.telephone}`,
      },
    ];
  }

  if (data.url) {
    engagement_methods = [
      ...engagement_methods,
      {
        name: "Website",
        type: "website",
        icon: getEngagementMethodIcon("website"),
        url: data.url,
      },
    ];
  }

  if (data.engagement_methods) {
    const methods = data.engagement_methods
      .filter((method: any) => {
        const type = method.type || method.title;
        return !type.toLowerCase().includes("website" || "telephone");
      })
      .map((method: any) => {
        const type = method.type || method.title;
        return {
          name: type.charAt(0).toUpperCase() + type.slice(1),
          type: type.toLowerCase(),
          icon: getEngagementMethodIcon(type),
          url: method.url,
        };
      });
    engagement_methods = [...engagement_methods, ...methods];
  }

  return {
    ...data,
    engagement_methods: _.uniqBy(engagement_methods, "type"),
  };
}
