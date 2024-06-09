import React, { useState, useEffect } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import ContactTable from "./components/ContactTable";
import Modal from "./components/Modal";
import { Contact } from "./utils/types";

const initialContacts: Contact[] = [
  {
    name: "James",
    email: "james@gmail.com",
    phone: "8583453234",
    address: "123 Main St",
  },
  {
    name: "Clara",
    email: "clara@gmail.com",
    phone: "9983423854",
    address: "456 Elm St",
  },
  {
    name: "Wayne",
    email: "wayne@gmail.com",
    phone: "4348273323",
    address: "789 Oak St",
  },
  {
    name: "Maya",
    email: "maya@gmail.com",
    phone: "9920558566",
    address: "101 Pine St",
  },
];

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      return JSON.parse(savedContacts);
    } else {
      localStorage.setItem("contacts", JSON.stringify(initialContacts));
      return initialContacts;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newContact, setNewContact] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleDelete = (email: string) => {
    setContacts(contacts.filter((contact) => contact.email !== email));
  };

  const handleAdd = () => {
    setContacts([newContact, ...contacts]);
    setNewContact({ name: "", email: "", phone: "", address: "" });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setNewContact({ name: "", email: "", phone: "", address: "" });
    setIsModalOpen(false);
  };

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

  const filteredContacts = search
    ? contacts.filter((contact) => contact.email.includes(search))
    : contacts;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4 flex justify-between items-center">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Email Address"
            className="max-w-lg"
          />
          <Button
            onClick={() => setIsModalOpen(true)}
            text="Create"
            color="blue"
          />
        </div>
        <ContactTable
          contacts={filteredContacts}
          handleDelete={handleDelete}
        />
        {isModalOpen && (
          <Modal onClose={handleCancel}>
            <h2 className="text-2xl mb-4">Add New Contact</h2>
            <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleAdd}
                text="ADD"
                color="green"
                disabled={!isFormValid()}
              />
              <Button
                onClick={handleCancel}
                text="CANCEL"
                color="red"
              />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ContactList;
