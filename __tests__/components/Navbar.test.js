/**
 * @jest-environment jsdom
 */
 import { Navbar } from "../../components/Navbar";
 import { render } from "@testing-library/react";
 
 describe("Navbar component", () => {
   let wrapper
 
   beforeEach(() => {
     wrapper = render(<Navbar />);
   });
 
   it("renders successfully", () => {
     expect(wrapper).toMatchSnapshot();
   });
 });