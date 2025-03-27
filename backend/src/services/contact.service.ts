import Contact from "../models/contact.model.ts";
import * as contactRepository from "../repositories/contact.repository.ts";

export const createContact = async (contact: Contact): Promise<Contact> => {
  return await contactRepository.createContact(contact);
};
