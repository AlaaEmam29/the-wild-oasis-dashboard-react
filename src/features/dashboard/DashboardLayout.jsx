import { styled } from "styled-components";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(auto, 1fr));

  column-gap: 2rem;
  row-gap: 3rem;
`;
export default function DashboardLayout({ children }) {
  return <StyledDashboardLayout>{children}</StyledDashboardLayout>;
}
