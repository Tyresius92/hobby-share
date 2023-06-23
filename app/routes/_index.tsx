import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { Box, Heading, Text } from "~/components";

export const meta: V2_MetaFunction = () => [{ title: "Hobby Share" }];

export const links: LinksFunction = () => [];

export default function Index() {
  return (
    <main>
      <Box my={4} mx={8}>
        <Heading>Help Your Neighbor, They'll Help You!</Heading>
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
