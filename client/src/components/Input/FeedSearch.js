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
    margin: 0 .7rem 0 1.4rem;
`;

const SearchContainer = styled.span`
    position: relative;
    text-align: left;
    width: 100%;
    display: block;
    transition: 0.4s;
    @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
      margin-left: 3rem;
    }
    &.expanded  {
      input {
        width: calc(100% - 10rem);
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
            color: #BDBDBD;
        }
    }
`;
const SearchWrapper = styled.div`
    @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
      margin: 0 auto;
    }
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    &:focus-within, &:hover {
      border: 0.1rem solid black;
    }
    background: #fff;
    border-radius: 4rem;
    padding: 5px 0;
    height: 4rem;
    width: 30rem;
    position: relative;
    z-index: 3;
    transition: 0.4s;
`

export default class FeedNavSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      tooShort: false,
    };
    this.searchWrapper = React.createRef();
    this.searchBox = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.renderSearchContainer = this.renderSearchContainer.bind(this);
    this.listenerCallback = this.listenerCallback.bind(this);
    this.onKeyClick = this.onKeyClick.bind(this)
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
    const { inputValue } = this.state;
    if (e.key === "Enter") {
      if (inputValue?.length && inputValue.length < 3) {
        this.setState({ tooShort: true });
        return setTimeout(() => {
          this.setState({ tooShort: false });
        }, 500);
      }
      if (this.props.isMobile) return this.props.handleMobileSubmit(inputValue);
      this.props.handleSubmit(inputValue);
      
    }
  }

  closeClicked() {
    this.setState({
      inputValue: '',
    });
    this.searchBox.current.blur();
    this.props.handleClear()
  }

  renderSearchContainer() {
    const { inputValue, tooShort } = this.state;
    const { placeholder, style, id, hidePlaceholder, showOptions } = this.props;
    return (
      <SearchContainer className={`${inputValue?.length ? 'expanded' : ''} ${ tooShort ? 'error':''}`} id={id || 'SearchContainer'}>
        <SearchWrapper
          ref={this.searchWrapper}
        >
          <StyledIcon
            src={SearchSvg}
            onClick={() => {
              if (inputValue?.length && inputValue.length < 3) {
                this.setState({ tooShort: true });
                return setTimeout(() => {
                  this.setState({ tooShort: false });
                }, 500);
              }
              if (this.props.isMobile) return this.props.handleMobileSubmit(inputValue);
              this.props.handleSubmit(inputValue);
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
  id: '',
};