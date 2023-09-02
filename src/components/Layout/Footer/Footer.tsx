const Footer = () => {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-black bottom-0 w-full">
      <div className="flex flex-col items-start ps-20 py-8 gap-y-2">
        <h1 className="text-xl font-bold text-red-500 divide-y-4 py-4">
          Project Information
        </h1>
        <hr className=" h-1 w-full pt-4" />
        <p className="text-sm text-white">About the Project</p>
        <p className="text-sm text-white">Roadmap</p>
        <p className="text-sm text-white">Meet the team</p>
      </div>
      <div className="flex flex-col items-start ps-20 py-8 gap-y-2">
        <h1 className="text-xl font-bold text-red-500 divide-y-4 py-4">Link</h1>
        <hr className=" h-1 w-full pt-4" />
        <p className="text-sm text-white">About the Project</p>
        <p className="text-sm text-white">Roadmap</p>
        <p className="text-sm text-white">Meet the team</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm text-white">Singapore</p>
      </div>
    </footer>
  );
};

export default Footer;
