import { clsx } from "clsx";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
type TabTypes = {
  tabName: string;
  tabContent: string;
};
export const About = () => {
  const tabs: TabTypes[] = [
    { tabName: "Infrastructure", tabContent: "This is the infra tab." },
    { tabName: "Backend", tabContent: "This is the backend tab." },
    { tabName: "Frontend", tabContent: "This is the frontend tab." },
    { tabName: "Leadership", tabContent: "This is the leadership tab." },
  ];
  return (
    <div className="flex flex-col mx-auto container px-4 py-5 max-w-3xl gap-10 bg-stripes-red">
      <blockquote>
        <p className="text-2xl">
          “A software developer in Calgary that <em>lives</em> on open-source
          software.”
        </p>
      </blockquote>
      <p>
        Currently working on a diverse team that is utilizing React and FastAPI
        full-stack development to solve complex land problems in the Oil & Gas
        sector across North America.
      </p>
      <p>
        I am always eager to use the most promising technology available. This
        website was built to accerate my own understanding of{" "}
        <a href="https://astro.build/" className="text-slate-500 underline">
          Astro.js
        </a>
        {", "}
        <a href="https://react.dev/" className="text-slate-500 underline">
          React
        </a>
        , and{" "}
        <a href="https://tailwindcss.com/" className="text-slate-500 underline">
          TailwindCSS
        </a>
        . It was also my learning environment for dialing in a{" "}
        <a href="https://neovim.io/" className="text-slate-500 underline">
          Neovim
        </a>{" "}
        workflow.
      </p>
      <p></p>
      <div className="block">
        <Tab.Group>
          <Tab.List
            className="sm:flex divide-gray-200 rounded-lg shadow"
            aria-label="Tabs"
          >
            {tabs.map((t, idx) => (
              <Tab as={Fragment}>
                {({ selected }) => (
                  <p
                    className={clsx(
                      selected
                        ? "text-slate-200 bg-slate-500 "
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 bg-white",
                      idx === 0 && "rounded-l-lg",
                      idx === tabs.length - 1 && "rounded-r-lg",
                      "group relative min-w-0 flex-1 overflow-hidden  py-4 px-4 text-center text-sm font-medium  focus:z-1 focus:outline-none outline-none"
                    )}
                  >
                    {t.tabName}
                  </p>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4 p-4 border-gray-300 rounded-lg border-solid border-[1px]">
            {tabs.map((t, idx) => (
              <Tab.Panel>{t.tabContent}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
