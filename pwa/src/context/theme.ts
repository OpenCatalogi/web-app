import * as React from "react";


export interface IThemesContext {
 

  current: string;

}

export const baseThemesContext = {
  current: "",

} as IThemesContext;

export const ThemesContextContext = React.createContext<[IThemesContext, (_: IThemesContext) => void]>([baseThemesContext, () => null]);

export const ThemesContextProvider = ThemesContextContext.Provider;
