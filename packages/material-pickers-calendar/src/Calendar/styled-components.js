import styled from "@emotion/styled";

const ButtonBase = styled.button`
  color: hotpink;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: transparent;
  outline: none;
  border: none;
  margin: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  color: inherit;
  font-family: Roboto, Helvetica Neue, sans-serif;
`;

export const CalendarHeader = styled.div`
  padding: 8px 8px 0 8px;
`;

export const CalendarControls = styled.div`
  display: flex;
  align-items: center;
  margin: 5% calc(33% / 7 - 16px);
`;

export const PeriodButton = styled(ButtonBase)`
  font-size: 14px;
  font-weight: 500;
`;

export const ButtonNavigateBefore = styled(ButtonBase)`
  padding: 0;
  min-width: 0;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  line-height: 40px;
`;

export const Spacer = styled.div`
  flex: 1 1 auto;
`;
