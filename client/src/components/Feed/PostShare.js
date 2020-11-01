import React, { useContext } from "react";
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
import { useTranslation } from "react-i18next";
import { WebSocketContext } from "context/WebsocketContext";

import Heading from "components/Typography/Heading";

export const ShareModal = ({
  showShareModal,
  setShowShareModal,
  postTitle,
  postContent,
  id,
}) => {
  const { t } = useTranslation();
  const { postShared } = useContext(WebSocketContext);
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
        {t("post.shareVia")}
      </Heading>

      <div>
        <EmailShareButton
          url={postUrl}
          subject={postTitle}
          body={postContent}
          onShareWindowClose={() => postShared(id, "email")}
        >
          <EmailIcon size={ICON_SIZE_PIXEL} round />
        </EmailShareButton>
        <FacebookShareButton
          url={postUrl}
          hashtag={"#fightpandemics"}
          onShareWindowClose={() => postShared(id, "facebook")}
        >
          <FacebookIcon size={ICON_SIZE_PIXEL} round />
        </FacebookShareButton>
        <LinkedinShareButton
          url={postUrl}
          title={postTitle}
          onShareWindowClose={() => postShared(id, "linkedin")}
        >
          <LinkedinIcon size={ICON_SIZE_PIXEL} round />
        </LinkedinShareButton>
        <RedditShareButton
          url={postUrl}
          title={postTitle}
          onShareWindowClose={() => postShared(id, "reddit")}
        >
          <RedditIcon size={ICON_SIZE_PIXEL} round />
        </RedditShareButton>
        <TelegramShareButton
          url={postUrl}
          title={postTitle}
          onShareWindowClose={() => postShared(id, "telegram")}
        >
          <TelegramIcon size={ICON_SIZE_PIXEL} round />
        </TelegramShareButton>
        <TwitterShareButton
          url={postUrl}
          title={postTitle}
          hashtags={["fightpandemics"]}
          onShareWindowClose={() => postShared(id, "twitter")}
        >
          <TwitterIcon size={ICON_SIZE_PIXEL} round />
        </TwitterShareButton>
        <WhatsappShareButton
          title={postTitle}
          url={postUrl}
          onShareWindowClose={() => postShared(id, "whatsapp")}
        >
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
