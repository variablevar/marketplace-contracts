import { listenFactory } from "./factory";
import { listenMarketplace } from "./marketplace";

export async function listen() {
  listenFactory();
  listenMarketplace();
}
