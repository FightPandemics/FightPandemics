import React, { useEffect } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
const { colors } = theme;



const TabsContainer = styled.span`
    position: relative;
    text-align: left;
    display: inline-block;
    margin: 1rem 0;
    transition: 0.4s;
`;

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
export default class SearchCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      selectedValue: null,
      showOptions: props.showOptions,
    };
    this.renderTabsContainer = this.renderTabsContainer.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.resetSelectedValue = this.resetSelectedValue.bind(this);
  }


  resetSelectedValue() {
    this.setState({ selectedValue: null });
  }

  componentDidUpdate(prevProps) {
    if (this.props.showOptions !== prevProps.showOptions) {
      this.resetSelectedValue()
    }
  }

  onSelectItem(item) {
    this.setState({ selectedValue: item });
    this.props.handleSubmit((item?.id || null));
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

  renderTabsContainer() {
    const { style, id, showOptions } = this.props;
    return (
        <TabsContainer id={id || 'SearchContainer'}>
          {showOptions && this.renderCategories()}
        </TabsContainer>
    );
  }

  render() {
    return this.renderTabsContainer();
  }
}

SearchCategories.defaultProps = {
  options: [],
  selectedValue: null,
  showOptions: false,
  isObject: true,
  displayValue: "name",
  selectionLimit: 1,
  style: {},
  id: '',
};