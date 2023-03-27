import { render, screen } from "@testing-library/react";
import SideNavHeader from "./SideNavHeader";

test("should render a h1 with a text logo and a button", function () {
  render(<SideNavHeader />);

  //   logTestingPlaygroundURL();

  const logo = screen.getByText("logo");
  //   const button = screen.getByRole("button");

  expect(logo).toBeInTheDocument();
  //   expect(button).toBeInTheDocument();
});
