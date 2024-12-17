// app/unauthorized/page.tsx (or pages/unauthorized.tsx if using the pages directory)
export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-700 mb-4">Unauthorized</h1>
        <p className="text-lg text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-secondary transition duration-300"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}