export default function Container({ children }) {
  return (
    <div className="mt-5 container m-auto flex-col m-auto space-y-5 w-5/6">
      {children}
    </div>
  );
}
