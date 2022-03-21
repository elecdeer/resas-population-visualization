import {
  CheckBoxesGridContainer,
  CheckBoxesGridContainerProps,
} from "./CheckBoxesGridContainer";
import { CheckBox } from "../CheckBox/CheckBox";

export default {
  title: "ui/CheckBoxesGridContainer",
  component: CheckBoxesGridContainer,
};

export const Default = (args: CheckBoxesGridContainerProps) => (
  <CheckBoxesGridContainer {...args}>
    <CheckBox key={"box1"}>CheckBox1</CheckBox>
    <CheckBox key={"box2"}>CheckBox2</CheckBox>
    <CheckBox key={"box3"}>CheckBox3</CheckBox>
    <CheckBox key={"box4"}>CheckBox4</CheckBox>
    <CheckBox key={"box5"}>CheckBox5</CheckBox>
    <CheckBox key={"box6"}>CheckBox6</CheckBox>
    <CheckBox key={"box7"}>CheckBox7</CheckBox>
  </CheckBoxesGridContainer>
);
