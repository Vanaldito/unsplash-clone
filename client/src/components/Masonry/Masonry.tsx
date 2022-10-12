import { Children, useEffect, useRef, useState } from "react";
import "./Masonry.css";

interface MasonryProps {
  columns: number;
  breakPoint: number;
  children: React.ReactNode;
}

export default function Masonry({
  columns,
  breakPoint,
  children,
}: MasonryProps) {
  const [masonryColumns, setMasonryColumns] = useState(columns);

  function calculateColumns() {
    const columnImages: Array<Array<React.ReactNode>> = Array.from({
      length: masonryColumns,
    }).map(() => []);

    const childrenArray = Children.toArray(children);

    childrenArray.forEach((child, index) => {
      const correspondingColumn = index % masonryColumns;

      columnImages[correspondingColumn].push(child);
    });

    return columnImages;
  }

  const columnImages = calculateColumns();

  const masonry = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!masonry.current) return;

    const observer = new ResizeObserver(() => {
      (masonry.current?.clientWidth || 0) > breakPoint
        ? setMasonryColumns(3)
        : setMasonryColumns(1);
    });

    observer.observe(masonry.current);
  }, []);

  return (
    <div
      className="masonry"
      ref={masonry}
      style={{ "--columns": masonryColumns } as React.CSSProperties}
    >
      {columnImages.map((column, colIndex) => (
        <div className="masonry__column" key={colIndex}>
          {column.map(child => child)}
        </div>
      ))}
    </div>
  );
}
