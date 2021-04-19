import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import makeEventProps from "make-event-props";
import mergeClassNames from "merge-class-names";
import Calendar from "material-pickers-calendar";
import Fit from "react-fit";

import DateInput from "react-date-picker/dist/DateInput";

import { isMaxDate, isMinDate } from "./shared/propTypes";

const baseClassName = "react-daterange-picker";
const outsideActionEvents = ["mousedown", "focusin", "touchstart"];
const allViews = ["century", "decade", "year", "month"];

export default class DateRangePicker extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isOpen !== prevState.isOpenProps) {
      return {
        isOpen: nextProps.isOpen,
        isOpenProps: nextProps.isOpen,
      };
    }

    return null;
  }

  state = {};

  componentDidMount() {
    this.handleOutsideActionListeners();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.state;
    const { onCalendarClose, onCalendarOpen } = this.props;

    if (isOpen !== prevState.isOpen) {
      this.handleOutsideActionListeners();
      const callback = isOpen ? onCalendarOpen : onCalendarClose;
      if (callback) callback();
    }
  }

  componentWillUnmount() {
    this.handleOutsideActionListeners(false);
  }

  get eventProps() {
    return makeEventProps(this.props);
  }

  onOutsideAction = (event) => {
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      this.closeCalendar();
    }
  };

  // eslint-disable-next-line react/destructuring-assignment
  onChange = (value, closeCalendar = this.props.closeCalendar) => {
    const { onChange } = this.props;

    if (closeCalendar) {
      this.closeCalendar();
    }

    if (onChange) {
      onChange(value);
    }
  };

  onChangeFrom = (valueFrom, closeCalendar) => {
    const { value } = this.props;
    const [, valueTo] = [].concat(value);
    this.onChange([valueFrom, valueTo], closeCalendar);
  };

  onChangeTo = (valueTo, closeCalendar) => {
    const { value } = this.props;
    const [valueFrom] = [].concat(value);
    this.onChange([valueFrom, valueTo], closeCalendar);
  };

  onFocus = (event) => {
    const { disabled, onFocus } = this.props;

    if (onFocus) {
      onFocus(event);
    }

    // Internet Explorer still fires onFocus on disabled elements
    if (disabled) {
      return;
    }

    this.openCalendar();
  };

  openCalendar = () => {
    this.setState({ isOpen: true });
  };

  closeCalendar = () => {
    this.setState((prevState) => {
      if (!prevState.isOpen) {
        return null;
      }

      return { isOpen: false };
    });
  };

  toggleCalendar = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  stopPropagation = (event) => event.stopPropagation();

  clear = () => this.onChange(null);

  handleOutsideActionListeners(shouldListen) {
    const { isOpen } = this.state;

    const shouldListenWithFallback =
      typeof shouldListen !== "undefined" ? shouldListen : isOpen;
    const fnName = shouldListenWithFallback
      ? "addEventListener"
      : "removeEventListener";
    outsideActionEvents.forEach((eventName) =>
      document[fnName](eventName, this.onOutsideAction)
    );
  }

  renderInputs() {
    const {
      autoFocus,
      calendarAriaLabel,
      calendarIcon,
      clearAriaLabel,
      clearIcon,
      dayAriaLabel,
      dayPlaceholder,
      disableCalendar,
      disabled,
      format,
      locale,
      maxDate,
      maxDetail,
      minDate,
      monthAriaLabel,
      monthPlaceholder,
      name,
      nativeInputAriaLabel,
      rangeDivider,
      required,
      showLeadingZeros,
      value,
      yearAriaLabel,
      yearPlaceholder,
    } = this.props;
    const { isOpen } = this.state;

    const [valueFrom, valueTo] = [].concat(value);

    const ariaLabelProps = {
      dayAriaLabel,
      monthAriaLabel,
      nativeInputAriaLabel,
      yearAriaLabel,
    };

    const placeholderProps = {
      dayPlaceholder,
      monthPlaceholder,
      yearPlaceholder,
    };

    const commonProps = {
      ...ariaLabelProps,
      ...placeholderProps,
      className: `${baseClassName}__inputGroup`,
      disabled,
      format,
      isCalendarOpen: isOpen,
      locale,
      maxDate,
      maxDetail,
      minDate,
      required,
      showLeadingZeros,
    };

    return (
      <div className={`${baseClassName}__wrapper`}>
        <div className="inputsWrapper">
          <DateInput
            {...commonProps}
            autoFocus={autoFocus}
            name={`${name}_from`}
            onChange={this.onChangeFrom}
            returnValue="start"
            value={valueFrom}
          />

          <span className={`${baseClassName}__range-divider`}>
            {rangeDivider}
          </span>

          <DateInput
            {...commonProps}
            name={`${name}_to`}
            onChange={this.onChangeTo}
            returnValue="end"
            value={valueTo}
          />
        </div>

        <div>
          {clearIcon !== null && (
            <button
              aria-label={clearAriaLabel}
              className={`${baseClassName}__clear-button ${baseClassName}__button`}
              disabled={disabled}
              onClick={this.clear}
              onFocus={this.stopPropagation}
              type="button"
            >
              {clearIcon}
            </button>
          )}

          {calendarIcon !== null && !disableCalendar && (
            <button
              aria-label={calendarAriaLabel}
              className={`${baseClassName}__calendar-button ${baseClassName}__button`}
              disabled={disabled}
              onBlur={this.resetValue}
              onClick={this.toggleCalendar}
              onFocus={this.stopPropagation}
              type="button"
            >
              {calendarIcon}
            </button>
          )}
        </div>
      </div>
    );
  }

  renderCalendar() {
    const { disableCalendar } = this.props;
    const { isOpen } = this.state;

    if (isOpen === null || disableCalendar) {
      return null;
    }

    const {
      calendarClassName,
      className: datePickerClassName, // Unused, here to exclude it from calendarProps
      onChange,
      value,
      ...calendarProps
    } = this.props;

    const className = `${baseClassName}__calendar`;

    return (
      <Fit>
        <div
          className={mergeClassNames(
            className,
            `${className}--${isOpen ? "open" : "closed"}`
          )}
        >
          <Calendar
            className={calendarClassName}
            onChange={this.onChange}
            selectRange
            value={value || null}
            {...calendarProps}
          />
        </div>
      </Fit>
    );
  }

  render() {
    const { className, disabled } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        className={mergeClassNames(
          baseClassName,
          `${baseClassName}--${isOpen ? "open" : "closed"}`,
          `${baseClassName}--${disabled ? "disabled" : "enabled"}`,
          className
        )}
        {...this.eventProps}
        onFocus={this.onFocus}
        ref={(ref) => {
          if (!ref) {
            return;
          }

          this.wrapper = ref;
        }}
      >
        {this.renderInputs()}
        {this.renderCalendar()}
      </div>
    );
  }
}

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 19,
  height: 19,
  viewBox: "0 0 19 19",
  stroke: "black",
  strokeWidth: 2,
};

