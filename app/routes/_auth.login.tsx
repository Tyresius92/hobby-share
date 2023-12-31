import type {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  TypedResponse,
  V2_MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Checkbox,
  InternalLink,
  Text,
  TextInput,
} from "~/components";

import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({
  request,
}: LoaderArgs): Promise<TypedResponse<{}>> => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ErrorDetails {
  email: string | null;
  password: string | null;
}

// TODO: make it possible to sign in with email OR username
export const action = async ({
  request,
}: ActionArgs): Promise<
  TypedResponse<{
    errors?: ErrorDetails;
  }>
> => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    redirectTo,
    remember: remember === "on" ? true : false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Login" }];

export const links: LinksFunction = () => [];

export default function LoginPage(): JSX.Element {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Box>
      <Form method="post">
        <TextInput
          label="Email address"
          required
          autoFocus={true}
          name="email"
          type="email"
          autoComplete="email"
          errorMessage={actionData?.errors?.email ?? undefined}
        />

        <TextInput
          label="Password"
          ref={passwordRef}
          required
          name="password"
          type="password"
          autoComplete="current-password"
          errorMessage={actionData?.errors?.password ?? undefined}
        />

        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Button type="submit">Log in</Button>
        <Box>
          <Checkbox name="remember" label="Remember me" />
          <Box>
            <Text>
              Don't have an account?{" "}
              <InternalLink
                to={{
                  pathname: "/join",
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </InternalLink>
            </Text>
          </Box>
        </Box>
      </Form>
    </Box>
  );
}
