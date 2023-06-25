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
import { Box, Button, InternalLink, Text, TextInput } from "~/components";
import { getUserByUsername } from "~/models/user.server";

import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({
  request,
}: LoaderArgs): Promise<TypedResponse<{}>> => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ErrorData {
  email: string | null;
  password: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
}

// TODO: combine these checks so that multiple errors can come back at once
// consider how the auto-focus behavior should work for multiple errors
export const action = async ({
  request,
}: ActionArgs): Promise<
  TypedResponse<{
    errors?: ErrorData;
  }>
> => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      {
        errors: {
          email: "Email is invalid",
          password: null,
          username: null,
          firstName: null,
          lastName: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      {
        errors: {
          email: null,
          password: "Password is required",
          username: null,
          firstName: null,
          lastName: null,
        },
      },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      {
        errors: {
          email: null,
          password: "Password is too short",
          username: null,
          firstName: null,
          lastName: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof username !== "string" || username.length === 0) {
    return json(
      {
        errors: {
          email: null,
          password: null,
          username: "Username is required",
          firstName: null,
          lastName: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof firstName !== "string" || firstName.length === 0) {
    return json(
      {
        errors: {
          email: null,
          password: null,
          username: null,
          firstName: "First Name is required",
          lastName: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof lastName !== "string" || lastName.length === 0) {
    return json(
      {
        errors: {
          email: null,
          password: null,
          username: null,
          firstName: null,
          lastName: "Last Name is required",
        },
      },
      { status: 400 }
    );
  }

  const existingUserWithEmail = await getUserByEmail(email);
  if (existingUserWithEmail) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
          username: null,
          firstName: null,
          lastName: null,
        },
      },
      { status: 400 }
    );
  }

  const existingUserWithUsername = await getUserByUsername(username);
  if (existingUserWithUsername) {
    return json(
      {
        errors: {
          email: null,
          password: null,
          username: "A user already exists with this username",
          firstName: null,
          lastName: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(
    { email, username, firstName, lastName },
    password
  );

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export const links: LinksFunction = () => [];

export default function Join(): JSX.Element {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Box>
      <Form method="post">
        <TextInput
          label="Email address"
          ref={emailRef}
          required
          autoFocus={true}
          name="email"
          type="email"
          autoComplete="email"
          errorMessage={actionData?.errors?.email ?? undefined}
        />

        <TextInput
          label="Username"
          ref={usernameRef}
          required
          name="username"
          type="text"
          autoComplete="username"
          errorMessage={actionData?.errors?.username ?? undefined}
        />

        <TextInput
          label="First Name"
          ref={firstNameRef}
          required
          name="firstName"
          type="text"
          autoComplete="firstName"
          errorMessage={actionData?.errors?.firstName ?? undefined}
        />

        <TextInput
          label="Last Name"
          ref={lastNameRef}
          required
          name="lastName"
          type="text"
          autoComplete="lastName"
          errorMessage={actionData?.errors?.lastName ?? undefined}
        />

        <TextInput
          label="Password"
          ref={passwordRef}
          required
          name="password"
          type="password"
          autoComplete="new-password"
          errorMessage={actionData?.errors?.password ?? undefined}
        />

        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Button type="submit">Create Account</Button>
        <Box>
          <Text>
            Already have an account?{" "}
            <InternalLink
              to={{
                pathname: "/login",
                search: searchParams.toString(),
              }}
            >
              Log in
            </InternalLink>
          </Text>
        </Box>
      </Form>
    </Box>
  );
}
