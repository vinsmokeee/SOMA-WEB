import { cacheLife } from "next/cache";

/** Current year, cached so pages stay prerendered; refreshed daily. */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
