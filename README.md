# rCITI Walking Cycling counts

A basic open source dashboard of UNSW Research Centre of Integrated Transport Innovation
(rCITI) data.

Contributions are very welcome!

# Data Attribution and license

UNSW Research Centre of Integrated Transport Innovation (rCITI).

Raw CSV data is downloadable from the `public/data` directory. 
Published under CC BY-SA 4.0.

Contact Meead Saberi for further information: meead.saberi@unsw.edu.au

# Local dev setup

```bash
nvm use
npm i
npm run generate-data # Generate JSON from CSVs
npm run start
```

# Regenerating data
- Head to https://www.eco-visio.net/v5/login and login
- Select `Analysis` tab on sidebar
- Select `Previous version` of Analysis page at the top
- Select `Time series` graphic
- Under `Period` select `Whole Period`
- Choose 15 min / Hour / Day interval as desired
- Select `Table` (not `Chart` - you can download from the Chart view but <=1hr frequency fails due
  to too much data)
- Select `Apply`
- Select `Download`, and select CSV format
- Select comma separated delimeter (default)
- Download to `./public/data/...` and adjust filename
- Repeat for all three files (15 min, hour, day)
- Run `generate-data` script as per above
- Commit the results & updated CSV.

Note: If you're getting lots of `^M` characters in the Git diff, you should convert the newlines
from Windows to Unix format using your preferred method. Eg. On Debian / Ubuntu:

```
sudo apt-get install dos2unix
dos2unix *.csv
```

- Run `npm run generate-data` to  generate JSON from CSVs

- If you see the error

```bash
Unhandled Rejection: Error: Heading of row (53 Perouse Rd) not in our 'locations' type (do you need to add it?)
```

you'll likely need to add the new location strings into `src/types.ts` and find the location
coordinates too

## How to get coordinates for a new location from Eco Visio

- Head to https://www.eco-visio.net/v5/login and login
- Select `Sites` in sidebar
- Click on the new site (that likely caused a type error on JSON generation as mentioned above)
- Select `Location` in sidebar
- Add these values into `counterLocationCoordinates` in `src/types.ts`


# Further reading / watching on rCITI walking & cycling counts

- https://thebox.unsw.edu.au/video/rciti-seminar-tanaponlilasathapornkit-insights-from-walking-count-data-in-sydney-cbd-20220915

- https://thebox.unsw.edu.au/video/rciti-seminar-by-a-prof-meead-saberi-estimating-walking-and-cycling-volumes-across-sydney-20220901


# Code attribution

AGPL (GNU AFFERO GENERAL PUBLIC LICENSE)

Original author: Jake Coppinger (jake@jakecoppinger.com)
