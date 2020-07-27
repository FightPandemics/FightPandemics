import React from "react";
import { Modal } from "antd-mobile";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import Heading from "components/Typography/Heading";

export const ShareModal = ({
  showShareModal,
  setShowShareModal,
  postTitle,
  postContent,
  id,
}) => {
  const ICON_SIZE_PIXEL = "50";
  const postUrl = `${window.location.origin}/post/${id}`;
  return (
    <Modal
      onClose={() => setShowShareModal(false)}
      maskClosable={true}
      closable={true}
      visible={showShareModal}
      transparent
    >
      <Heading level={4} className="h4">
        Share via...
      </Heading>

      <div>
        <EmailShareButton url={postUrl} title={postTitle} body={postContent}>
          <EmailIcon size={ICON_SIZE_PIXEL} round />
        </EmailShareButton>
        <FacebookShareButton url={postUrl} hashtag={"#fightpandemics"}>
          <FacebookIcon size={ICON_SIZE_PIXEL} round />
        </FacebookShareButton>
        <LinkedinShareButton url={postUrl} title={postTitle}>
          <LinkedinIcon size={ICON_SIZE_PIXEL} round />
        </LinkedinShareButton>
        <RedditShareButton url={postUrl} title={postTitle}>
          <RedditIcon size={ICON_SIZE_PIXEL} round />
        </RedditShareButton>
        <TelegramShareButton url={postUrl} title={postTitle}>
          <TelegramIcon size={ICON_SIZE_PIXEL} round />
        </TelegramShareButton>
        <TwitterShareButton
          url={postUrl}
          title={postTitle}
          hashtags={["fightpandemics"]}
        >
          <TwitterIcon size={ICON_SIZE_PIXEL} round />
        </TwitterShareButton>
        <WhatsappShareButton title={postTitle} url={postUrl}>
          <WhatsappIcon size={ICON_SIZE_PIXEL} round />
        </WhatsappShareButton>
        <div>
          <input
            onFocus={(e) => e.target.select()}
            type="text"
            value={postUrl}
            readOnly
          />
        </div>
      </div>
    </Modal>
  );
};