const CalendarIcon = (
  <svg
    fill="none"
    height={24}
    viewBox="0 0 24 25"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    className={`${baseClassName}__calendar-button__icon ${baseClassName}__button__icon`}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.45455 3.72192C6.45455 3.44578 6.23069 3.22192 5.95455 3.22192C5.6784 3.22192 5.45455 3.44578 5.45455 3.72192V5.67647H3.5C3.22386 5.67647 3 5.90033 3 6.17647V9.22192V10.2219V20.9037C3 21.1799 3.22386 21.4037 3.5 21.4037H19.8636C20.1398 21.4037 20.3636 21.1799 20.3636 20.9037V6.17647C20.3636 5.90033 20.1398 5.67647 19.8636 5.67647H17.0909V3.72192C17.0909 3.44578 16.8671 3.22192 16.5909 3.22192C16.3148 3.22192 16.0909 3.44578 16.0909 3.72192V5.67647H6.45455V3.72192ZM4 20.4037V10.2219H19.3636V20.4037H4ZM19.3636 6.67647V9.22192H4V6.67647H19.3636Z"
      fill="#000000"
    />
  </svg>
);

const ClearIcon = (
  <svg
    {...iconProps}
    className={`${baseClassName}__clear-button__icon ${baseClassName}__button__icon`}
  >
    <line x1="4" x2="15" y1="4" y2="15" />
    <line x1="15" x2="4" y1="4" y2="15" />
  </svg>
);

DateRangePicker.defaultProps = {
  calendarIcon: CalendarIcon,
  clearIcon: ClearIcon,
  closeCalendar: true,
  isOpen: null,
  name: "daterange",
  rangeDivider: "–",
};

const isValue = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.instanceOf(Date),
]);

DateRangePicker.propTypes = {
  autoFocus: PropTypes.bool,
  calendarAriaLabel: PropTypes.string,
  calendarClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  calendarIcon: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  clearAriaLabel: PropTypes.string,
  clearIcon: PropTypes.node,
  closeCalendar: PropTypes.bool,
  dayAriaLabel: PropTypes.string,
  dayPlaceholder: PropTypes.string,
  disableCalendar: PropTypes.bool,
  disabled: PropTypes.bool,
  format: PropTypes.string,
  isOpen: PropTypes.bool,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  maxDetail: PropTypes.oneOf(allViews),
  minDate: isMinDate,
  monthAriaLabel: PropTypes.string,
  monthPlaceholder: PropTypes.string,
  name: PropTypes.string,
  nativeInputAriaLabel: PropTypes.string,
  onCalendarClose: PropTypes.func,
  onCalendarOpen: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  rangeDivider: PropTypes.node,
  required: PropTypes.bool,
  returnValue: PropTypes.oneOf(["start", "end", "range"]),
  showLeadingZeros: PropTypes.bool,
  value: PropTypes.oneOfType([isValue, PropTypes.arrayOf(isValue)]),
  yearAriaLabel: PropTypes.string,
  yearPlaceholder: PropTypes.string,
};
