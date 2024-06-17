import "styled-components";
import { defaultTheme } from "../styles/themes/default";

declare module "styled-components" {
  type Theme = typeof defaultTheme;
  export interface DefaultTheme extends Theme {}
}
