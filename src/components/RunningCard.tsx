import { Tab } from "@headlessui/react";
import { z } from "zod";
import physicalActivity from "../../tidepool_loader/physicalActivity.json";
import bolus from "../../tidepool_loader/bolus.json";
import glucose from "../../tidepool_loader/cbg.json";
import food from "../../tidepool_loader/food.json";
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

const RunningSchema = z.object({
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

const GlucoseSchema = z.object({
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

const BolusSchema = z.object({
  normal: z.number(),
  time: zDateTime,
}).transform( v => {
  const {time, ...rest} = v;
  return {
    date: new Date(v.time).toLocaleDateString("en-US", dateOptions),
    time: new Date(v.time).toLocaleTimeString("en-US", timeOptions),
    ...rest
  }
})

const NutritionSchema = z.object({
    carbohydrate: z.object({
       net: z.number(),
       units: z.string()
      }),
    })

const FoodSchema = z.object({
nutrition: NutritionSchema,
time: zDateTime
}).transform(v => {
  const {nutrition, ...rest} = v
  return {
    carbohydrate: nutrition.carbohydrate.net,
    units: nutrition.carbohydrate.units,
    date: new Date(v.time).toLocaleDateString("en-US", dateOptions),
    time: new Date(v.time).toLocaleTimeString("en-US", timeOptions),
}
})

export const RunningCard = () => {
  const runningStats = z.array(RunningSchema).parse(physicalActivity);
  const glucoseStats = z.array(GlucoseSchema).parse(glucose);
  const bolusStats = z.array(BolusSchema).parse(bolus)
  const foodStats = z.array(FoodSchema).parse(food)
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
      stat: `${bolusStats[0].normal} units`,
      date: bolusStats[0].date,
      time: bolusStats[0].time,
    },
    {
      name: "Carbohydrates Eaten",
      stat: `${foodStats[0].carbohydrate} ${foodStats[0].units}`,
      date: foodStats[0].date,
      time: foodStats[0].time,
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
