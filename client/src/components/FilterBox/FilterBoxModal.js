import React, { useState } from "react";
import { Modal, List, Button, WhiteSpace, WingBlank, Icon } from "antd-mobile";

export default () => {
  const [modal, setModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  return (
    <WingBlank>
      <Button onClick={toggleModal}>popup</Button>
      <WhiteSpace />
      <Modal
        popup
        visible={modal}
        onClose={toggleModal}
        animationType="slide-up"
        afterClose={() => {
          console.log("afterClose");
        }}
      >
        <List renderHeader={() => <div>委托买入</div>} className="popup-list">
          {["股票名称", "股票代码", "买入价格"].map((i, index) => (
            <List.Item key={index}>{i}</List.Item>
          ))}
          <List.Item>
            <Button type="primary" onClick={toggleModal}>
              买入
            </Button>
          </List.Item>
        </List>
      </Modal>
    </WingBlank>
  );
};
