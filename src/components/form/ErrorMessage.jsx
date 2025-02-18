const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md">
      <p>{error}</p>
    </div>
  );
};

export default ErrorMessage;
