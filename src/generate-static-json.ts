import csv from "csv-parser";
import fs from "fs";

import { dailyTrafficFilename } from "./config.js";
import { locations, LocationKeys, isStringALocationKey, TrafficData, TrafficDataRaw } from "./types.js";
import { parseDateString } from "./utils.js";


interface TrafficDataFile {
  period: string | undefined;
  data: any[];
}
async function readDataCSV<T>(filename: string): Promise<TrafficDataFile> {
  // Read csv from `../data/traffic-daily.csv` and return a JSON object.
  const results: T[] = [];
  await new Promise<void>(async (resolve, reject) => {
    fs.createReadStream("./public/data/traffic-daily.csv")
      .pipe(csv({ skipLines: 2 }))
      .on("data", (data: any) => {
        // Push the remaining lines to results
        results.push(data as T);
      })
      .on("end", () => {
        resolve();
      });
  });
  // Read first line of the filename (and first line only) and save it to periodLine
  let periodLine: string = '';
  let lineCounter = 0;
  await new Promise<void>(async (resolve, reject) => {
    fs.createReadStream("./public/data/traffic-daily.csv")
      .pipe(csv())
      .on("data", (data: any) => {
        if (lineCounter > 0) {
          return;
        }
        periodLine = data;
        lineCounter++;
        resolve();
      });
  });

  return { data: results, period: periodLine };
}

function cleanAndCheckData(data: TrafficDataRaw[]): TrafficData[] {
  // Clean the data and check for missing values
  const cleanedData: TrafficData[] = [];
  for (const row of data) {
    const cleanedRow: Partial<TrafficData> = {};
    for (const [key, value] of Object.entries(row)) {
      if (key === "") {
        continue;
      }
      if (key === "Time") {
        // validate the timestamp entry
        if (!value || value === "" || value === undefined) {
          throw new Error(`Missing timestamp in row: ${JSON.stringify(row)}`);
        }

        const parsedDate = parseDateString(value);
        cleanedRow.timestamp = parsedDate.toISOString();
        continue;
      }
      if (!isStringALocationKey(key)) {
        throw new Error(`Heading of row (${key}) not in our 'locations' type (do you need to add it?): ${JSON.stringify(row)}`);
      }
      if (value === "" || value === undefined) {
        // @ts-ignore
        cleanedRow[key] = undefined;
        continue;
      }
      try {
        // @ts-ignore
        const num = parseInt(value);
        // @ts-ignore
        cleanedRow[key] = num;
        console.log(`setting cleanedRow[${key}] to ${num}`);
      } catch {
        throw new Error(`Invalid number in row: ${JSON.stringify(row)}`);
      }
    }

    cleanedData.push(cleanedRow as TrafficData);
  }
  return cleanedData;
}

async function main() {
  console.log("Starting...");

  const trafficData = await readDataCSV<TrafficDataRaw>(dailyTrafficFilename);
  console.log("period: ", trafficData.period);
  console.log("data:");


  // JSON stringify (pretty) first three elements of the data array
  console.log(JSON.stringify(trafficData.data.slice(0, 3), null, 2));

  const cleanedData = cleanAndCheckData(trafficData.data);
  // console.log(JSON.stringify(cleanedData.slice(0, 10), null, 2));


  // Save JSON file to ./computed-data/traffic-daily.json
  fs.writeFileSync("./src/computed-data/traffic-daily.json", JSON.stringify(cleanedData, null, 2));


  console.log("done - saved to computed-data/");
}

main();

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err}, ${JSON.stringify(err)}`);
  process.exit(1);
});
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err}, ${JSON.stringify(err)}`);
  process.exit(1);
});

// Add this to ensure we exit on any error
process.on("error", (err) => {
  console.error(`Process Error: ${err}, ${JSON.stringify(err)}`);
  process.exit(1);
});
