import dynamic from "next/dynamic";

const CommandPalette = dynamic(() => import("./CommandPaletteContent"), {
  ssr: false,
});

export default CommandPalette;
