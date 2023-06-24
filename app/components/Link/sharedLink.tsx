import type { LinksFunction } from "@remix-run/server-runtime";
import styles from "./Link.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
