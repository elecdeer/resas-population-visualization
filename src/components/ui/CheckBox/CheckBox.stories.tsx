import { CheckBox, CheckBoxProps } from "./CheckBox";

export default {
  title: "ui/CheckBox",
  component: CheckBox,
};

export const Default = (args: CheckBoxProps) => <CheckBox {...args} />;

export const Labeled = (args: CheckBoxProps) => (
  <CheckBox {...args} defaultChecked={true}>
    Label
  </CheckBox>
);
