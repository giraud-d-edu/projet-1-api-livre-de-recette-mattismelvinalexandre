import { ObjectId } from "../../deps.ts";
import NotFoundError from "../errors/NotFound.error.ts";
import Contact from "../models/contact.model.ts";
import { contactCollection } from "./db/mongo.ts";
import { ContactDBOToModel, ContactModelToDBO } from "./dbos/contact.dbo.ts";

export const getContactById = async (id: string): Promise<Contact> => {
  const contact = await contactCollection.findOne({ _id: new ObjectId(id) });
  if (!contact) {
    throw new NotFoundError(`Contact with id ${id} not found`);
  }
  return ContactDBOToModel(contact);
};

export const createContact = async (contact: Contact): Promise<Contact> => {
  const result = await contactCollection.insertOne(ContactModelToDBO(contact));
  if (!result.acknowledged) {
    throw new Error("Ingredient not created");
  }
  return await getContactById(result.insertedId.toString());
};
