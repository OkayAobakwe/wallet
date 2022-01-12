/**
 * @jest-environment jsdom
 */
 import { Transactions } from "../../components/Transactions";
 import { render } from "@testing-library/react";
 
 describe("Transactions Component", () => {
   let wrapper
 
   beforeEach(() => {
     wrapper = render(<Transactions />);
   });
 
   it("renders successfully", () => {
     expect(wrapper).toMatchSnapshot();
   });
 });