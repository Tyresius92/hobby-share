import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { Box, Text } from "~/components";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export const links: LinksFunction = () => [...Text.links()];

export default function Index() {
  return (
    <main>
      <Box m={4} mx={8}>
        <h1>Help Your Neighbor, They'll Help You!</h1>
        <Text>
          Want to try a new hobby? Borrow the things you need instead of buying
          them!
        </Text>
        <Text>
          Got stuff you're not using? Lend it to people in your area! Connect
          with your community, and help prevent needless consumerism!
        </Text>
      </Box>
    </main>
  );
}
