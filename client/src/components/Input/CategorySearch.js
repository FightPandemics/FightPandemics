import React from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import SvgIcon from "../Icon/SvgIcon";
import  SearchSvg from "../../assets/icons/search.svg";
import  CloseSvg from "../../assets/icons/close-btn.svg";
const { colors } = theme;

const StyledIcon = styled(SvgIcon)`
    line-height: 1.8rem;
    vertical-align: bottom;
    height: 100%;
    margin: 0 1.4rem;
`;

const CategorySelectContainer = styled.span`
    position: relative;
    text-align: left;
    width: 30rem;
    display: block;
    margin-bottom: 20px;
    transition: 0.4s;
    &.disable_ms: {
        pointer-events: none;
        opacity: 0.5;
    }
    &.expanded  {
      width: 40rem;
      input {
        width: calc(100% - 25rem );
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
            color: #BDBDBD
        }
    }
`;
const SearchWrapper = styled.div`
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 4rem;
    padding: 5px 0;
    height: 5rem;
    position: relative;
    z-index: 3;
`
const Chip = styled.span`
    padding: 2px 5px;
    margin: 0 10px;
    color: #425af2;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
    font-size: 1.5rem;
    white-space: nowrap;
    overflow: hidden;
    max-width: 13rem ;
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
    &.disableSelection {
        pointer-events: none;
        opacity: 0.5;
    }
`
const OptionListContainer = styled.div`
    position: absolute;
    width: 100%;
    background: #fff;
    border-radius: 4rem;
    margin-top: -2.5rem;
    &:before {
        pointer-events: none;
        top: -2.5rem;
        position:absolute;
        bottom:0; 
        width:100%; 
        height:80%; 
        content:''; 
        background: linear-gradient(#fff 0%, transparent 50%, transparent 100%);
        transform:scale(1.2);
    }
    z-index: 2;
    .displayBlock {
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
        box-shadow: 1px 1px 5px 0.1px rgba(0,0,0,0.25);
    }
    li:first-child {
        padding: 5px 0;
    }
    li {
        padding: 10px 10px;
        color: #425AF2;
        background: #fff;
        .keyword {
            padding-left: 20px;
            color: #BDBDBD;
           /* float: right;*/
        }
        &.highlight .option{
          background:  #425AF2;
          color: #F3F4FE;
        }
        .option {
            padding: 4px 10px;
            border-radius: 5px;
            background: #F3F4FE;
            margin-left: 15px;

        }
        &:not(:first-child):hover {
            cursor: pointer;
        }
        &:not(:first-child):hover{
            cursor: pointer;
        }
     /*   &:not(:first-child):hover .option {
            background:  #425AF2;
            color: #F3F4FE;
        }*/
        &.disableSelection {
            pointer-events: none;
            opacity: 0.5;
        }
    }
`
const CheckBox = styled.input`
    margin-right: 10px;
`
const ms = ``

