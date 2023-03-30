import React from "react";

import { StyledTr, StyledTd } from "../../styles/table";

import styled from "styled-components";

const StyledImage = styled.img`
  width: 100px;
  aspect-ratio: 1 / 0.8;
  object-fit: cover;
`;

const TableRow = ({ data, fields }) => {
  const src =
    "https://images.unsplash.com/photo-1679678691328-54929d271c3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

  const displayedValues = fields.map((field, i) => {
    if (field.type === "image")
      return (
        <StyledTd key={i} className="image">
          <StyledImage src={src} />
        </StyledTd>
      );
    else if (field.type === "date")
      return (
        <StyledTd key={i}>
          {new Date(data[field.value]).toDateString()}
        </StyledTd>
      );
    else if (data[field.value] !== null)
      return <StyledTd key={i}>{data[field.value]}</StyledTd>;
    else if (field.default)
      return <StyledTd key={i}>{field.defaultValue}</StyledTd>;
    else return <StyledTd key={i}>none</StyledTd>;
  });

  return (
    <>
      <StyledTr>{displayedValues}</StyledTr>
    </>
  );
};

export default TableRow;
