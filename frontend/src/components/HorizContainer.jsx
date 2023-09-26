export default function HorizContainer({ children }) {
  return (
    <div className="flex m-auto flex-wrap items-stretch m-auto flex items-center justify-center">
      {children}
    </div>
  );
}
