export const getCommongroundRating = (rating: number): string => {
  switch (rating) {
    case 0:
      return "N.V.T";
    case 1:
      return "Bronze";
    case 2:
      return "Silver";
    case 3:
      return "Gold";
    default:
      return "N.V.T";
  }
};
