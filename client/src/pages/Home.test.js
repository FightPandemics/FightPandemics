import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import DataTestIds from "utils/constants";
import { WithMockTrans } from "utils/testUtils";
import Home from "./Home";

describe("<Home />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <WithMockTrans>
        <Home />
      </WithMockTrans>,
      { wrapper: MemoryRouter },
    );
  });

  it("Render basic view", () => {
    expect(wrapper.getByTestId(DataTestIds.HOME_HEAD_LINE).textContent).toBe(
      "headline",
    );
    expect(
      wrapper.getByTestId(DataTestIds.HOME_NEED_HELP_BUTTON).textContent,
    ).toBe("common.getHelp");
    expect(
      wrapper.getByTestId(DataTestIds.HOME_GIVE_HELP_BUTTON).textContent,
    ).toBe("common.giveHelp");
    expect(
      wrapper.getByTestId(DataTestIds.HOME_VIEW_FEED_LINK).textContent,
    ).toBe("common.viewFeed");
    expect(
      wrapper.getByTestId(DataTestIds.HOME_VIEW_FEED_LINK).getAttribute("href"),
    ).toBe("/feed");
  });
});
