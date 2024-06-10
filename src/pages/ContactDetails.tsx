import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Contact } from "../utils/types";

const ContactDetails = () => {
  const contacts: Contact[] = useMemo(() => {
    const storedContacts = localStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : [];
  }, []);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const contact = contacts.find((contact) => contact.id === id);

  const handleGoBack = () => {
    navigate("/contacts");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        {contact ? (
          <>
            <h2 className="text-2xl mb-4">Contact Details</h2>
            <div>
              <p>
                <strong>Name:</strong> {contact.name}
              </p>
              <p>
                <strong>Email:</strong> {contact.email}
              </p>
              <p>
                <strong>Phone:</strong> {contact.phone}
              </p>
              <p>
                <strong>Address:</strong> {contact.address}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleGoBack}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Go Back
              </button>
            </div>
          </>
        ) : (
          <div>
            Contact not found
            <div className="flex justify-end mt-4">
              <button
                onClick={handleGoBack}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDetails;
