import type { ActionArgs, TypedResponse } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/session.server";

export const action = async ({
  request,
}: ActionArgs): Promise<TypedResponse<never>> => logout(request);

export const loader = (): TypedResponse<never> => redirect("/");
