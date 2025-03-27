import { ObjectId, WithId } from "../../../deps.ts";
import Contact from "../../models/contact.model.ts";

export interface ContactDBO {
  _id: ObjectId;
  name: string;
  email: string;
  message: string;
}

export const ContactModelToDBO: (contact: Contact) => WithId<ContactDBO> = (
  contact,
) => {
  return {
    _id: new ObjectId(contact.id),
    name: contact.name,
    email: contact.email,
    message: contact.message,
  };
};

export const ContactDBOToModel: (contactDBO: WithId<ContactDBO>) => Contact = (
  contactDBO,
) => {
  return {
    id: contactDBO._id.toString(),
    name: contactDBO.name,
    email: contactDBO.email,
    message: contactDBO.message,
  };
};
