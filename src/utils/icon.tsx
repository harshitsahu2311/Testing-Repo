import { Component, ReactNode } from "react";
import SVG from "../assets/svg";

interface IconProps {
  className?: string;
  src: string;
  width?: number;
  height?: number;
  color?: string;
}

class Icon extends Component<IconProps> {
  TYPE = {
    SVG: "svg",
  };

  renderInlineSvg(): ReactNode {
    const { className, src } = this.props;
    const cName = className || src;
    const InlineSVG = SVG[src];

    return InlineSVG ? (
      <span className={`flo__icon ${cName !== "" ? `${cName}` : ""}`}>
        <InlineSVG {...this.props} />
      </span>
    ) : null;
  }

  render(): ReactNode {
    return this.renderInlineSvg();
  }
}

export default Icon;
