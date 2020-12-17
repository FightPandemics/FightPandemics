import React, { useCallback, useRef, useState, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  InfiniteLoader,
  AutoSizer,
  WindowScroller,
  Table,
  defaultTableRowRenderer as TableRowRenderer,
  defaultTableHeaderRowRenderer as TableHeaderRenderer,
} from "react-virtualized";
import "react-virtualized/styles.css";
import { Card, Checkbox } from "antd-mobile";
import FilterTag from "components/Tag/FilterTag";
//Local
import Loader from "components/Feed/StyledLoader";
import PostActions from "./PostActions";
import { SCOPES } from "constants/permissions";
import CreateReport from "components/CreateReport/CreateReport";
import { theme, mq } from "constants/theme";

const { colors, typography } = theme;
const { darkGray } = colors;
const { medium } = typography.size;

const Posts = ({
  isAuthenticated,
  postDispatch,
  dispatchPostAction,
  filteredPosts,
  user,
  highlightWords,
  isNextPageLoading,
  loadNextPage,
  itemCount,
  isItemLoaded,
  hasNextPage,
  totalPostCount,
  page,
  changeType,
  activeTab,
  showContent,
  setShowContent,
}) => {
  const posts = Object.entries(filteredPosts);
  const data = useRef([]);
  const tableRef = React.createRef();
  const scrollIndex = useRef(0);
  const captureIndRef = useRef(0);
  const history = useHistory();
  const [flag, setFlag] = useState(false);
  const [callReport, setCallReport] = useState(false);
  const [forModerator, setForModerator] = useState({
    remove: false,
    keep: false,
  });
  const scrollToIndex = () => {
    if (history?.location?.state) {
      let { keepScrollIndex, keepScroll } = history.location.state;
      if (keepScroll) return keepScrollIndex;
    }
    return -1;
  };

  useLayoutEffect(() => {
    if (tableRef.current !== null) {
      tableRef.current.recomputeRowHeights(0);
    }
  }, [flag]);

  const loadMoreItems = isNextPageLoading
    ? () => {
        if (history?.location?.state) {
          const { keepScrollIndex, keepScroll } = history.location.state;
          if (keepScroll && scrollIndex.current < keepScrollIndex) {
            scrollIndex.current = keepScrollIndex;
          } else {
            history.location.state.keepScrollIndex = scrollIndex.current;
            history.location.state.keepScroll = false;
            history.location.state.keepPostsState = undefined;
            history.location.state.keepPageState = undefined;
          }
        }
      }
    : loadNextPage;

  const ReportCount = styled.div`
    font-size: 1.5rem;
    font-weight: bolder;
    color: black;
  `;
  const StyledCard = styled(Card.Body)`
    padding: 0.4rem 0.4rem 0.3rem !important;
    border-top: none !important;
  `;

  const StyledFilterTag = styled(FilterTag)`
    margin: 0.3rem !important;
  `;
  const StyledPostActions = styled.div`
    margin-bottom: 2rem;
    padding: 2rem 2rem 0rem 2rem;
    overflow-wrap: break-word;
    .social-icons {
      span {
        width: 1rem;
      }
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        span {
          width: 3rem;
        }
      }
      .social-icon {
        color: ${darkGray};
        cursor: pointer;

        .social-icon-svg {
          margin-right: 0.5rem;
          padding: 0.2rem 0 0.2rem 0;
        }

        span {
          font-size: ${medium};
        }
      }
    }
  `;

  const rowGetter = useCallback(
    ({ index }) => {
      if (posts.length > 0) {
        let j = 0;
        for (let i = 0; i < posts.length * 2; i++) {
          if (i !== 0 && i % 2 === 0) j++;
          const reportDate = posts[j][1].reportedBy[0].createdAt.slice(0, 10);
          const firstIndexOf = data.current
            .map((e) => e.id)
            .indexOf(posts[j][1]._id);
          const lastIndexOf = data.current
            .map((e) => e.id)
            .lastIndexOf(posts[j][1]._id);
          const rowData = {
            id: posts[j][1]._id,
            reportsCount: posts[j][1].reportsCount,
            reason: posts[j][1].reportedBy[0].reason,
            reportDate,
            content: posts[j][1].content,
            showContent: posts[j][1].showContent,
          };
          if (firstIndexOf < 0 || firstIndexOf === lastIndexOf) {
            data.current.push(rowData);
          } else {
            data.current[firstIndexOf] = rowData;
            data.current[lastIndexOf] = rowData;
          }
        }
      }
      return data.current[index];
    },
    [posts],
  );

  const rowStyleFormat = (row) => {
    if (row.index < 0) return;
    return {
      borderTop: "0.05rem solid rgba(0, 0, 0, 0.5)",
      borderLeft: "0.05rem solid rgba(0, 0, 0, 0.5)",
      borderRight: "0.05rem solid rgba(0, 0, 0, 0.5)",
      borderRadius: "0.2rem",
      whiteSpace: "unset",
    };
  };

  const handleShowContent = (data) => {
    setShowContent(data);
    setFlag(!flag);
  };

  function headerColumns() {
    return [
      <div
        className="ReactVirtualized__Table__headerColumnn"
        role="columnheader"
        style={{ overflow: "hidden", textAlign: "center", flex: "0 1 15px" }}
        aria-colIndex="1"
      ></div>,
      <div
        className="ReactVirtualized__Table__headerColumnn"
        role="columnheader"
        style={{ overflow: "hidden", textAlign: "center", flex: "0 1 80px" }}
        aria-colIndex="2"
      >
        <div key={0}># Reports</div>
      </div>,
      <div
        className="ReactVirtualized__Table__headerColumnn"
        role="columnheader"
        style={{ overflow: "hidden", textAlign: "center", flex: "0 1 225px" }}
        aria-colIndex="3"
      >
        <div key={0}>Reasons</div>
      </div>,
      <div
        className="ReactVirtualized__Table__headerColumnn"
        role="columnheader"
        style={{ overflow: "hidden", textAlign: "center", flex: "0 1 130px" }}
        aria-colIndex="5"
      >
        <div key={0}>Date</div>
      </div>,
      <div
        className="ReactVirtualized__Table__headerColumnn"
        role="columnheader"
        style={{ overflow: "hidden", textAlign: "center", flex: "0 1 100px" }}
        aria-colIndex="4"
      >
        <div key={0}>Actions</div>
      </div>,
      <div
        className="ReactVirtualized__Table__headerColumnn"
        role="columnheader"
        style={{ overflow: "hidden", textAlign: "center", flex: "0 1 140px" }}
        aria-colIndex="6"
      >
        <div key={0}>View Post</div>
      </div>,
      <div
        className="ReactVirtualized__Table__headerColumnn"
        role="columnheader"
        style={{ overflow: "hidden", textAlign: "center", flex: "0 1 110px" }}
        aria-colIndex="7"
      >
        <div key={0}>Details</div>
      </div>,
    ];
  }
  function columns(index, rowData) {
    return [
      <div
        className="ReactVirtualized__Table__rowColumn"
        role="gridcell"
        style={{ overflow: "hidden", flex: "0 1 40px" }}
        aria-colIndex="1"
        dataKey="checkBox"
        label="# Reports"
      >
        <div key={"checkBox"}>
          <Checkbox />
        </div>
      </div>,
      <div
        className="ReactVirtualized__Table__rowColumn"
        role="gridcell"
        style={{ overflow: "hidden", flex: "0 1 40px" }}
        aria-colIndex="2"
        dataKey="reportsCount"
        label="# Reports"
      >
        <div key={"reportsCount"}>
          <ReportCount>{data.current[index].reportsCount}</ReportCount>
        </div>
      </div>,
      <div
        className="ReactVirtualized__Table__rowColumn"
        role="gridcell"
        style={{ overflow: "hidden", flex: "0 1 225px", whiteSpace: "unset" }}
        aria-colIndex="3"
      >
        <StyledCard className="styled-card">
          {data.current[index].reason
            .replace(/[^|]*$/, "")
            .split("|")
            .filter((e) => e)
            .map((reason, idx) => (
              <StyledFilterTag
                className="styled-tag"
                key={idx}
                disabled={true}
                selected={false}
              >
                {reason}
              </StyledFilterTag>
            ))}
        </StyledCard>
      </div>,
      <div
        className="ReactVirtualized__Table__rowColumn"
        role="gridcell"
        style={{ overflow: "hidden", flex: "0 1 80px" }}
        aria-colIndex="4"
      >
        {data.current[index].reportDate}
      </div>,
      <div
        className="ReactVirtualized__Table__rowColumn"
        role="gridcell"
        style={{ overflow: "hidden", flex: "0 1 140px" }}
        aria-colIndex="5"
      >
        <StyledPostActions className="something">
          <PostActions
            setCallReport={setCallReport}
            setForModerator={setForModerator}
            isEnabled={
              activeTab === "PENDING" &&
              Boolean(user?.permissions & SCOPES.REPORT_WRITE)
            }
            canRestore={
              activeTab === "ACCEPTED" &&
              Boolean(user?.permissions & SCOPES.REPORT_WRITE)
            }
          />
        </StyledPostActions>
      </div>,
      <div
        className="ReactVirtualized__Table__rowColumn"
        role="gridcell"
        style={{ overflow: "hidden", flex: "0 1 100px" }}
        aria-colIndex="6"
      >
        <button onClick={() => handleShowContent(rowData)}>View Post</button>
      </div>,
      <div
        className="ReactVirtualized__Table__rowColumn"
        role="gridcell"
        style={{ overflow: "hidden", flex: "0 1 110px", textAlign: "center" }}
        aria-colIndex="7"
      >
        View Details
      </div>,
    ];
  }
  function singleColumn(index) {
    return [
      <div
        className="ReactVirtualized__Table__rowColumn"
        role="gridcell"
        style={{
          overflow: "hidden",
          flex: "0 1 1000px",
          whiteSpace: "pre-wrap",
        }}
        aria-colIndex="1"
      >
        {data.current[index].content}
      </div>,
    ];
  }

  function headerRenderer({ style }) {
    return (
      <TableHeaderRenderer
        className="ReactVirtualized__Table__headerRow"
        columns={headerColumns()}
        style={style}
      />
    );
  }

  function rowRenderer({ index, rowData, onRowMouseOver, style }) {
    return (
      <TableRowRenderer
        className="ReactVirtualized__Table__row"
        columns={
          rowData.showContent && index % 2 !== 0
            ? singleColumn(index)
            : columns(index, rowData)
        }
        index={index}
        key={index}
        style={style}
        onRowMouseOver={onRowMouseOver}
      />
    );
  }

  function rowHeight({ index }) {
    // console.log(data.current[index]);
    if (!data.current[index]?.showContent) {
      return index % 2 !== 0 ? 0 : 70;
    }
    return index % 2 !== 0 ? 280 : 70;
  }

  function renderReport() {
    console.log(captureIndRef.current);
    console.log(data.current[captureIndRef.current]);
    return (
      <CreateReport
        callReport={callReport}
        setCallReport={setCallReport}
        postId={data.current[captureIndRef.current].id}
        currentPost={posts[captureIndRef.current]}
        fromPage={true}
        forModerator={forModerator}
        changeType={changeType}
      />
    );
  }

  function captureIndex({ index }) {
    captureIndRef.current = index;
  }

  return (
    <div className="feed-posts">
      {posts.length === 0 ? (
        <Loader />
      ) : (
        <WindowScroller>
          {({ height, isScrolling, scrollTop, onChildScroll }) => (
            <InfiniteLoader
              isRowLoaded={isItemLoaded}
              loadMoreRows={loadMoreItems}
              rowCount={1000}
              threshold={5}
            >
              {({ onRowsRendered }) => (
                <AutoSizer disableHeight>
                  {({ width }) => {
                    return (
                      <>
                        <Table
                          ref={tableRef}
                          autoHeight
                          height={height}
                          width={width}
                          isScrolling={isScrolling}
                          onRowsRendered={onRowsRendered}
                          rowCount={posts.length}
                          rowHeight={rowHeight}
                          headerRowRenderer={headerRenderer}
                          scrollTop={scrollTop}
                          onScroll={onChildScroll}
                          overscanRowCount={1}
                          scrollToAlignment={"center"}
                          scrollToIndex={scrollToIndex()}
                          headerHeight={30}
                          rowGetter={rowGetter}
                          rowStyle={rowStyleFormat}
                          rowRenderer={rowRenderer}
                          onRowMouseOver={captureIndex}
                        />
                        {callReport ? renderReport() : null}
                      </>
                    );
                  }}
                </AutoSizer>
              )}
            </InfiniteLoader>
          )}
        </WindowScroller>
      )}
    </div>
  );
};

export default Posts;
