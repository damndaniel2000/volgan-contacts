import React from "react";
import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";
import { Contact } from "../utils/types";

interface AddContactModalProps {
  newContact: Contact;
  setNewContact: (contact: Contact) => void;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const AddContactModal: React.FC<AddContactModalProps> = ({
  newContact,
  setNewContact,
  isOpen,
  onClose,
  onSave,
}) => {
  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPhoneValid = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const isFormValid = () => {
    return (
      newContact.name.trim().length >= 3 &&
      isEmailValid(newContact.email) &&
      isPhoneValid(newContact.phone) &&
      newContact.address.trim().length >= 3
    );
  };

  return (
    isOpen && (
      <Modal onClose={onClose}>
        <h2 className="text-xl font-bold mb-4">Add New Contact</h2>
        <div className="sm:space-y-2 sm:w-[500px]">
          <div>
            <Input
              type="text"
              value={newContact.name}
              onChange={(e) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
              placeholder="Name"
              isValid={newContact.name.trim().length >= 3}
              validationMessage="Name must be at least 3 characters"
            />
          </div>
          <div>
            <Input
              type="email"
              value={newContact.email}
              onChange={(e) =>
                setNewContact({ ...newContact, email: e.target.value })
              }
              placeholder="Email"
              isValid={isEmailValid(newContact.email)}
              validationMessage="Invalid email address"
            />
          </div>
          <div>
            <Input
              type="text"
              value={newContact.phone}
              onChange={(e) =>
                setNewContact({ ...newContact, phone: e.target.value })
              }
              placeholder="Phone"
              isValid={isPhoneValid(newContact.phone)}
              validationMessage="Invalid phone number"
            />
          </div>
          <div>
            <Input
              type="text"
              value={newContact.address}
              onChange={(e) =>
                setNewContact({ ...newContact, address: e.target.value })
              }
              placeholder="Address"
              isValid={newContact.address.trim().length >= 3}
              validationMessage="Address must be at least 3 characters"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            onClick={onClose}
            text="Cancel"
            color="red"
            className="w-24"
          />
          <Button
            onClick={onSave}
            text="Add"
            color="green"
            disabled={!isFormValid()}
            className="w-24"
          />
        </div>
      </Modal>
    )
  );
};

export default AddContactModal;
