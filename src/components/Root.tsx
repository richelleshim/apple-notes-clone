import { SWRConfig, Middleware, SWRHook } from "swr";
import { App } from "./App";

export const SWRErrorMiddleware: Middleware =
  (hook: SWRHook) => (key, fetcher, config) => {
    const result = hook(key, fetcher, config);
    const { error } = result;
    if (error) {
      console.error(error);
    }
    return result;
  };

export const Root = () => {
  return (
    <SWRConfig value={{ use: [SWRErrorMiddleware] }}>
      <App />
    </SWRConfig>
  );
};
