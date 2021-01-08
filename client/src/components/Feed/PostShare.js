import React, { useContext, useRef } from "react";
import { Modal } from "antd-mobile";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { WebSocketContext } from "context/WebsocketContext";

//Share buttons
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

//Custom icons
import { ReactComponent as FacebookIcon } from "assets/icons/social-fb.svg";
import { ReactComponent as EmailIcon } from "assets/icons/social-email.svg";
import { ReactComponent as LinkedinIcon } from "assets/icons/social-linkedin.svg";
import { ReactComponent as RedditIcon } from "assets/icons/social-reddit.svg";
import { ReactComponent as TelegramIcon } from "assets/icons/social-telegram.svg";
import { ReactComponent as TwitterIcon } from "assets/icons/social-tw.svg";
import { ReactComponent as WhatsappIcon } from "assets/icons/social-whatsapp.svg";

//theme styling and imported button/input
import RoundInput from "components/Input/RoundedInput.js";
import Button from "components/Button/PostShareButton";
import { theme } from "constants/theme.js";
const { lightGray } = theme.colors;
const { xlarge } = theme.typography.size;
const { display } = theme.typography.font.family;

const StyledModal = styled(Modal)`
  width: 52rem;
  min-width: 25rem;

  font-family: ${display};
  .am-modal-content {
    border-radius: 10px;
  }

  .am-modal-header {
    padding: 0;
    padding-left: 2rem;
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
    margin-top: 0.4rem;
    border-bottom: 1px solid ${lightGray};
    .am-modal-title {
      font-size: ${xlarge};
      font-weight: bold;
      padding-right: 1rem;
    }
  }

  .am-modal-body {
    padding: 0 0 15px 0 !important;
  }

  .am-modal-close {
    right: 40px;
    top: 18px;
  }

  .am-modal-close:hover {
    cursor: pointer;
  }

  .am-modal-close-x {
    height: 14px !important;
    width: 14px !important;
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.3 0.709994C13.1132 0.522742 12.8595 0.417509 12.595 0.417509C12.3305 0.417509 12.0768 0.522742 11.89 0.709994L7 5.58999L2.11 0.699994C1.92317 0.512742 1.66952 0.407509 1.405 0.407509C1.14048 0.407509 0.886833 0.512742 0.700001 0.699994C0.310001 1.08999 0.310001 1.71999 0.700001 2.10999L5.59 6.99999L0.700001 11.89C0.310001 12.28 0.310001 12.91 0.700001 13.3C1.09 13.69 1.72 13.69 2.11 13.3L7 8.40999L11.89 13.3C12.28 13.69 12.91 13.69 13.3 13.3C13.69 12.91 13.69 12.28 13.3 11.89L8.41 6.99999L13.3 2.10999C13.68 1.72999 13.68 1.08999 13.3 0.709994Z' fill='%23939393'/%3E%3C/svg%3E");
  }

  svg {
    width: 53px;
    height: 53px;
  }
}`;

const StyledIconWrapper = styled.div`
  width: 80%;
  margin: auto;
  padding-bottom: 0.5rem;

  div {
    display: flex;
    justify-content: center;
  }

  div button {
    padding: 0.2rem 1.5rem !important;
  }
`;

export const ShareModal = ({
  showShareModal,
  setShowShareModal,
  postTitle,
  postContent,
  id,
}) => {
  const { t } = useTranslation();
  const { postShared } = useContext(WebSocketContext);
  const postUrl = `${window.location.origin}/post/${id}`;
  const inputRef = useRef(null);

  function copyToClipBoard() {
    inputRef.current.select();
    document.execCommand("copy");
  }

  return (
    <StyledModal
      title={t("post.shareVia")}
      onClose={() => setShowShareModal(false)}
      maskClosable={true}
      closable={true}
      visible={showShareModal}
      transparent={true}
    >
      <div>
        <StyledIconWrapper>
          <div>
            <EmailShareButton
              url={postUrl}
              subject={postTitle}
              body={postContent}
              beforeOnClick={() => postShared(id, "email")}
            >
              <EmailIcon />
            </EmailShareButton>
            <FacebookShareButton
              url={postUrl}
              hashtag={"#fightpandemics"}
              onClick={() => postShared(id, "facebook")}
            >
              <FacebookIcon />
            </FacebookShareButton>
            <LinkedinShareButton
              url={postUrl}
              title={postTitle}
              onClick={() => postShared(id, "linkedin")}
            >
              <LinkedinIcon />
            </LinkedinShareButton>
            <RedditShareButton
              url={postUrl}
              title={postTitle}
              onClick={() => postShared(id, "reddit")}
            >
              <RedditIcon />
            </RedditShareButton>
          </div>
          <div>
            <TelegramShareButton
              url={postUrl}
              title={postTitle}
              onClick={() => postShared(id, "telegram")}
            >
              <TelegramIcon />
            </TelegramShareButton>
            <TwitterShareButton
              url={postUrl}
              title={postTitle}
              hashtags={["fightpandemics"]}
              onClick={() => postShared(id, "twitter")}
            >
              <TwitterIcon />
            </TwitterShareButton>
            <WhatsappShareButton
              title={postTitle}
              url={postUrl}
              onClick={() => postShared(id, "whatsapp")}
            >
              <WhatsappIcon />
            </WhatsappShareButton>
          </div>
        </StyledIconWrapper>
        <div>
          <RoundInput type="text" value={postUrl} readOnly ref={inputRef} />
          <Button onClick={copyToClipBoard}>{t("post.copyUrl")}</Button>
        </div>
      </div>
    </StyledModal>
  );
};
