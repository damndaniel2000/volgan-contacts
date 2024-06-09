import React from "react";
import ContactRow from "./ContactRow";
import { Contact } from "../utils/types";

interface ContactTableProps {
  contacts: Contact[];
  handleDelete: (email: string) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  handleDelete,
}) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr className="text-left">
          <th className="py-2 border-b">Name</th>
          <th className="py-2 border-b">Email</th>
          <th className="py-2 border-b">Phone</th>
          <th className="py-2 border-b"></th>
          <th className="py-2 border-b"></th>
        </tr>
      </thead>
      <tbody>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactRow
              key={contact.email}
              contact={contact}
              onDelete={handleDelete}
              onDetails={(name) => alert(`Details for ${name}`)}
            />
          ))
        ) : (
          <tr>
            <td
              colSpan={5}
              className="text-center py-2"
            >
              No results found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ContactTable;
