import React from "react";
import Button from "./Button";
import Modal from "./Modal";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    isOpen && (
      <Modal onClose={onClose}>
        <h2 className="text-sm sm:text-base mb-8">
          Are you sure you want to delete this contact?
        </h2>
        <div className="flex justify-end space-x-4">
          <Button
            onClick={onClose}
            text="Cancel"
            color="gray"
            className=""
          />
          <Button
            onClick={onDelete}
            text="Delete"
            color="red"
          />
        </div>
      </Modal>
    )
  );
};

export default DeleteConfirmationModal;
