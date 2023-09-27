export const getStatusColor = (status: string) => {
  switch (status) {
    case "Concept":
      return "warning";
    case "Development":
      return "warning";
    case "Beta":
      return "warning";
    case "Bruikbaar":
      return "safe";
    case "Stable":
      return "safe";
    case "Obsolete":
      return "danger";
    default:
      return;
  }
};
