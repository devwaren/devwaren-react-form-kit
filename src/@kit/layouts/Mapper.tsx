import { Fragment, type Key, type ReactNode } from "react";

type MapperProps<T> = {
  items: T[];
  children: (item: T, index: number) => ReactNode;
};

function MapperInner<T>({ items, children }: MapperProps<T>) {
  return (
    <>
      {items.map((item, index) => {
        const { id } = item as { id?: Key };

        return (
          <Fragment key={id ?? index}>
            {children(item, index)}
          </Fragment>
        );
      })}
    </>
  );
}

const Mapper = <T,>(props: MapperProps<T>) => <MapperInner {...props} />;

export { Mapper };