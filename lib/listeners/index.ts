import { listenFactory } from "./factory";
import { listenMarketplace } from "./marketplace";
import { listenEveryCollectionWhichIsCreated } from "./token";

export async function listen() {
  listenFactory();
  listenMarketplace();
  await listenEveryCollectionWhichIsCreated();
}
