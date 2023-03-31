import React from "react";

import { StyledTr, StyledTd } from "../../styles/styled-table";

import styled from "styled-components";

const StyledImage = styled.img`
  width: 100px;
  aspect-ratio: 1 / 0.8;
  object-fit: cover;
`;

const TableRow = ({ data, fields }) => {
  const src =
    "https://content.la-z-boy.com/Images/product/category/tables/large/090_1065.jpg";

  const displayedValues = fields.map((field, i) => {
    console.log(field.value, data[field.value]);
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
    else if (data[field.value] !== null && data[field.value] !== undefined)
      return <StyledTd key={i}>{data[field.value]}</StyledTd>;
    else if (field.default)
      return <StyledTd key={i}>{field.defaultValue}</StyledTd>;
    else if (field.checked)
      return <StyledTd key={i}>{field.check(data, i)}</StyledTd>;
    else return <StyledTd key={i}>none</StyledTd>;
  });

  return (
    <>
      <StyledTr>{displayedValues}</StyledTr>
    </>
  );
};

export default TableRow;
