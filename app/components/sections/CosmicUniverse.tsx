"use client";

import { motion } from "framer-motion";
import EclipseCore from "./EclipseCore";
import PlanetNavigator from "./PlanetNavigator";

export default function CosmicUniverse() {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <EclipseCore />
      </motion.div>

      {/* Anchor the orbit ring exactly at the eclipse center */}
      <div className="absolute left-1/2 top-1/2">
        <PlanetNavigator />
      </div>
    </div>
  );
}
