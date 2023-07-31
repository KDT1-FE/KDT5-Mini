import preact from "preact";

declare global {
  namespace TSX {
    interface HTMLAttributes {
      styleName?: string;
    }

    interface SVGAttributes {
      styleName?: string;
    }
  }
}
