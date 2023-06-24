import type { Item, User } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Item } from "@prisma/client";

export const getItemById = (id: Item["id"]): Promise<Item | null> => {
  return prisma.item.findUnique({
    where: { id },
  });
};

export const getItemsByUserId = (ownerId: Item["ownerId"]): Promise<Item[]> => {
  return prisma.item.findMany({
    where: {
      ownerId,
    },
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

export const deleteItem = ({
  id,
  ownerId,
}: Pick<Item, "id"> & { ownerId: User["id"] }): Promise<{ count: number }> => {
  return prisma.item.deleteMany({
    where: { id, ownerId },
  });
};
