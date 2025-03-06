import NextLink from "next/link";

export default interface LinkProps
  extends React.ComponentPropsWithoutRef<typeof NextLink> {
  variant?: "principal" | "secundario";
  activeColor?: string;
  hoverColor?: string;
}
