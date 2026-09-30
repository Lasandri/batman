interface BatShapeProps {
  className?: string;
  style?: React.CSSProperties;
}

/** A simple flat silhouette bat used for ambient flying particles. */
export default function BatShape({ className, style }: BatShapeProps) {
  return (
    <svg viewBox="0 0 100 40" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M50 14c-3-6-10-12-22-13 3 4 6 7 9 9-9-1-19 1-27 8 8-1 16 0 22 3-8 2-15 7-19 14 7-4 14-6 21-6-5 4-8 9-9 15 5-5 10-9 16-11 2 4 5 7 9 9 4-2 7-5 9-9 6 2 11 6 16 11-1-6-4-11-9-15 7 0 14 2 21 6-4-7-11-12-19-14 6-3 14-4 22-3-8-7-18-9-27-8 3-2 6-5 9-9-12 1-19 7-22 13z" />
    </svg>
  );
}
