import { Container } from "@material-ui/core";

import CoinList from "../charts/coinlist";

export default function Bitcoin() {
  return (
    <Container spacing={5}>
      <CoinList />
    </Container>
  );
}
