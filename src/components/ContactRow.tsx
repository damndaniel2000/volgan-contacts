import React from "react";
import Button from "./Button";
import { Contact } from "../utils/types";

interface ContactRowProps {
  contact: Contact;
  onDelete: (id: string) => void;
  onDetails: (contact: Contact) => void;
}

const ContactRow: React.FC<ContactRowProps> = ({
  contact,
  onDelete,
  onDetails,
}) => {
  return (
    <tr>
      <td className="py-2 border-b">{contact.name}</td>
      <td className="py-2 border-b">{contact.email}</td>
      <td className="py-2 border-b">{contact.phone}</td>
      <td className="py-2 border-b">
        <Button
          onClick={() => onDelete(contact.id)}
          text="Delete"
          color="red"
        />
      </td>
      <td className="py-2 border-b">
        <Button
          onClick={() => onDetails(contact)}
          text="Details"
          color="blue"
        />
      </td>
    </tr>
  );
};

export default ContactRow;
