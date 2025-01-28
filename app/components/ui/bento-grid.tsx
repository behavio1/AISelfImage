import * as React from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  description: string;
  href?: string;
  children?: React.ReactNode;
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  className,
  title,
  description,
  href,
  children,
  ...props
}: BentoCardProps) {
  const content = (
    <>
      <div className="relative z-10 backdrop-blur-sm bg-black/50 rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>
        <p className="text-base text-white/80 leading-relaxed">{description}</p>
      </div>
      {children && <div className="relative z-10 mt-4">{children}</div>}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-neutral-800/50 opacity-0 transition-all duration-300 group-hover:opacity-100" />
    </>
  );

  const Comp = href
    ? React.createElement(
        "a",
        {
          href,
          className: cn(
            "group relative overflow-hidden rounded-xl bg-neutral-800/50 p-6 transition-all hover:bg-neutral-800/70 border border-neutral-800 hover:border-neutral-700",
            className
          ),
          ...props,
        },
        content
      )
    : React.createElement(
        "div",
        {
          className: cn(
            "group relative overflow-hidden rounded-xl bg-neutral-800/50 p-6 transition-all hover:bg-neutral-800/70 border border-neutral-800 hover:border-neutral-700",
            className
          ),
          ...props,
        },
        content
      );

  return Comp;
}
