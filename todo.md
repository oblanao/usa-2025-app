General

- Update 5 Sep day description, it is not an evening departure
- Update 2 Sep day Title to be Kualoa Ranch. Update the description as well, to avoid “kualoa ranch” repetition with the title. maybe make that hollywood reference.
- Fix glitch when scrolling to the bottom of the page, as the page slightly scrolls up after reaching the end when scrolling down on mobile phone (maybe ios chrome dependent, not sure).
- increase bottom padding for layout, for the main content by 48px.

Landing Page

- the content on the hero section sits too low, must be verically centered inside its container. if any spacers inserted, make sure to remove them.
- Improve travelers section by adding an appropriate heading above the avatars and the dates below, i.e 26 Aug - 9 Sep 2025
- Destination cards count the number of nights at each place, instead of days
- Hero section is too tall, reduce by around 100px

Individual Destination Page

- Redesign the welcome description section to be more visually compelling and compact, transforming the plain text block into an elegant, magazine-style introduction. Same for day page description section
- Update icon uses for events (a map pin) to something more appropriate for attractions and activities, maybe something fun.
- Add a map pin icon prefix to the destination title
  Individual Day Page
- add link to next or previous days, at the bottom of the page
- In header, dont show full title, show Show Just Day [X] - Mmm dd, i.e Day 1 - Aug 26
- Replace Today’s events with Timeline. Use an icon next to the heading so it looks much better
- Instead of first heading on the page being a small calendar icon and the date in long format, we should have the day title there, as we remove it from the app header.

Footer and pages structure

- Today (shows index/landing page if before 26 aug, or the respective day page if users’ phone date is between 26 Aug and 10 Sep). This today page is the default page of the app.
- Itinerary - Shows the 3 destination cards as on the home page
- Helpful - Shows compact currency converter from USD to RON, and contact numbers, from database. Analyze the structure of the json files so you can create a scalable solution, as i may add more things with contact numbers. Perhaps keep a consistent key name regardless of the resource type: attraction, transfer, flight, etc.
