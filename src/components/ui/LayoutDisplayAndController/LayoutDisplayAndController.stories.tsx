import {
  LayoutDisplayAndController,
  LayoutDisplayAndControllerProps,
} from "./LayoutDisplayAndController";

export default {
  title: "ui/LayoutDisplayAndController",
  component: LayoutDisplayAndController,
};

export const Default = (args?: LayoutDisplayAndControllerProps) => (
  <LayoutDisplayAndController
    {...args}
    controller={<div style={{ background: "#ff9966" }}>Controller</div>}
    display={<div style={{ background: "#33ccff" }}>Display</div>}
  />
);
