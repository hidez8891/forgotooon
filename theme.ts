import { COLOR } from "react-native-material-ui";

export const theme = {
  palette: {
    primaryColor: COLOR.green500,
    primaryLightColor: COLOR.green300,
    primaryDarkColor: COLOR.green800,
    accentColor: COLOR.red500,
    accentLightColor: COLOR.red300
  }
};

type ObjectProps<T> = { [P in keyof T]: T[P] };

export type ThemeTypes = ObjectProps<typeof theme>;
