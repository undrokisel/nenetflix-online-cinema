import styled from "styled-components";
import { Table, Thead, Tbody } from "react-super-responsive-table";
import { Color } from "ui";

export const StyledTable = styled(Table)`
  width: 100%;
  border: none;
  margin-bottom: 20px;
  border-collapse: separate;
`;

export const StyledThead = styled(Thead)`
  & th {
    font-weight: bold;
    text-align: left;
    border: none;
    padding: 10px 15px;
    font-size: 14px;
    border-top: 1px solid #ddd;
    color: ${Color.White};
    background: ${Color.Graphite};
  }

  & tr th:first-child,
  & tr td:first-child {
    border-left: 1px solid #ddd;
  }

  & tr th:last-child,
  & tr td:last-child {
    border-right: 1px solid #ddd;
  }

  & tr th:first-child {
    border-radius: 20px 0 0 0;
  }

  & tr th:last-child {
    border-radius: 0 20px 0 0;
  }
`;

export const StyledTbody = styled(Tbody)`
  & td {
    text-align: left;
    border: none;
    padding: 10px 15px;
    font-size: 14px;
    vertical-align: top;
    color: ${Color.White};
  }

  & tr {
    background: ${Color.Secondary};
  }

  & tr:last-child td {
    border-bottom: 1px solid #ddd;
  }

  & tr:last-child td:first-child {
    border-radius: 0 0 0 20px;
  }

  & tr:last-child td:last-child {
    border-radius: 0 0 20px 0;
  }
`;
