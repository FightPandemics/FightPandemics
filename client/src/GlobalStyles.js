import { createGlobalStyle } from "styled-components";
import { WHITE, SELAGO } from "./constants/colors";

const globalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
}

::-webkit-scrollbar{
  width: 5px;
  background-color: ${WHITE};
}

::-webkit-scrollbar-thumb{
  width: 5px;
  background-color: grey;
}

html {
  font-size: 62.5%;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: ${WHITE};
  font-family: "Poppins", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

a {
  text-decoration: none;
  color: inherit;
}

.text-center {
  text-align: center !important;
}



.app-drawer .am-drawer-sidebar {
  background-color: $white;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.app-drawer .am-drawer-sidebar .am-list {
  width: 200px;
  padding: 0;
}

.text-light {
  font-weight: 500;
}

.nav-item {
  padding: 5px 10px;

  > a,
  > a.nav-link {
    color: #000 !important;
    display: inline;
    padding: 0;
  }

  .active {
    color: $royal-blue;
  }
}

.btn-light {
  border: 1px solid #ddd;
}

.ant-select-dropdown {
  font-family: Work Sans;
  font-size: 11px;

  .ant-select-item-option-content {
    font-weight: normal;
  }

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: ${SELAGO};
  }
}

`;

export default globalStyles;
