import React from "react";
import { Tabs } from 'antd-mobile';
import { Button } from 'antd';
import styled from "styled-components";
import { theme } from "constants/theme";
import PostDropdownButton from "components/Feed/PostDropdownButton"

const { colors, typography } = theme;
const { xxsmall, xsmall, medium } = typography.size;

const CONTENT_LENGTH = 56;

const StyledPostTabCard = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
`;

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const StyledCardBody = styled.div`
  border-top: unset;
  padding: 0 1.8rem;
  margin-top: 0.7rem;
  font-family: "Work Sans";
  white-space: pre-line;
  font-weight: 400;
  width: 100%;
`

const StyledUpdateAt = styled.p`
  font-size: ${xxsmall};
  line-height: 1.4rem;
  color: #939393;
  margin: 0.8rem 0 0 0;
`

const StyledTitlePostCard = styled.h5`
  font-weight: 700;
  line-height: 1.72rem;
  font-size: ${medium};
  margin: 0.4rem 0 0.6rem 0;
`

const StyledDescription = styled.p`
  font-size: ${xsmall};
  line-height: 1.68rem;
  letter-spacing: -0.03rem;  
  margin-top: 0;
`

const LineBreak = styled.div`
  border-bottom: 0.1rem solid ${colors.lightGray};
  margin-bottom: 0.9rem;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.2);
  border-radius: 12px;
  overflow: hidden;

  div.am-tabs-default-bar-tab-active[aria-selected] {
    color: #282828;
    font-weight: 700;
  }

  div.am-tabs-default-bar-tab {
    color: #939393;
    font-weight: 400;
  }

  div.am-tabs-default-bar-underline {
    border: 1px #282828 solid;
  }
`

const StyledCardFooter = styled.a`
  font-size: ${medium};
  line-height: 2.1rem;
  background-color: white;
  align-self: stretch;
  text-align: center;
  padding: 0.2rem 0 0 0.9rem;
  margin: 0;
`

const StyledDropDown = styled.div`
  .card-submenu {
    flex: 0 0 auto;
    margin-left: 3rem;
    cursor: pointer;
  }

  svg {
    circle {
      fill: ${theme.colors.mediumGray};
    }
    transform: scale(0.5);
  }
`

const formatDate = function (dateString) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const date = new Date(dateString);
  const dateStr = date.getDate();
  const monthStr = monthNames[date.getMonth()];
  const yearStr = date.getFullYear();
  return `${monthStr} ${dateStr}, ${yearStr}`
}

const PostContent = ({ posts, user, maxPosts }) => {
  const content = posts.slice(0, maxPosts).map((post) => {
    let finalContent = post.content;
    if (finalContent.length > CONTENT_LENGTH) {
      finalContent = `${finalContent.substring(0, CONTENT_LENGTH)}...`;
    }

    return (
      <div key={post.id}>
        <StyledCardHeader>
          <StyledUpdateAt>{formatDate(post.updatedAt)}</StyledUpdateAt>
          <StyledDropDown className='card-submenu'>
            <PostDropdownButton
              post={post}
              user={user}
              postId={post.id}
            />
          </StyledDropDown>
        </StyledCardHeader>
        <StyledTitlePostCard>
          {post.title}
        </StyledTitlePostCard>
        <StyledDescription>
          {finalContent}
        </StyledDescription>
        <LineBreak />
      </div>
    )
  })

  return (
    <StyledPostTabCard>
      <StyledCardBody>{content}</StyledCardBody>
    </StyledPostTabCard>
  )
}

const PostTabCard = ({ cardContents, maxPosts = 3 }) => {
  const tabs = cardContents.map((item) => ({ title: item.title }))
  return (
    <Container>
      <Tabs tabs={tabs}
        initialPage={1}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        {
          cardContents.map((tab) => (
            <PostContent posts={tab.posts} maxPosts={maxPosts} />
          ))
        }
      </Tabs>
      <StyledCardFooter>
        <Button type="link">
          See All
        </Button>
      </StyledCardFooter>
    </Container>
  )
}

export default PostTabCard;