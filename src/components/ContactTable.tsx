import React from "react";
import ContactRow from "./ContactRow";
import { Contact } from "../utils/types";
import { useNavigate } from "react-router-dom";

interface ContactTableProps {
  contacts: Contact[];
  handleDelete: (id: string) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  handleDelete,
}) => {
  const navigate = useNavigate();
  return (
    <table className="min-w-full bg-white text-[10px] sm:text-base">
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
              key={contact.id}
              contact={contact}
              onDelete={handleDelete}
              onDetails={(contact) =>
                navigate("/contact/details/" + contact.id)
              }
            />
          ))
        ) : (
          <tr>
            <td
              colSpan={5}
              className="text-center py-8"
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
