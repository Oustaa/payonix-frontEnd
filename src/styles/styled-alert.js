import styled from "styled-components";

export const StyledAlertContainer = styled.div`
  position: absolute;
  inset: 0 0 0 0;
  background-color: #3a3a3a4a;
  z-index: 1000;
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;

export const StyledAlert = styled.div`
  width: 500px;
  max-width: calc(100% - var(--spacing-lg));
  height: 500px;
  min-height: max-content;
  background-color: var(--white);
  border-radius: var(--radius-sm);
  padding: var(--spacing-lg);
`;

export const StyledAlertHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--primary-dark-800);
`;
