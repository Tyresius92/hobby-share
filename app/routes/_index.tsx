import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main>
      <div>
        <div>
          <div>
            <div>
              <h1>
                <span>Blues Stack</span>
              </h1>
              <p>
                Check the README.md file for instructions on how to get this
                project deployed.
              </p>
              <div>
                {user ? (
                  <p>Hello {user.email}!</p>
                ) : (
                  <div>
                    <Link to="/join">Sign up</Link>
                    <Link to="/login">Log In</Link>
                  </div>
                )}
              </div>
              <a href="https://remix.run">
                <img
                  src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                  alt="Remix"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
