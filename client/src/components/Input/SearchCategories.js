import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import GTM from "constants/gtm-tags";
import { setQueryKeyValue } from "components/Feed/utils";
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
    this.getCategoryFromQuery = this.getCategoryFromQuery.bind(this);
  }

  componentDidMount() {
    this.getCategoryFromQuery();
    const unlisten = this.props.history.listen((location) => {
      if (location.pathname === "/feed") {
        return this.getCategoryFromQuery();
      } else {
        return unlisten();
      }
    });
  }

  getCategoryFromQuery() {
    let query = qs.parse(this.props.history.location.search);
    this.setState({ selectedValue: this.props.options[query.s_category || 0] });
  }

  onSelectItem(item) {
    this.setState({ selectedValue: item });
    setQueryKeyValue(
      this.props.history,
      "s_category",
      this.props.options.findIndex((option) => option.id === item?.id) || null,
    );
    this.props.onSearchSubmit(item?.id || null);
  }

  renderCategories() {
    const { isObject = false, displayValue, options } = this.props;
    const { selectedValue } = this.state;
    return options.map((value) => (
      <Chip
        key={value.id}
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
        {this.props.t(
          !isObject ? (value || "").toString() : value[displayValue],
        )}
      </Chip>
    ));
  }

  renderTabsContainer() {
    const { id, showOptions } = this.props;
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
  id: "",
};

export default withRouter(SearchCategories);
