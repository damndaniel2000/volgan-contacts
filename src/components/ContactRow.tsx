import React from "react";
import Button from "./Button";
import { Contact } from "../utils/types";

interface ContactRowProps {
  contact: Contact;
  onDelete: (email: string) => void;
  onDetails: (name: string) => void;
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
          onClick={() => onDelete(contact.email)}
          text="DELETE"
          color="red"
        />
      </td>
      <td className="py-2 border-b">
        <Button
          onClick={() => onDetails(contact.name)}
          text="DETAILS"
          color="blue"
        />
      </td>
    </tr>
  );
};

export default ContactRow;
