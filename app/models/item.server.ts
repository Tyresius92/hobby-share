import type { Item } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Item } from "@prisma/client";

export const getItemById = (id: Item["id"]): Promise<Item | null> => {
  return prisma.item.findUnique({
    where: { id },
  });
};

interface ItemDetails {
  name: Item["name"];
  description: Item["description"];
  ownerId: Item["ownerId"];
}

export const createItem = (item: ItemDetails): Promise<Item> => {
  return prisma.item.create({
    data: {
      name: item.name,
      description: item.description,
      ownerId: item.ownerId,
    },
  });
};
