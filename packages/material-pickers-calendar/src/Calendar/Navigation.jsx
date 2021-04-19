import React from "react";
import PropTypes from "prop-types";
import { getUserLocale } from "get-user-locale";

import {
  getCenturyLabel,
  getDecadeLabel,
  getBeginNext,
  getBeginNext2,
  getBeginPrevious,
  getBeginPrevious2,
  getEndPrevious,
  getEndPrevious2,
} from "../shared/dates";
import {
  formatMonthYear as defaultFormatMonthYear,
  formatYear as defaultFormatYear,
} from "../shared/dateFormatter";
import { isView, isViews } from "../shared/propTypes";

import {
  ButtonNavigateBefore,
  Spacer,
  PeriodButton,
  CalendarHeader,
  CalendarControls,
  ActionsContainer,
} from "./styled-components.js";
import IconNavigateBefore from "./IconNavigateBefore";
import IconNavigateNext from "./IconNavigateNext";
import IconArrowDropDown from "./IconArrowDropDown";

export default function Navigation({
  activeStartDate,
  drillUp,
  formatMonthYear = defaultFormatMonthYear,
  formatYear = defaultFormatYear,
  locale,
  maxDate,
  minDate,
  navigationAriaLabel = "",
  navigationLabel,
  next2AriaLabel = "",
  next2Label = "»",
  nextAriaLabel = "",
  nextLabel = "›",
  prev2AriaLabel = "",
  prev2Label = "«",
  prevAriaLabel = "",
  prevLabel = "‹",
  setActiveStartDate,
  showDoubleView,
  view,
  views,
}) {
  const drillUpAvailable = views.indexOf(view) > 0;
  const shouldShowPrevNext2Buttons = view !== "century";

  const previousActiveStartDate = getBeginPrevious(view, activeStartDate);
  const previousActiveStartDate2 =
    shouldShowPrevNext2Buttons && getBeginPrevious2(view, activeStartDate);
  const nextActiveStartDate = getBeginNext(view, activeStartDate);
  const nextActiveStartDate2 =
    shouldShowPrevNext2Buttons && getBeginNext2(view, activeStartDate);

  const prevButtonDisabled = (() => {
    if (previousActiveStartDate.getFullYear() < 0) {
      return true;
    }
    const previousActiveEndDate = getEndPrevious(view, activeStartDate);
    return minDate && minDate >= previousActiveEndDate;
  })();

  const prev2ButtonDisabled =
    shouldShowPrevNext2Buttons &&
    (() => {
      if (previousActiveStartDate2.getFullYear() < 0) {
        return true;
      }
      const previousActiveEndDate = getEndPrevious2(view, activeStartDate);
      return minDate && minDate >= previousActiveEndDate;
    })();

  const nextButtonDisabled = maxDate && maxDate <= nextActiveStartDate;

  const next2ButtonDisabled =
    shouldShowPrevNext2Buttons && maxDate && maxDate <= nextActiveStartDate2;

  function onClickPrevious() {
    setActiveStartDate(previousActiveStartDate);
  }

  function onClickPrevious2() {
    setActiveStartDate(previousActiveStartDate2);
  }

  function onClickNext() {
    setActiveStartDate(nextActiveStartDate);
  }

  function onClickNext2() {
    setActiveStartDate(nextActiveStartDate2);
  }

  function renderLabel(date) {
    const label = (() => {
      switch (view) {
        case "century":
          return getCenturyLabel(locale, formatYear, date);
        case "decade":
          return getDecadeLabel(locale, formatYear, date);
        case "year":
          return formatYear(locale, date);
        case "month":
          return formatMonthYear(locale, date);
        default:
          throw new Error(`Invalid view: ${view}.`);
      }
    })();

    return navigationLabel
      ? navigationLabel({
          date,
          label,
          locale: locale || getUserLocale(),
          view,
        })
      : label;
  }

  function renderButton() {
    return (
      <PeriodButton
        aria-label={navigationAriaLabel}
        disabled={!drillUpAvailable}
        onClick={drillUp}
        type="button"
      >
        <span>{renderLabel(activeStartDate)}</span>

        {showDoubleView && (
          <>
            <span> – </span>
            <span>{renderLabel(nextActiveStartDate)}</span>
          </>
        )}

        <IconArrowDropDown color="rgba(0,0,0,.54)" />
      </PeriodButton>
    );
  }

  return (
    <CalendarHeader>
      <CalendarControls>
        {renderButton()}

        <Spacer />

        <ActionsContainer>
          {prevLabel !== null && (
            <ButtonNavigateBefore
              aria-label={prevAriaLabel}
              disabled={prevButtonDisabled}
              onClick={onClickPrevious}
              type="button"
            >
              <IconNavigateBefore color="rgba(0,0,0,.54)" />
            </ButtonNavigateBefore>
          )}

          {nextLabel !== null && (
            <ButtonNavigateBefore
              aria-label={nextAriaLabel}
              disabled={nextButtonDisabled}
              onClick={onClickNext}
              type="button"
            >
              <IconNavigateNext color="rgba(0,0,0,.54)" />
            </ButtonNavigateBefore>
          )}
        </ActionsContainer>
      </CalendarControls>
    </CalendarHeader>
  );
}

Navigation.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  drillUp: PropTypes.func.isRequired,
  formatMonthYear: PropTypes.func,
  formatYear: PropTypes.func,
  locale: PropTypes.string,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  navigationAriaLabel: PropTypes.string,
  navigationLabel: PropTypes.func,
  next2AriaLabel: PropTypes.string,
  next2Label: PropTypes.node,
  nextAriaLabel: PropTypes.string,
  nextLabel: PropTypes.node,
  prev2AriaLabel: PropTypes.string,
  prev2Label: PropTypes.node,
  prevAriaLabel: PropTypes.string,
  prevLabel: PropTypes.node,
  setActiveStartDate: PropTypes.func.isRequired,
  showDoubleView: PropTypes.bool,
  view: isView.isRequired,
  views: isViews.isRequired,
};
