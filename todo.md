General

- Fix glitch when scrolling to the bottom of the page, as the page slightly scrolls up after reaching the end when scrolling down on mobile phone (i think its ios chrome dependent, not sure).

Footer and pages structure

- Today (shows index/landing page if before 26 aug, or the respective day page if users’ phone date is between 26 Aug and 10 Sep). This today page is the default page of the app.
- Itinerary - Shows the 3 destination cards as on the home page
- Helpful - Shows compact currency converter from USD to RON, and contact numbers, from database. Analyze the structure of the json files so you can create a scalable solution, as i may add more things with contact numbers. Perhaps keep a consistent key name regardless of the resource type: attraction, transfer, flight, etc.
