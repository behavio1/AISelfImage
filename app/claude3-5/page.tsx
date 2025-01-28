import { ShaderDemo } from "@/app/components/ShaderDemo";
import { Chat } from "@/app/components/ui/chat";
import { messages } from "@/app/claude3-5/const";

export default function ShaderDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 p-2 sm:p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-[1800px] mx-auto">
        <div className="w-full order-2 lg:order-1">
          <Chat messages={messages} aiAvatarSrc="/Claude.webp" />
        </div>
        <div className="w-full order-1 lg:order-2">
          <ShaderDemo />
        </div>
      </div>
    </div>
  );
}