export default class CategorySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      options: props.options,
      filteredOptions: props.options,
      unfilteredOptions: props.options,
      selectedValue: Object.assign([], props.selectedValue),
      preSelectedValue: Object.assign([], props.selectedValue),
      toggleOptionsList: false,
      highlightOption: props.avoidHighlightFirstOption ? -1 : 0,
			showCheckbox: props.showCheckbox,
    };
		this.searchWrapper = React.createRef();
		this.searchBox = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.rendercategorySelectContainer = this.rendercategorySelectContainer.bind(this);
    this.renderSelectedList = this.renderSelectedList.bind(this);
    this.onRemoveSelectedItem = this.onRemoveSelectedItem.bind(this);
    this.toggelOptionList = this.toggelOptionList.bind(this);
    this.onArrowKeyNavigation = this.onArrowKeyNavigation.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.filterOptionsByInput = this.filterOptionsByInput.bind(this);
    this.removeSelectedValueFromOptions = this.removeSelectedValueFromOptions.bind(this);
    this.isSelectedValue = this.isSelectedValue.bind(this);
    this.fadeOutSelection = this.fadeOutSelection.bind(this);
    this.renderNormalOption = this.renderNormalOption.bind(this);
    this.listenerCallback = this.listenerCallback.bind(this);
    this.resetSelectedValue = this.resetSelectedValue.bind(this);
    this.getSelectedItems = this.getSelectedItems.bind(this);
  }

  initialSetValue() {
    const { showCheckbox, singleSelect } = this.props;
		const { options } = this.state;
    if (!showCheckbox && !singleSelect) {
      this.removeSelectedValueFromOptions(false);
		}
  }

  resetSelectedValue() {
    const { unfilteredOptions } = this.state;
    this.setState({
      selectedValue: [],
      preSelectedValue: [],
      options: unfilteredOptions,
      filteredOptions: unfilteredOptions
    }, this.initialSetValue);
  }

  getSelectedItems() {
    return this.state.selectedValue;
  }

  componentDidMount() {
		this.initialSetValue();
    this.searchWrapper.current.addEventListener("click", this.listenerCallback);
  }

  componentDidUpdate(prevProps) {
    const { options, selectedValue } = this.props;
    const { options: prevOptions, selectedValue: prevSelectedvalue } = prevProps;
    if (JSON.stringify(prevOptions) !== JSON.stringify(options)) {
      this.setState({ options, filteredOptions: options, unfilteredOptions: options }, this.initialSetValue);
    }
    if (JSON.stringify(prevSelectedvalue) !== JSON.stringify(selectedValue)) {
      this.setState({ selectedValue: Object.assign([], selectedValue), preSelectedValue: Object.assign([], selectedValue) }, this.initialSetValue);
    }
  }

  listenerCallback() {
    this.searchBox.current.focus();
  }

  componentWillUnmount() {
    this.searchWrapper.current.removeEventListener('click', this.listenerCallback);
  }

  // Skipcheck flag - value will be true when the func called from on deselect anything.
  removeSelectedValueFromOptions(skipCheck) {
    const { isObject, displayValue } = this.props;
    const { selectedValue = [], unfilteredOptions, options } = this.state;
    if (!selectedValue.length && !skipCheck) {
      return;
    }
    if (isObject) {
      let optionList = unfilteredOptions.filter(item => {
        return selectedValue.findIndex(
          v => v[displayValue] === item[displayValue]
        ) === -1
          ? true
          : false;
      });
      this.setState(
        { options: optionList, filteredOptions: optionList },
        this.filterOptionsByInput
      );
      return;
    }
    let optionList = unfilteredOptions.filter(
      item => selectedValue.indexOf(item) === -1
    );

    this.setState(
      { options: optionList, filteredOptions: optionList },
      this.filterOptionsByInput
    );
  }

  onChange(event) {
    this.setState(
      { inputValue: event.target.value },
      this.filterOptionsByInput
    );
  }

  filterOptionsByInput() {
    let { options, filteredOptions, inputValue } = this.state;
    const { isObject, displayValue } = this.props;
    if (isObject) {
      options = filteredOptions.filter(i => this.matchValues(i[displayValue], inputValue))
    } else {
      options = filteredOptions.filter(i => this.matchValues(i, inputValue));
    }
    this.setState({ options });
  }

  matchValues(value, search) {
    if (this.props.caseSensitiveSearch) {
      return value.indexOf(search) > -1;
    }
    return value.toLowerCase().indexOf(search.toLowerCase()) > -1;
  }

  onArrowKeyNavigation(e) {
    const {
      options,
      highlightOption,
      toggleOptionsList,
      inputValue,
      selectedValue
    } = this.state;
    if (e.key === "Enter" && selectedValue[0] && inputValue.length != 0  ) return this.props.handleSubmit(selectedValue[0].id, inputValue)
    if (e.keyCode === 8 && !inputValue && selectedValue.length) {
    this.setState({toggleOptionsList: true});
      this.onRemoveSelectedItem(selectedValue.length - 1);
    }
    if (!options.length) {
      return;
    }
    if (e.keyCode === 38) {
      if (highlightOption > 0) {
        this.setState(previousState => ({
          highlightOption: previousState.highlightOption - 1
        }));
      } else {
        this.setState({ highlightOption: options.length - 1 });
      }
    } else if (e.keyCode === 40) {
      if (highlightOption < options.length - 1) {
        this.setState(previousState => ({
          highlightOption: previousState.highlightOption + 1
        }));
      } else {
        this.setState({ highlightOption: 0 });
      }
    } else if (e.key === "Enter" && options.length && toggleOptionsList) {
      if (highlightOption === -1) {
        return;
      }
      this.onSelectItem(options[highlightOption]);
    }
  }

  onRemoveSelectedItem(item) {
		let { selectedValue, index = 0, isObject } = this.state;
		const { onRemove, showCheckbox, displayValue } = this.props;
    if (isObject) {
      index = selectedValue.findIndex(
        i => i[displayValue] === item[displayValue]
      );
    } else {
      index = selectedValue.indexOf(item);
    }
		selectedValue.splice(index, 1);
		onRemove(selectedValue, item);
    this.setState({ selectedValue }, () => {
      if (!showCheckbox) {
				this.removeSelectedValueFromOptions(true);
      }
    });
  }

  onSelectItem(item) {
    const { selectedValue } = this.state;
    const { selectionLimit, onSelect, singleSelect, showCheckbox } = this.props;
    this.setState({
      inputValue: ''
    });
    if (singleSelect) {
      this.onSingleSelect(item);
      onSelect([item], item);
      return;
    }
    if (this.isSelectedValue(item)) {
      this.onRemoveSelectedItem(item);
      return;
    }
    if (selectionLimit == selectedValue.length) {
      return;
    }
		selectedValue.push(item);
		onSelect(selectedValue, item);
    this.setState({ selectedValue }, () => {
      if (!showCheckbox) {
				this.removeSelectedValueFromOptions(true);
      } else {
        this.filterOptionsByInput();
      }
    });
    if (!this.props.closeOnSelect) {
      this.searchBox.current.focus();
    }
  }

  onSingleSelect(item) {
    this.setState({ selectedValue: [item], toggleOptionsList: false });
    this.searchBox.current.focus()
  }

  isSelectedValue(item) {
    const { isObject, displayValue } = this.props;
    const { selectedValue } = this.state;
    if (isObject) {
      return (
        selectedValue.filter(i => i[displayValue] === item[displayValue])
          .length > 0
      );
    }
    return selectedValue.filter(i => i === item).length > 0;
  }

  closeClicked() {
    const { unfilteredOptions } = this.state;
    this.setState({
      inputValue: '', 
      selectedValue: [],
      preSelectedValue: [],
      options: unfilteredOptions,
      filteredOptions: unfilteredOptions
    });
    this.searchBox.current.blur();
    this.props.handleClear()
  }

  renderOptionList() {
    const { style } = this.props;
    const { options,unfilteredOptions, selectedValue } = this.state;
    if (options.length === 0 && !selectedValue[0]) {
      this.onSingleSelect(unfilteredOptions[0]);
      this.setState({options: unfilteredOptions});
    }
    return (
      <ul>
        <li></li>
        {this.renderNormalOption()}
      </ul>
    );
  }


  renderNormalOption() {
    const { isObject = false, displayValue, showCheckbox, style, singleSelect } = this.props;
    const { highlightOption } = this.state;
    return this.state.options.map((option, i) => (
      <li
		key={`option${i}`}
        className={`${
          highlightOption === i ? `highlight` : ""
        }`}
        onClick={() => this.onSelectItem(option)}
        onMouseEnter={()=>this.setState({highlightOption: i})}
      >
        {showCheckbox && !singleSelect && (
          <CheckBox
            type="checkbox"
            readOnly
            checked={this.isSelectedValue(option)}
          />
          
        )}
        <span class={'option'}>{isObject ? option[displayValue] : (option || '').toString()}</span>
        <span class={'keyword'}>Keywords</span>
      </li>
    ));
  }

  renderSelectedList() {
    const { isObject = false, displayValue, style, singleSelect } = this.props;
    const { selectedValue } = this.state;
    return selectedValue.map((value, index) => (
      <Chip key={index} ref={this.chip} >
        {!isObject ? (value || '').toString() : value[displayValue]}
      </Chip>
    ));
  }

  fadeOutSelection(item) {
    const { selectionLimit, showCheckbox, singleSelect } = this.props;
    if (singleSelect) {
      return;
    }
    const { selectedValue } = this.state;
    if (selectionLimit == -1) {
      return false;
    }
    if (selectionLimit != selectedValue.length) {
      return false;
    }
    if (selectionLimit == selectedValue.length) {
      if (!showCheckbox) {
        return true;
      } else {
        if (this.isSelectedValue(item)) {
          return false;
        }
        return true;
      }
    }
  }

  toggelOptionList(newVal) {
    const { selectedValue } = this.state;
    if (selectedValue[0]) return this.setState({toggleOptionsList: false})
    else this.setState({
      toggleOptionsList: newVal,
      highlightOption: this.props.avoidHighlightFirstOption ? -1 : 0
    });
  }

  rendercategorySelectContainer() {
    const { inputValue, toggleOptionsList, selectedValue } = this.state;
    const { placeholder, style, singleSelect, id, hidePlaceholder, disable} = this.props;
    return (
      <CategorySelectContainer className={`${disable ? `disable_ms` : ''} ${selectedValue[0]? 'expanded':''}`} id={id || 'categorySelectContainerReact'}>
        <SearchWrapper 
          ref={this.searchWrapper} 
        >
          <StyledIcon
          src={SearchSvg}
          onClick={() => {
            if (!selectedValue[0]) return this.setState({toggleOptionsList: true})
            if (inputValue.length == 0) return 
            this.props.handleSubmit(selectedValue[0].id,inputValue);
          }}
          />
          {this.renderSelectedList()}
          <input
            type="text"
            ref={this.searchBox}
            id={`${id || 'search'}_input`}
            onChange={this.onChange}
            value={inputValue}
            onFocus={this.toggelOptionList}
            onBlur={() => setTimeout(this.toggelOptionList, 200)}
            placeholder={((singleSelect && selectedValue.length) || (hidePlaceholder && selectedValue.length)) ? '' : placeholder}
            onKeyDown={this.onArrowKeyNavigation}
            autoComplete="off"
          />
          {selectedValue[0] && <StyledIcon
          src={CloseSvg}
          style={{filter: "invert(100%)",float: "right"}}
          onClick={() => {this.closeClicked()}}
          />}
        </SearchWrapper>
        <OptionListContainer
          className={`${toggleOptionsList ? 'displayBlock' : 'displayNone'}`}
        >
          {this.renderOptionList()}
        </OptionListContainer>
      </CategorySelectContainer>
    );
  }

  render() {
    return this.rendercategorySelectContainer();
  }
}

CategorySearch.defaultProps = {
  options: [],
  disablePreselectedValue: false,
  selectedValue: [],
  isObject: true,
  displayValue: "name",
  showCheckbox: false,
  selectionLimit: 1,
  placeholder: "Search",
	style: {},
	onSelect: () => {},
  onRemove: () => {},
  singleSelect: true,
  caseSensitiveSearch: false,
  id: '',
  closeOnSelect: true,
  avoidHighlightFirstOption: true,
  hidePlaceholder: false
};