import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import { StoreContext } from "../../store";
import { observer } from "mobx-react-lite";

const ModalContainer = () => {
  const Store = useContext(StoreContext);
  const {
    modal: { open, body },
    closeModal
  } = Store.modalStore;
  return (
    <Modal open={open} onClose={closeModal} size="mini">
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
};

export default observer(ModalContainer);
