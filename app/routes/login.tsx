import type {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  V2_MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Box, Button, Checkbox, TextInput } from "~/components";

import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

// TODO: make it possible to sign in with email OR username
export const action = async ({ request }: ActionArgs) => {
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

export const links: LinksFunction = () => [
  ...Box.links(),
  ...Button.links(),
  ...TextInput.links(),
  ...Checkbox.links(),
];

export default function LoginPage() {
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
    <Box m={4} mx={8}>
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
          autoFocus={true}
          name="password"
          type="password"
          autoComplete="current-password"
          errorMessage={actionData?.errors?.password ?? undefined}
        />

        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Button type="submit">Log in</Button>
        <div>
          <Checkbox name="remember" label="Remember me" />
          <div>
            Don't have an account?{" "}
            <Link
              to={{
                pathname: "/join",
                search: searchParams.toString(),
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </Form>
    </Box>
  );
}
