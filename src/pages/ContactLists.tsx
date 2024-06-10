import React, { useState, useEffect, useMemo } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import ContactTable from "../components/ContactTable";
import { Contact } from "../utils/types";
import CreateContactModal from "../components/CreateContactModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { v4 as uuidv4 } from "uuid";

const initialContacts: Contact[] = [
  {
    id: uuidv4(), // Generate UUID for each initial contact
    name: "James",
    email: "james@gmail.com",
    phone: "8583453234",
    address: "123 Main St",
  },
  {
    id: uuidv4(),
    name: "Clara",
    email: "clara@gmail.com",
    phone: "9983423854",
    address: "456 Elm St",
  },
  {
    id: uuidv4(),
    name: "Wayne",
    email: "wayne@gmail.com",
    phone: "4348273323",
    address: "789 Oak St",
  },
  {
    id: uuidv4(),
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

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);

  const [newContact, setNewContact] = useState<Contact>({
    id: uuidv4(), // Generate UUID for new contact
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleDelete = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    setIsDeleteModalOpen(false);
  };

  const handleAdd = () => {
    setContacts([newContact, ...contacts]);
    setNewContact({
      id: uuidv4(),
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setIsAddModalOpen(false);
  };

  const handleCancel = () => {
    setNewContact({
      id: uuidv4(),
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setIsAddModalOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    setContactToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const filteredContacts = useMemo(() => {
    if (!search) return contacts;
    return contacts.filter((contact) => contact.email.includes(search));
  }, [contacts, search]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4 flex justify-between items-start">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Email Address"
            className="max-w-lg"
            icon={
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16z"></path>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            }
          />
          <Button
            onClick={() => setIsAddModalOpen(true)}
            text="Create"
            color="blue"
          />
        </div>
        <ContactTable
          contacts={filteredContacts}
          handleDelete={handleDeleteClick}
        />
        <CreateContactModal
          newContact={newContact}
          setNewContact={setNewContact}
          isOpen={isAddModalOpen}
          onClose={handleCancel}
          onSave={handleAdd}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => contactToDelete && handleDelete(contactToDelete)}
        />
      </div>
    </div>
  );
};

export default ContactList;
