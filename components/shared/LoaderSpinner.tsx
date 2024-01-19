export default function LoaderSpinner() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="flex">
        <div className="relative">
          <div className="absolute h-12 w-12 rounded-full border-8 border-dashed border-gray-200" />

          <div className="absolute h-12 w-12 animate-spin rounded-full border-8 border-dashed border-purple-500 border-t-transparent" />
        </div>
      </div>
    </div>
  );
}
