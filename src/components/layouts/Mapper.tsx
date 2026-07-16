import type { Key, ReactNode } from "react";

type MapperProps<T extends { id?: Key; className?: string }> = {
  items: T[];
  children: (item: T, index: number) => ReactNode;
  className?: string;
  listFor: string;
};

function MapperInner<T extends { id?: Key; className?: string }>({
  items,
  children,
  className,
  listFor,
}: MapperProps<T>) {
  return (
    <ul className={className} aria-label={`list for ${listFor}`}>
      {items.map((item, index) => {
        const { id, className, ...props } = item;

        return (
          <li key={id ?? index} className={className}>
            {children(props as T, index)}
          </li>
        );
      })}
    </ul>
  );
}

const Mapper = <T extends { id?: Key; className?: string }>(
  props: MapperProps<T>,
) => <MapperInner {...props} />;

export { Mapper };
