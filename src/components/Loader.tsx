interface LoaderProps {
  enabled: boolean;
}

const Loader = ({ enabled }: LoaderProps) => {
  return enabled && (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-700 border-t-transparent"></div>
    </div>
  );
};

export default Loader;
