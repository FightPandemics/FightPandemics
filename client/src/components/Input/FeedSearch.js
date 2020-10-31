import React from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import SvgIcon from "../Icon/SvgIcon";
import SearchSvg from "../../assets/icons/search.svg";
import CloseSvg from "../../assets/icons/close-btn.svg";
import InputError from "./InputError";
import GTM from "constants/gtm-tags";
const { colors } = theme;

const MIN_KEYWORD_CHARS = 2;

const StyledIcon = styled(SvgIcon)`
  line-height: 1.8rem;
  vertical-align: bottom;
  height: 100%;
  margin: 0 0.7rem 0 1.4rem;
`;

const SearchContainer = styled.span`
  position: relative;
  text-align: left;
  width: 100%;
  display: block;
  transition: 0.4s;
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    margin-left: 8.5rem;
  }
  &.expanded {
    input {
      width: calc(100% - 10rem);
    }
  }
  &.mobile-shrink {
    input {
      width: calc(100% - 17rem);
    }
  }
  &.error {
    input {
      color: #ff5c57;
    }
  }
  input {
    height: 100%;
    border: none;
    font-size: 1.6rem;
    background: transparent;
    width: calc(100% - 5rem);
    color: black;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #bdbdbd;
    }
  }
`;
const SearchWrapper = styled.div`
  border: 0.1rem solid rgba(0, 0, 0, 0.2);
  &:focus-within,
  &:hover {
    border: 0.1rem solid black;
  }
  background: #fff;
  border-radius: 4rem;
  padding: 5px 0;
  height: 4rem;
  width: 30rem;
  position: relative;
  z-index: 1;
  transition: 0.4s;
  img:last-child {
    transition: opacity 2s ease-out;
    opacity: 1;
  }
  @media screen and (max-width: ${mq.desktop.small.minWidth}) {
    width: 5.4rem;
    img:last-child {
      position: absolute;
      display: none;
      opacity: 0;
    }
    &:active,
    &:focus-within {
      width: 30rem;
      img:last-child {
        top: 0;
        display: initial;
        opacity: 1;
      }
    }
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    width: 30rem;
    margin: 0 auto;
    img:last-child {
      position: relative;
      display: initial;
      opacity: 1;
    }
  }
`;
const Chip = styled.span`
  padding: 2px 5px;
  margin: 0 10px 0 0;
  color: ${colors.royalBlue};
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  max-width: 13rem;
  text-overflow: ellipsis;
  .singleChip {
    background: none;
    border-radius: none;
    color: inherit;
    white-space: nowrap;
    i {
      display: none;
    }
  }
`;
const OptionListContainer = styled.div`
  position: absolute;
  width: calc(30rem - 2px);
  top: 2.2rem;
  left: 50%;
  transform: translate(-50%, 0);
  background: #fff;
  border-radius: 4rem;
  z-index: 0;
  &.displayBlock {
    display: block;
  }
  &.displayNone {
    display: none;
  }
  ul {
    display: block;
    padding: 0;
    margin: 0;
    border-radius: 0.5rem;
    max-height: 250px;
    overflow-y: auto;
    box-shadow: 1px 1px 5px 0.1px rgba(0, 0, 0, 0.25);
  }
  li {
    padding: 10px 10px;
    color: ${colors.royalBlue};
    background: #fff;
    cursor: pointer;
    display: block;
    &:after {
      content: "";
    }
    span:last-child {
      padding-left: 20px;
      color: #bdbdbd;
    }
    span:first-child {
      padding: 4px 10px;
      border-radius: 5px;
      background: #f3f4fe;
      margin-left: 15px;
    }
  }
  li:first-child {
    padding: 10px;
  }
  li:last-child {
    padding-bottom: 15px;
  }
`;
const StyledInputError = styled(InputError)`
  position: absolute;
  width: 30rem;
  text-align: center;
  margin-top: 2px;
`;
const MobileInputError = styled.p`
  width: 100%;
  text-align: center;
  color: red;
  margin-top: 0.5rem;
`;
const Overlay = styled.div`
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.5;
  z-index: -2;
  transition: 0.7s;
`;
export default class FeedNavSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      tooShort: false,
      options: props.options,
      filteredOptions: props.options,
      unfilteredOptions: props.options,
      selectedValue: Object.assign([], props.selectedValue),
      toggleOptionsList: false,
      mobileReselect: false,
    };
    this.searchWrapper = React.createRef();
    this.searchBox = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.renderSearchContainer = this.renderSearchContainer.bind(this);
    this.listenerCallback = this.listenerCallback.bind(this);
    this.onKeyClick = this.onKeyClick.bind(this);
    this.renderSelectedList = this.renderSelectedList.bind(this);
    this.toggleOptionList = this.toggleOptionList.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.filterOptionsByInput = this.filterOptionsByInput.bind(this);
    this.renderNormalOption = this.renderNormalOption.bind(this);
    this.resetSelectedValue = this.resetSelectedValue.bind(this);
  }

  componentDidMount() {
    this.searchWrapper.current.addEventListener("click", this.listenerCallback);
  }

  listenerCallback() {
    this.searchBox.current.focus();
  }

  componentWillUnmount() {
    this.searchWrapper.current.removeEventListener(
      "click",
      this.listenerCallback,
    );
  }

  onChange(event) {
    const { isMobile } = this.props;
    const { tooShort } = this.state;
    this.setState({ inputValue: event.target.value }, () => {
      if (isMobile) this.filterOptionsByInput();
    });
    if (
      tooShort &&
      (event.target.value.length >= MIN_KEYWORD_CHARS ||
        !event.target.value.length)
    )
      this.setState({ tooShort: false });
  }

  submitSearch() {
    const { inputValue, selectedValue } = this.state;
    const { isMobile } = this.props;
    this.setState({ toggleOptionsList: false });
    if (!inputValue || (isMobile && !selectedValue[0])) return;
    if (inputValue.length < MIN_KEYWORD_CHARS) {
      return this.setState({ tooShort: true });
    }
    if (isMobile)
      return this.props.handleMobileSubmit(inputValue, selectedValue[0].id);
    if (!isMobile) this.props.handleSubmit(inputValue);
  }

  onKeyClick(e) {
    const { inputValue, selectedValue } = this.state;
    if (e.key === "Enter") {
      this.submitSearch();
    }
    if (e.keyCode === 8 && !inputValue && selectedValue.length) {
      this.setState({ toggleOptionsList: true });
      this.resetSelectedValue();
    }
  }

  closeClicked() {
    this.setState({
      inputValue: "",
    });
    this.resetSelectedValue();
    this.setState({ tooShort: false });
    this.searchBox.current.blur();
    this.props.handleClear();
  }

  filterOptionsByInput() {
    let { options, inputValue } = this.state;
    const { isObject, displayValue } = this.props;
    if (isObject) {
      options = options.filter((i) =>
        this.matchValues(i[displayValue], inputValue),
      );
    } else {
      options = options.filter((i) => this.matchValues(i, inputValue));
    }
    this.setState({ options });
  }

  resetSelectedValue() {
    const { unfilteredOptions } = this.state;
    this.setState(
      {
        selectedValue: [],
        options: unfilteredOptions,
        filteredOptions: unfilteredOptions,
        hidePlaceholder: false,
      },
      this.initialSetValue,
    );
  }

  matchValues(value, search) {
    return value.toLowerCase().startsWith(search.toLowerCase());
  }

  renderNormalOption() {
    const { isObject = true, displayValue } = this.props;
    const getGTMId = (option) => {
      return (
        GTM.search.prefix +
        GTM.search.category +
        GTM.search[option.id.toLowerCase()]
      );
    };
    return this.state.options.map((option, i) => (
      <li
        key={`option${i}`}
        onClick={() => this.onSelectItem(option)}
        id={getGTMId(option)}
      >
        <span id={getGTMId(option)}>
          {isObject ? option[displayValue] : (option || "").toString()}
        </span>
        <span id={getGTMId(option)}>
          {this.props.t("feed.search.keywords")}
        </span>
      </li>
    ));
  }

  renderOptionList() {
    const {
      options,
      unfilteredOptions,
      selectedValue,
      inputValue,
      displayValue,
    } = this.state;
    if (options.length === 0 && !selectedValue[0]) {
      this.onSelectItem(unfilteredOptions[0]);
      this.setState({ options: unfilteredOptions, inputValue });
    } else if (options.length === 1 && !selectedValue[0]) {
      this.onSelectItem(options[0]);
    }
    return (
      <ul>
        <li></li>
        {this.renderNormalOption()}
      </ul>
    );
  }

  toggleOptionList(newVal) {
    const { selectedValue, mobileReselect } = this.state;
    if (mobileReselect) return;
    if (selectedValue[0]) return this.setState({ toggleOptionsList: false });
    else this.setState({ toggleOptionsList: newVal });
  }

  onSelectItem(item) {
    const { mobileReselect } = this.state;
    this.setState(
      {
        inputValue: this.state.mobileReselect ? this.state.inputValue : "",
        selectedValue: [item],
        toggleOptionsList: false,
        hidePlaceholder: true,
        mobileReselect: false,
      },
      () => {
        if (mobileReselect) return this.submitSearch();
      },
    );
    if (this.searchBox.current != document.activeElement)
      this.searchBox.current.focus();
  }

  mobileRepick() {
    this.setState({
      toggleOptionsList: true,
      filteredOptions: this.state.unfilteredOptions,
      options: this.state.unfilteredOptions,
      mobileReselect: true,
    });
  }

  renderSelectedList() {
    const { isObject = true, displayValue } = this.props;
    const { selectedValue } = this.state;
    return selectedValue.map((value, index) => (
      <Chip key={index} ref={this.chip} onClick={() => this.mobileRepick()}>
        {!isObject
          ? (value || "").toString()
          : value["mobile_display"]
          ? value["mobile_display"]
          : value[displayValue]}
      </Chip>
    ));
  }

  renderSearchContainer() {
    const {
      inputValue,
      tooShort,
      toggleOptionsList,
      selectedValue,
      hidePlaceholder = false,
    } = this.state;
    const { placeholder, id, isMobile } = this.props;
    return (
      <SearchContainer
        className={`${inputValue?.length ? "expanded" : ""} ${
          tooShort ? "error" : ""
        } ${isMobile && selectedValue[0] ? "mobile-shrink" : ""}`}
        id={id || "SearchContainer"}
      >
        {isMobile && toggleOptionsList && <Overlay id={"overlay"} />}
        <SearchWrapper ref={this.searchWrapper}>
          <StyledIcon
            src={SearchSvg}
            onClick={() => {
              this.submitSearch();
            }}
          />
          {isMobile && this.renderSelectedList()}
          <input
            type="text"
            ref={this.searchBox}
            id={`${id || "search"}_input`}
            onChange={this.onChange}
            value={inputValue}
            placeholder={hidePlaceholder ? "" : placeholder}
            onKeyDown={this.onKeyClick}
            autoComplete="off"
            onFocus={() => this.props.isMobile && this.toggleOptionList(true)}
            onBlur={() =>
              this.props.isMobile &&
              setTimeout(() => this.toggleOptionList(false), 100)
            }
            id={GTM.search.prefix + GTM.search.input}
          />
          {(inputValue || selectedValue[0]) && (
            <StyledIcon
              src={CloseSvg}
              style={{ filter: "invert(100%)", float: "right" }}
              onClick={() => {
                this.closeClicked();
              }}
            />
          )}
        </SearchWrapper>
        {isMobile && (
          <OptionListContainer
            className={`${toggleOptionsList ? "displayBlock" : "displayNone"}`}
          >
            {this.renderOptionList()}
          </OptionListContainer>
        )}
        {!isMobile && tooShort && (
          <StyledInputError>
            {this.props.t("feed.search.error", { length: MIN_KEYWORD_CHARS })}
          </StyledInputError>
        )}
        {isMobile && tooShort && (
          <MobileInputError>
            {this.props.t("feed.search.error", { length: MIN_KEYWORD_CHARS })}
          </MobileInputError>
        )}
      </SearchContainer>
    );
  }

  render() {
    return this.renderSearchContainer();
  }
}

FeedNavSearch.defaultProps = {
  placeholder: "Search",
  hidePlaceholder: false,
  style: {},
  id: "",
};
