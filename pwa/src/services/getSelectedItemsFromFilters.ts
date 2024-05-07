export const getSelectedItemsFromFilters = (dataSet: any[], currentFilter?: any[]): any => {
  return currentFilter?.map((cF) => dataSet.find((d) => d.value === cF));
};


export const getSelectedItemsFromFiltersMultiSelect = (dataSet: any[], currentFilter?: any[]): any => {
  return currentFilter?.map((cF) => {
    if (!dataSet.find((d) => d.value === cF)) return { label: cF, value: cF };
    return dataSet.find((d) => d.value === cF);
  });
};

export const getSelectedItemFromFilters = (dataSet: any[], currentFilter?: string): any => {
  return dataSet.find((d) => d.value === currentFilter);
};
