import { PageWithHeader, PageWithHeaderProps } from "./PageWithHeader";
import { Header } from "../Header/Header";

export default {
  title: "ui/PageWithHeader",
  component: PageWithHeader,
};

export const Default = (args: PageWithHeaderProps) => (
  <PageWithHeader {...args} header={<Header pageTitle={"title"} />}>
    <div>
      <p>This is Content</p>
    </div>
  </PageWithHeader>
);
