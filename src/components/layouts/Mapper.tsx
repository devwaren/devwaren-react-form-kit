import { Fragment, type Key, type ReactNode } from "react";

type MapperProps<T> = {
  items: T[];
  children: (item: T, index: number) => ReactNode;
  className?: string;
  listFor: string;
};

function MapperInner<T>({
  items,
  children,
  className,
  listFor,
}: MapperProps<T>) {
  return (
    <ul className={className} aria-label={`list for ${listFor}`}>
      {items.map((item, index) => {
        const { id } = item as { id?: Key };

        return <Fragment key={id ?? index}>{children(item, index)}</Fragment>;
      })}
    </ul>
  );
}

const Mapper = <T,>(props: MapperProps<T>) => <MapperInner {...props} />;

export { Mapper };
