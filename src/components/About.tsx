export const About = () => {
  return (
    <div className="flex flex-col mx-auto container px-4 py-5 max-w-3xl gap-10 bg-stripes-red">
      <p className="text-xl">
        I'm a software developer that brings the full-stack together. I jump
        anywhere between user interface and system architecure. The domain of
        full-stack is rather large, so here is a visualization to better explain
        my expertise.
      </p>
      <div className="grid grid-cols-6 gap-1 place-items-center items-end ">
        <div className="h-12 w-full bg-stripes bg-stripes-gray-900 bg-white"></div>
        <div className="h-14 w-full bg-stripes bg-stripes-gray-900 bg-white"></div>
        <div className="h-40 w-full flex-1 bg-stripes bg-stripes-gray-900 bg-white"></div>
        <div className="h-40 w-full flex-1 bg-stripes bg-stripes-gray-900 bg-white"></div>
        <div className="h-20 w-full flex-1 bg-stripes bg-stripes-gray-900 bg-white"></div>
        <div className="h-10 w-full flex-1 bg-stripes bg-stripes-gray-900 bg-white"></div>
        {/* <div className="h-10 w-full bg-stripes bg-stripes-white bg-red-500"></div>
        <div className="h-10 w-full bg-stripes bg-stripes-white bg-red-500"></div>
        <div className="h-10 w-full bg-stripes bg-stripes-white bg-red-500"></div>
        <div className="h-10 w-full bg-stripes bg-stripes-white bg-red-500"></div>
        <div className="h-10 w-full bg-stripes bg-stripes-white bg-red-500"></div> */}
      </div>
      <div className="grid grid-cols-6 gap-4 place-items-center ">
        <p className="">Hardware</p>
        <p className="">Infrastructure</p>
        <p className="">Backend</p>
        <p className="">Frontend</p>
        <p className="">Design</p>
        <p className="">Leadership</p>
      </div>
    </div>
  );
};
