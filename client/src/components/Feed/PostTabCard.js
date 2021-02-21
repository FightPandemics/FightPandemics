import React from "react";
import { Tabs } from 'antd-mobile';
import { Button } from 'antd';
import { formatDate } from './utils'
import PostDropdownButton from "components/Feed/PostDropdownButton"
import {
  StyledPostTabCard,
  StyledCardHeader,
  StyledCardBody,
  StyledUpdateAt,
  StyledTitlePostCard,
  StyledDescription,
  LineBreak,
  Container,
  StyledCardFooter,
  StyledDropDown
} from "./StyledPostTabCard"

const CONTENT_LENGTH = 56;


//Display the content of a tab with a list of posts limited by number of maxPosts
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

// Display the content of a single PostTabCard (mobile version)
// cardContents is an array of tab object, each object has a title of the tab, and an array of posts
// maxPosts define number of posts display default to be 3.
const PostTabCard = ({ cardContents, maxPosts = 3 }) => {
  const tabs = cardContents.map((item) => ({ title: item.title }))
  return (
    <Container>
      <Tabs tabs={tabs}
        initialPage={1}
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