import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: var(--radius-sm);
  padding: ${({ padding }) => (padding ? padding : "var(--spacing-sm)")}
    var(--spacing-lg);
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};
  color: ${({ color }) => (color ? color : "inherit")};
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${({ inline }) => (!inline ? "column" : "row")};

  margin-bottom: var(--spacing-sm);

  label {
    width: ${({ inline }) => (!inline ? "100%" : "30%")};
    min-width: ${({ inline }) => (!inline ? "100%" : "fit-content")};
    margin-right: ${({ inline }) => (!inline ? "" : "var(--spacing-sm)")};
    color: var(--primary-dark-700);
    text-transform: capitalize;
  }

  input {
    background-color: var(--primary-dark-400);
    border: none;
    border-radius: var(--radius-sm);
    padding: var(--spacing-xsm);
    color: var(--white);
    width: ${({ inline }) => (!inline ? "100%" : "70%")};

    &::-webkit-input-placeholder {
      color: var(--primary-dark-100);
    }

    &::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  }
  &.invalid {
    label {
      color: red;
    }
    input {
      border: 1px solid red;
      background-color: #ff000029;
      color: var(--primary-dark-800);
    }
    p {
      display: inline;
      text-align: left;
      font-size: 0.87rem;
      color: red;
    }
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: var(--spacing-ms);
`;

export const StyledTableAlert = styled.span`
  background-color: var(--${({ type }) => (type ? type : "danger")});
  color: var(--white);
  padding: var(--spacing-sm) var(--spacing-xl);
  border-radius: var(--radius-lg);
`;

export const StyledForm = styled.form`
  padding-block: var(--spacing-sm);

  p.message {
    padding-block-end: var(--spacing-sm);
    color: var(--success);
    &.error {
      color: var(--danger);
    }
  }
`;
