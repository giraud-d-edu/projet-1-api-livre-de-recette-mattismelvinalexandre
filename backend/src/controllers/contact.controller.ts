import { RouterContext } from "../../deps.ts";
import Contact from "../models/contact.model.ts";
import { ContactDto } from "./dtos/contact.dto.ts";
import * as contactService from "../services/contact.service.ts";

export const createContact = async (ctx: RouterContext<"/contact">) => {
  const contact = ContactDto.parse(await ctx.request.body.json());
  ctx.response.body = await contactService.createContact(contact as Contact);
  ctx.response.status = 201;
};
