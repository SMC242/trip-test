import React from "react";

// Props can be added later
// eslint-disable-next-line @typescript-eslint/ban-types
type ErrorMessageProps = React.PropsWithChildren<{}>;

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <div className="bg-brand-red flex justify-center p-2">{children}</div>;
}
