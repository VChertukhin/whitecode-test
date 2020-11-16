# Before you start
## Implemented features list
* Two pages routes (with working **URLs**)
* Newsfeed page (list of all news, uses virtualization inside and eventualy handles several hundres on items)
* Page for single news (with title **GET** parameter for **URL** in web version)
* Notifications system for web and mobile (used cutom solution for web since Expo SKD doesn't support in-browser notifications yet) if you click on it - then you'll be redirected to corresponding news
## Extra Features
* Working with real data (lenta.ru **RSS** feed) with reat-time update
* Full cycle of network error: separate error state in Redux, error appears on screen
* Tag-relted news when opening any of news
* Show last visited news
## Some notices
* I've used `namespace` quite often (even with nesting) along this project just to show that this code could be easily splitted into different modules and as it may not be considered as best practice - I believe that in case of small projects it could be done this way
* every import across project's codebase id done with various aliases to increase readability
* I didn't use `reselect` as selectors that I've build are pretty simple and it's not necessary to add it
* UI-Kitten v4.4 is used as v5.* had some issues with running it on the web