import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import OrgBookRadioGroup from "./OrgBookRadioGroup";
import { OrgBookStyledModalContainer } from "./OrgBookStyledModal";

const OrgBookConfirmModal = ({
  action,
  selectedPage,
  visible,
  onConfirm,
  onCancelConfirm,
  UPDATE_ACTION_TYPES,
  livePageExists,
  UNPUBLISH_OPTIONS,
  showUnpublishOptions,
}) => {
  const { t } = useTranslation();
  const [unpublishOption, setUnpublishOption] = useState(null);
  const [defaultUnpublishOption, setDefaultUnpublishOption] = useState(null);

  let title = "";
  let okText = "";
  let confirmPrompt = "";
  let pageName = selectedPage?.name;
  let unpublishOption1 = "";
  let unpublishOption2 = "";
  let unpublishOptionText = "";

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

    case UPDATE_ACTION_TYPES.movingOffDirtyPageType:
      title = t("orgBook.confirmMovingOffDirtyPageTitle");
      okText = t("orgBook.confirmMovingOffDirtyPageOkText");
      confirmPrompt = t("orgBook.confirmMovingOffDirtyPagePrompt", {
        pageName,
      });
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
  };

  useEffect(initialize, []);

  const handleUnpublishOptionChange = (e) => {
    setUnpublishOption(
      unpublishradioButtonOptions.find(
        (option) => option.value === e.target.value,
      ),
    );
  };

  return (
    selectedPage && (
      <OrgBookStyledModalContainer
        MaxModalBodyHeight={showUnpublishOptions ? "49.6rem" : "10rem"}
        MinModalBodyHeight={showUnpublishOptions ? "25.7rem" : "10rem"}
        width={450}
        visible={visible}
        title={title}
        centered
        okText={okText}
        cancelText={t("orgBook.cancel")}
        onCancel={onCancelConfirm}
        cancelButtonProps={{ disabled: false }}
        onOk={() => {
          if (action === UPDATE_ACTION_TYPES.unpublishType) {
            onConfirm(action, unpublishOption.index);
          } else {
            onConfirm(action);
          }
        }}
      >
        <p>{confirmPrompt}</p>
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
      </OrgBookStyledModalContainer>
    )
  );
};

export default OrgBookConfirmModal;
