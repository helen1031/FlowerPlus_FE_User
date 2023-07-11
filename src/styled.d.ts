// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    headerColor: string;
    textColor: string;
    accentColor: string;
    disableColor: string;
    btnColor: string;
  }
}
