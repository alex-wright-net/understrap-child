## Local Implementation

... After following instructions for installation of parent understrap theme

1) Install custom local instance of understrap-child:

	$ cd into root of local install

	$ git remote add understrap-child https://github.com/alex-wright-net/understrap-child

	$ git subtree add --prefix=wp-content/themes/XXcustom-themeXX/ understrap-child dev

2) Update gulpfile.js with local url for gulp watch-bs to load to

3) Update style.css with information for custom client child theme

4) Create custom 1200px x 900px screenshot.png

5) $ cd into custom named instance of understrap-child

6) $ gulp watch-bs

7) Customize away!
