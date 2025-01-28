"use client";

import { ColorfulBoxShader } from "./ColorfulBoxShader";

export function ShaderDemo() {
  return (
    <div className="w-full overflow-hidden bg-gray-900 flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-6">
      {/* Content overlay - moved to top */}
      <div className="w-full">
        <div className="container mx-auto px-2 sm:px-4 text-center">
          <h1 className="mb-2 sm:mb-4 text-xl sm:text-2xl font-bold text-white/90">
            Claude&apos;s Visual Self-Image
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-neutral-400 leading-relaxed">
            An organic, fluid representation featuring warm colors and flowing
            patterns that symbolize adaptability and creativity. The transparent
            layers and subtle reflections reveal the harmonious blend of
            technical precision and emotional intelligence.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[800px]">
        <ColorfulBoxShader className="rounded-lg shadow-2xl" />
      </div>
    </div>
  );
}
