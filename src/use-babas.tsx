import * as React from "react";
import { Subscribable, Collection } from "babas";

export function useObject<T>(obj: Subscribable<T>) {
  const [, tick] = React.useState(0);

  React.useEffect(() => {
    return obj.subscribe(() => tick(p => p + 1));
  }, [obj, tick]);

  return obj;
}

export function useCollection<T>(col: Collection<T>) {
  const [, tick] = React.useState(0);

  React.useEffect(() => {
    return col.subscribe(() => tick(p => p + 1));
  }, [col, tick]);

  return col;
}
