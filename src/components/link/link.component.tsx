import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface CustomLinkProps extends NextLinkProps {
  className?: string;
  variant?: "principal" | "secundario";
  activeColor?: string;
  hoverColor?: string;
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    {
      className = "",
      variant = "principal",
      activeColor,
      hoverColor,
      children,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const defaultColors = {
      principal: {
        active: "#1F2937",
        hover: "#D93B11",
      },
      secundario: {
        active: "#6B7280",
        hover: "#D93B11",
      },
    };

    const activeColorValue = activeColor || defaultColors[variant].active;
    const hoverColorValue = hoverColor || defaultColors[variant].hover;

    const getLinkStyles = () => ({
      color: isHovered ? hoverColorValue : activeColorValue,
      textDecoration: variant === "secundario" ? "underline" : "none",
      textUnderlineOffset: "4px",
    });

    const baseStyles =
      "inline-flex items-center gap-1 transition-all duration-200";

    return (
      <NextLink {...props} passHref legacyBehavior>
        <a
          className={`${baseStyles} ${className}`}
          ref={ref}
          style={getLinkStyles()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
          {variant === "principal" && (
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200"
              style={{
                transform: isHovered ? "translateX(2px)" : "translateX(0)",
                color: isHovered ? hoverColorValue : activeColorValue,
                textDecorationColor: hoverColorValue,
              }}
            />
          )}
        </a>
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export { Link };
