# Bi-direction Scroll

This project aims to implement a smooth scrolling behavior in both the direction to load a total of only 20 movies for each year.

## Implementation Details

By default, when a user lands on the page, the application displays a list of 20 movies from the year 2012.

Smooth scrolling behavior is implemented to load more movies as the user scrolls in any direction. Movies of the previous year are loaded when the user scrolls up, and movies of the next year are loaded when the user scrolls down until the current year.

It is an infinite scroll in both directions.

When a user selects one or more genres, the list should only display movies of the selected genres. Whenever a user selects a genre, a fresh list of movies should be fetched from the API for that particular genre.

## How to Run

Follow these steps to run the project locally:

1. Install the npm packages: `npm install`
2. Start the project locally: `npm run start`

The project will run on [http://localhost:3000](http://localhost:3000).