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
      <p className="text-xl">
        I'm a software developer that brings the full-stack together. I jump
        anywhere between user interface and system architecure. Take a look at
        what I do best when it comes to developing software solutions in the
        tabs below.
      </p>
      <div className="block">
        <Tab.Group>
          <Tab.List
            className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
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
