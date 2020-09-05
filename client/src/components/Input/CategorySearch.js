import React from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import SvgIcon from "../Icon/SvgIcon";
import SearchSvg from "../../assets/icons/search.svg";
import CloseSvg from "../../assets/icons/close-btn.svg";
const { colors } = theme;

const StyledIcon = styled(SvgIcon)`
    line-height: 1.8rem;
    vertical-align: bottom;
    height: 100%;
    margin: 0 1.4rem;
`;

const SearchContainer = styled.span`
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      margin-top: 2rem;
    }
    position: relative;
    text-align: left;
    width: 100%;
    display: block;
    margin-bottom: 20px;
    transition: 0.4s;
    &.expanded  {
      input {
        width: calc(100% - 10rem);
      }
    }
    input {
        height: 100%;
        border: none;
        font-size: 1.8rem;
        background: transparent;
        width: calc(100% - 5rem);
        &:focus {
            outline: none;
        }
        &::placeholder {
            color: #BDBDBD;
        }
    }
`;
const SearchWrapper = styled.div`
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      margin: 0 auto;
    }
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 4rem;
    padding: 5px 0;
    height: 5rem;
    width: 30rem;
    position: relative;
    z-index: 3;
`
const Chip = styled.a`
    padding: 1rem 3rem;
    display: inline-block;
    color: #BDBDBD;
    white-space: nowrap;
    font-size: 1.6rem;
    &.selected {
      color: #425AF2;
      background: #F3F4FE;
    }
    &:hover {
      color: #425AF2;
    }
`
export default class CategorySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      options: props.options,
      selectedValue: null,
      showOptions: props.showOptions,
    };
    this.searchWrapper = React.createRef();
    this.searchBox = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.renderSearchContainer = this.renderSearchContainer.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.listenerCallback = this.listenerCallback.bind(this);
    this.resetSelectedValue = this.resetSelectedValue.bind(this);
    this.onKeyClick = this.onKeyClick.bind(this)
  }



  resetSelectedValue() {
    this.setState({ selectedValue: null });
  }

  componentDidMount() {
    this.searchWrapper.current.addEventListener("click", this.listenerCallback);
  }

  listenerCallback() {
    this.searchBox.current.focus();
  }

  componentWillUnmount() {
    this.searchWrapper.current.removeEventListener('click', this.listenerCallback);
  }

  onChange(event) {
    this.setState({ inputValue: event.target.value });
  }


  onKeyClick(e) {
    const { inputValue, selectedValue
    } = this.state;
    if (e.key === "Enter" && inputValue.length != 0) return this.props.handleSubmit((selectedValue?.id || null), inputValue)

  }

  onSelectItem(item) {
    const { selectedValue, inputValue } = this.state;
    this.setState({ selectedValue: item });
    if(inputValue.length) this.props.handleSubmit((item?.id || null), inputValue);
  }


  closeClicked() {
    const { unfilteredOptions } = this.state;
    this.setState({
      inputValue: '',
      selectedValue: null,
      options: unfilteredOptions,
      filteredOptions: unfilteredOptions
    });
    this.searchBox.current.blur();
    this.props.handleClear()
  }


  renderCategories() {
    const { isObject = false, displayValue, options, showOptions } = this.props;
    const { selectedValue } = this.state;
    if (showOptions && !selectedValue) this.setState({ selectedValue: options.find(o => o.default) })
    return options.map((value, index) => (
      <Chip key={index}
        onClick={() => this.onSelectItem(value)}
        className={selectedValue && selectedValue.id == value.id ? 'selected' : ''}
      >
        {!isObject ? (value || '').toString() : value[displayValue]}
      </Chip>
    ));
  }



  renderSearchContainer() {
    const { inputValue, selectedValue } = this.state;
    const { placeholder, style, id, hidePlaceholder, showOptions } = this.props;
    return (
      <SearchContainer className={`${inputValue.length ? 'expanded' : ''}`} id={id || 'SearchContainer'}>
        <SearchWrapper
          ref={this.searchWrapper}
        >
          <StyledIcon
            src={SearchSvg}
            onClick={() => {
              if (inputValue.length == 0) return
              this.props.handleSubmit((selectedValue?.id || null), inputValue);
            }}
          />
          <input
            type="text"
            ref={this.searchBox}
            id={`${id || 'search'}_input`}
            onChange={this.onChange}
            value={inputValue}
            placeholder={hidePlaceholder ? '' : placeholder}
            onKeyDown={this.onKeyClick}
            autoComplete="off"
          />
          {inputValue && <StyledIcon
            src={CloseSvg}
            style={{ filter: "invert(100%)", float: "right" }}
            onClick={() => { this.closeClicked() }}
          />}
        </SearchWrapper>
        <br></br>
        {showOptions && this.renderCategories()}
      </SearchContainer>
    );
  }

  render() {
    return this.renderSearchContainer();
  }
}

CategorySearch.defaultProps = {
  options: [],
  selectedValue: null,
  showOptions: false,
  isObject: true,
  displayValue: "name",
  selectionLimit: 1,
  placeholder: "Search",
  hidePlaceholder: false,
  style: {},
  id: '',
};