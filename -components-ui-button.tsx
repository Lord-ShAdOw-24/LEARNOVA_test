import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "./-lib-utils.ts";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[transform,opacity,background-color] duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        gold: "bg-gold text-navy shadow-sm hover:bg-gold-soft",
        navy: "bg-navy text-cream hover:bg-navy-mid",
        outline: "border border-border bg-transparent text-foreground hover:bg-card",
        ghost: "bg-transparent text-foreground hover:bg-card",
        danger: "bg-danger text-cream",
      },
      size: {
        sm: "h-9 rounded-[10px] px-3 text-sm",
        md: "h-11 rounded-[12px] px-4 text-sm",
        lg: "h-12 rounded-[14px] px-5",
        pill: "h-12 rounded-full px-5",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
