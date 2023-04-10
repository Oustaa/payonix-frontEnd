import styled from "styled-components";

export const StyledAlert = styled.div`
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 300;
  width: 500px;
  max-width: calc(100% - var(--spacing-lg));
  height: max-content;
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
