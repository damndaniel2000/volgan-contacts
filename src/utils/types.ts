export interface Contact {
  id: string,
  name: string;
  email: string;
  phone: string;
  address: string,
}

export interface ContactRowProps {
   newContact: Contact;
  setNewContact: React.Dispatch<React.SetStateAction<Contact>>;
  handleAdd: () => void;
  handleCancel: () => void;
  isFormValid: () => boolean;
  isEmailValid: (email: string) => boolean;
  isPhoneValid: (phone: string) => boolean;
}