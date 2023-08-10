import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    headerColor: string;
    textColor: string;
    containerBoxColor: string;
    buttonColor: {
      empButton: string;
      managerButton: string;
      acceptButton: string;
      denyButton: string;
      pendingButton: string;
    };
    inputColor: {
      authColor: string;
    };
    borderColor: string;
    buttonTextColor: {
      empColor: string;
      adminColor: string;
    };
    hoverColor: string;
    inactiveColor: string;
    activeColor: string;
    pointColor: {
      blue: string;
      green: string;
      yellow: string;
      red: string;
      black: string;
      rightGray: string;
      gray: string;
    };
  }
}
