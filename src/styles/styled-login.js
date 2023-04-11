import styled from "styled-components";

export const StyledLogInContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLogIn = styled.div`
  padding: var(--spacing-xxl) var(--spacing-lg);
  width: calc(100% - var(--spacing-lg));
  max-width: 500px;
  background-color: var(--white);
  // height: 300px;
  border-radius: var(--radius-lg);
`;

export const StyledLogInHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  img {
    width: 130px;
  }
  // h2 {
  //   color: var(--primary-cyan-800);
  // }
`;

export const StyledLogInForm = styled.form`
  margin-block-start: var(--spacing-xl);
`;
