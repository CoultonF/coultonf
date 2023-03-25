import { Tab } from "@headlessui/react";
import { z } from "zod";
import physicalActivity from "../../tidepool_loader/physicalActivity.json";
import glucose from "../../tidepool_loader/cbg.json";
import { zDate, zDateTime } from "./zodDates";
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
} as const;
const timeOptions = {
  dayPeriod: undefined,
  hour: "numeric",
  minute: "numeric",
  second: undefined,
} as const;
const DistanceSchema = z.object({
  units: z.string(),
  value: z.number(),
});
const RunningSchema = z
  .object({
    distance: DistanceSchema,
    time: zDateTime,
  })
  .transform((v) => {
    const { distance, time, ...rest } = v;
    return {
      kilometers:
        distance.units === "miles"
          ? (distance.value * 1.609344).toFixed(2)
          : distance.value.toFixed(2),
      date: new Date(v.time).toLocaleDateString("en-US", dateOptions),
      time: new Date(v.time).toLocaleTimeString("en-US", timeOptions),
      ...rest,
    };
  });

const GlucoseSchema = z
  .object({
    time: zDateTime,
    units: z.string(),
    value: z.number(),
  })
  .transform((v) => {
    const { time, value, ...rest } = v;
    return {
      value: v.value.toFixed(1),
      date: new Date(v.time).toLocaleDateString("en-US", dateOptions),
      time: new Date(v.time).toLocaleTimeString("en-US", timeOptions),
      ...rest,
    };
  });

export const RunningCard = () => {
  const runningStats = z.array(RunningSchema).parse(physicalActivity);
  const glucoseStats = z.array(GlucoseSchema).parse(glucose);
  const stats = [
    {
      name: "Running",
      stat: `${runningStats[0].kilometers} km`,
      date: runningStats[0].date,
      time: runningStats[0].time,
    },
    {
      name: "Blood Glucose",
      stat: `${glucoseStats[0].value} ${glucoseStats[0].units}`,
      date: glucoseStats[0].date,
      time: glucoseStats[0].time,
    },
    {
      name: "Insulin Dosage",
      stat: "24.57%",
      date: new Date(Date.now()).toLocaleString("en-US"),
      time: runningStats[0].time,
    },
  ];
  return (
    <div className="container mx-auto px-4">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Lastest Data
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
            <dd className="mt-1 text-sm  tracking-tight text-gray-400">
              {item.date} @ {item.time}
            </dd>
            <dd className="mt-1 text-sm  tracking-tight text-gray-400"></dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
