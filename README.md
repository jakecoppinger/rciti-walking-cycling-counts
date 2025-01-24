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
- Select `Time series`
- Select `Whole Period`
- Choose 15 min / Hour / Day interval as desired
- Select `Apply`
- Select `Download` to CSV
- Use comma separated
- Download to `public/data/...` and adjust filename
- Update all three files (15 min , hour, day)
- Run `generate-data` script as per above
- Commit the results & updated CSV.

# Further reading / watching on rCITI walking & cycling counts

- https://thebox.unsw.edu.au/video/rciti-seminar-tanaponlilasathapornkit-insights-from-walking-count-data-in-sydney-cbd-20220915

- https://thebox.unsw.edu.au/video/rciti-seminar-by-a-prof-meead-saberi-estimating-walking-and-cycling-volumes-across-sydney-20220901


# Code attribution

AGPL (GNU AFFERO GENERAL PUBLIC LICENSE)

Original author: Jake Coppinger (jake@jakecoppinger.com)
