/**
 * A Go/Rust/Haskell-like Result type. Ensures at the type level that errors are handled.
 */
declare type Result<E, T> =
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      error: E;
    };
