"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { Stop, RouteWithShape } from "@/types";

const DynamicMap = dynamic(() => import("@/components/map"), { ssr: false });

interface Props {
  allLines: RouteWithShape[];
  allStops: Record<string, Stop>;
}

export default function ByLocation({ allLines, allStops }: Props) {
  return (
    <Box style={{ height: "100dvh", width: "100vw" }}>
      <DynamicMap allLines={allLines} allStops={allStops} />
    </Box>
  );
}
