export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Concept":
      return "active";
    case "Development":
      return "warning";
    case "Beta":
      return "neutral";
    case "Bruikbaar":
      return "safe";
    case "Stable":
      return "safe";
    case "Obsolete":
      return "danger";
    case "Onbekend":
    case "":
      return "invalid";
    default:
      return "";
  }
};

export const getStatusDiagramColor = (status: string): string => {
  switch (status) {
    case "Concept":
      return "#12239e";
    case "Development":
      return "#db9600";
    case "Beta":
      return "#0077b8";
    case "Bruikbaar":
      return "#11a23f";
    case "Stable":
      return "#11a23f";
    case "Obsolete":
      return "#ce4c3b";
    case "Onbekend":
    case "":
      return "#000000";
    default:
      return "";
  }
};
