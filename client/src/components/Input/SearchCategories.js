import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import GTM from "constants/gtm-tags";
import qs from "query-string";
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
  color: #bdbdbd;
  white-space: nowrap;
  font-size: 1.6rem;
  &.selected {
    color: ${colors.royalBlue};
    background: #f3f4fe;
  }
  &:hover {
    color: ${colors.royalBlue};
  }
`;
class SearchCategories extends React.Component {
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

  setQueryKeyValue = (key, value) => {
    let query = qs.parse(this.props.history.location.search);
    if (!value) delete query[key];
    else query[key] = value;
    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: qs.stringify(query),
    });
  };

  resetSelectedValue() {
    this.setState({ selectedValue: null });
  }

  componentDidUpdate(prevProps) {
    if (this.props.showOptions !== prevProps.showOptions) {
      this.resetSelectedValue();
    }
  }

  onSelectItem(item) {
    this.setState({ selectedValue: item });
    this.setQueryKeyValue(
      "s_category",
      this.props.options.findIndex((option) => option.id == item?.id) || null,
    );
    this.props.onSearchSubmit(item?.id || null);
  }

  renderCategories() {
    const { isObject = false, displayValue, options, showOptions } = this.props;
    const { selectedValue } = this.state;
    if (showOptions && !selectedValue)
      this.setState({ selectedValue: options.find((o) => o.default) });
    return options.map((value, index) => (
      <Chip
        key={index}
        onClick={() => this.onSelectItem(value)}
        className={
          selectedValue && selectedValue.id == value.id ? "selected" : ""
        }
        id={
          GTM.search.prefix +
          GTM.search.category +
          GTM.search[value.id.toLowerCase()]
        }
      >
        {!isObject ? (value || "").toString() : value[displayValue]}
      </Chip>
    ));
  }

  renderTabsContainer() {
    const { style, id, showOptions } = this.props;
    return (
      <TabsContainer id={id || "SearchContainer"}>
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
  id: "",
};

export default withRouter(SearchCategories);
