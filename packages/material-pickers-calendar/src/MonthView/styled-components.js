import styled from "@emotion/styled";

export const Weekday = styled.div`
  color: rgba(0, 0, 0, 0.38);
  padding: 0 0 8px 0;
`;

export const WeekdayDivider = styled.div`
  text-align: center;
  padding: 0 0 8px 0;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -8px;
    right: -8px;
    height: 1px;
    background: rgba(0, 0, 0, 0.12);
  }
`;

export const AbbrTitle = styled.abbr`
  &[title] {
    border-bottom: none;
    cursor: inherit;
    text-decoration: none;
    text-align: center;
    padding: 0 0 8px 0;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 400;
  }
`;
