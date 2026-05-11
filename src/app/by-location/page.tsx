import ByLocation from "@/components/by-location";
import { getLines, getStops } from "@/lib/actions";

export default async function ByLocationPage() {
  const [allLines, allStops] = await Promise.all([getLines(), getStops()]);
  return <ByLocation allLines={allLines} allStops={allStops} />;
}
