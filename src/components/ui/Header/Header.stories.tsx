import { Header, HeaderProps } from "./Header";

export default {
  title: "ui/Header",
  component: Header,
};

export const Default = (args: HeaderProps) => (
  <Header {...args} pageTitle={"Title"} />
);
