import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import OrgBookRadioGroup from "./OrgBookRadioGroup";
import { OrgBookStyledModalContainer } from "./OrgBookStyledModal";
import SvgIcon from "../Icon/SvgIcon";
import privateIcon from "../../assets/icons/orgbook-private-alt.svg";
import publicIcon from "../../assets/icons/orgbook-public-alt.svg";

const OrgBookConfirmModal = ({
  action,
  selectedPage,
  visible,
  onConfirm,
  onCancelConfirm,
  UPDATE_ACTION_TYPES,
  livePageExists,
  UNPUBLISH_OPTIONS,
  PUBLISH_OPTIONS,
  showUnpublishOptions,
}) => {
  const { t } = useTranslation();
  const [unpublishOption, setUnpublishOption] = useState(null);
  const [defaultUnpublishOption, setDefaultUnpublishOption] = useState(null);

  const [publishOption, setPublishOption] = useState(null);
  const [defaultPublishOption, setDefaultPublishOption] = useState(null);

  let title = "";
  let okText = "";
  let confirmPrompt = "";
  let pageName = selectedPage?.name;
  let unpublishOption1 = "";
  let unpublishOption2 = "";
  let unpublishOptionText = "";

  let publishOption1 = "";
  let publishOption2 = "";
  let publishOptionText = "";

  switch (action) {
    case UPDATE_ACTION_TYPES.saveProgressType:
      title = t("orgBook.confirmSaveProgressTitle");
      okText = t("orgBook.confirmSaveProgressOkText");
      confirmPrompt = t("orgBook.confirmSaveProgressPrompt", { pageName });
      break;

    case UPDATE_ACTION_TYPES.republishType:
      title = t("orgBook.confirmRepublishTitle");
      okText = t("orgBook.confirmRepublishOkText");
      confirmPrompt = t("orgBook.confirmRepublishPrompt", { pageName });
      break;

    case UPDATE_ACTION_TYPES.publishType:
      title = t("orgBook.confirmPublishTitle");
      okText = t("orgBook.confirmPublishOkText");
      confirmPrompt = livePageExists
        ? t("orgBook.confirmPublishPromptLivePageExists", { pageName })
        : t("orgBook.confirmPublishPromptNoLivePageYet", { pageName });
      publishOption1 = t("orgBook.confirmPublishOption1");
      publishOption2 = t("orgBook.confirmPublishOption2");
      publishOptionText = t("orgBook.confirmPublishOptionText");

      break;

    case UPDATE_ACTION_TYPES.unpublishType:
      title = t("orgBook.confirmUnpublishTitle");
      okText = t("orgBook.confirmUnpublishOkText");
      confirmPrompt = t("orgBook.confirmUnpublishPrompt", { pageName });
      if (showUnpublishOptions) {
        unpublishOption1 = t("orgBook.confirmUnpublishOption1");
        unpublishOption2 = t("orgBook.confirmUnpublishOption2");
        unpublishOptionText = t("orgBook.confirmUnpublishOptionText");
      }
      break;

    case UPDATE_ACTION_TYPES.deleteDraftType:
      title = t("orgBook.confirmDeleteTitle");
      okText = t("orgBook.confirmDeleteOkText");
      confirmPrompt = t("orgBook.confirmDeletePrompt", { pageName });
      break;

    case UPDATE_ACTION_TYPES.undoAllChangesType:
      title = t("orgBook.confirmUndoAllChangesTitle");
      okText = t("orgBook.confirmUndoAllChangesOkText");
      confirmPrompt = t("orgBook.confirmUndoAllChangesPrompt", {
        pageName,
      });
      break;

    case UPDATE_ACTION_TYPES.changeLiveToPublicViewType:
      title = t("orgBook.confirmChangeToPublicTitle");
      okText = t("orgBook.confirmChangeToPublicOkText");
      confirmPrompt = t("orgBook.confirmChangeToPublicPrompt", { pageName });
      break;

    case UPDATE_ACTION_TYPES.changeLiveToPrivateViewType:
      title = t("orgBook.confirmChangeToPrivateTitle");
      okText = t("orgBook.confirmChangeToPrivateOkText");
      confirmPrompt = t("orgBook.confirmChangeToPrivatePrompt", { pageName });
      break;

    default:
      break;
  }

  const unpublishradioButtonOptions = [
    {
      index: UNPUBLISH_OPTIONS.leaveDraftContent,
      value: unpublishOption1,
      defaultChecked: true,
    },
    {
      index: UNPUBLISH_OPTIONS.replaceDraftContent,
      value: unpublishOption2,
      defaultChecked: false,
    },
  ];

  const publishradioButtonOptions = [
    {
      index: PUBLISH_OPTIONS.publicView,
      value: publishOption1,
      defaultChecked: true,
    },
    {
      index: PUBLISH_OPTIONS.privateView,
      value: publishOption2,
      defaultChecked: false,
    },
  ];

  const initialize = () => {
    if (action === UPDATE_ACTION_TYPES.unpublishType) {
      setUnpublishOption(
        unpublishradioButtonOptions.find(
          (option) => option.defaultChecked === true,
        ),
      );
      setDefaultUnpublishOption(
        unpublishradioButtonOptions.find(
          (option) => option.defaultChecked === true,
        ),
      );
    }
    if (action === UPDATE_ACTION_TYPES.publishType) {
      setPublishOption(
        publishradioButtonOptions.find(
          (option) => option.defaultChecked === true,
        ),
      );
      setDefaultPublishOption(
        publishradioButtonOptions.find(
          (option) => option.defaultChecked === true,
        ),
      );
    }
  };

  useEffect(initialize, []);

  const handleUnpublishOptionChange = (e) => {
    setUnpublishOption(
      unpublishradioButtonOptions.find(
        (option) => option.value === e.target.value,
      ),
    );
  };

  const handlePublishOptionChange = (e) => {
    setPublishOption(
      publishradioButtonOptions.find(
        (option) => option.value === e.target.value,
      ),
    );
  };

  const getMaxModalBodyHeight = () => {
    let maxModalBodyHeight = "10rem";
    switch (action) {
      case UPDATE_ACTION_TYPES.unpublishType:
        if (showUnpublishOptions) {
          maxModalBodyHeight = "49.6rem";
        }
        break;
      case UPDATE_ACTION_TYPES.publishType:
        maxModalBodyHeight = "20rem";
        break;
      default:
        break;
    }
    return maxModalBodyHeight;
  };

  return (
    selectedPage && (
      <OrgBookStyledModalContainer
        MaxModalBodyHeight={getMaxModalBodyHeight()}
        MinModalBodyHeight={showUnpublishOptions ? "25.7rem" : "10rem"}
        width={450}
        visible={visible}
        title={title}
        centered
        okText={okText}
        cancelText={t("orgBook.cancel")}
        onCancel={() => {
          onCancelConfirm();
        }}
        cancelButtonProps={{ disabled: false }}
        onOk={() => {
          switch (action) {
            case UPDATE_ACTION_TYPES.unpublishType:
              onConfirm(action, unpublishOption.index);
              break;
            case UPDATE_ACTION_TYPES.publishType:
              onConfirm(action, publishOption.index);
              break;
            default:
              onConfirm(action);
              break;
          }
        }}
        destroyOnClose={true}
        maskClosable={true}
      >
        <p>
          {action === UPDATE_ACTION_TYPES.changeLiveToPublicViewType ? (
            <>
              <SvgIcon src={publicIcon} title={t("orgBook.publicView")} />
              {"    "}
            </>
          ) : (
            ""
          )}
          {action === UPDATE_ACTION_TYPES.changeLiveToPrivateViewType ? (
            <>
              <SvgIcon
                src={privateIcon}
                title={t("orgBook.orgViewOnly")}
                width={"3rem !important"}
                height={"3rem !important"}
              />
              {"    "}
            </>
          ) : (
            ""
          )}
          {confirmPrompt}
        </p>
        {showUnpublishOptions
          ? defaultUnpublishOption && (
              <>
                <span>{unpublishOptionText}</span>
                <OrgBookRadioGroup
                  name="confirmUnpublishOption"
                  value={unpublishOption.value}
                  defaultValue={defaultUnpublishOption.value}
                  onChange={(e) => handleUnpublishOptionChange(e)}
                  options={unpublishradioButtonOptions}
                  padding="1rem 1rem"
                />
              </>
            )
          : ""}
        {action === UPDATE_ACTION_TYPES.publishType
          ? defaultPublishOption && (
              <>
                <span>{publishOptionText}</span>
                <OrgBookRadioGroup
                  name="confirmPublishOption"
                  value={publishOption.value}
                  defaultValue={defaultPublishOption.value}
                  onChange={(e) => handlePublishOptionChange(e)}
                  options={publishradioButtonOptions}
                  padding="1rem 1rem"
                />
              </>
            )
          : ""}
      </OrgBookStyledModalContainer>
    )
  );
};

export default OrgBookConfirmModal;
