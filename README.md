# trip-test

This is a page created for Ember's take-home project. It displays a bus' current position and provides helpful information about the bus and its journey.

## Status

Completed in 10 hours and 10 minutes on 30/03/2024 - 31/03/2024. The extra time used is due to spending lots of time on design - writing user stories, creating quality issues, and making a Figma prototype. While this does demonstrate my abilities across the development workflow, it was ambitious to spend so much time on formal design.

Features:

- Drawing the bus route with OSRM

  - Extrapolates the road route using OSRM's fastest route engine based on the stops in the route
  - Note that the route chosen is not the same as the real route as the parameters used by Ember are unavailable to me (the bus may appear off of the route due to this)

- Interactive map using Leaflet
- Server-side data-fetching using React server components
- Information about the bus
- Differentiates start and end point
- Mobile-first design
- Handles network errors gracefully

### Tests

As I was over time, I chose not to write unit tests. Here is what I would test:

- <Route />
    - Handles empty route
    - Handles network error
        - Mock no internet connection
    - All stops render in the correct place
    - Handles failure to extrapolate road route
        - Should continue to render the points, but tell the user that the app is unable to render the route
        - Test this with a reasonable set of points, no points, and an unreasonable set of points (around the world)
    - Loader appears and disappears during and after query
    - Check that points are correctly marked as visited
        - This would fail with the current implementation
- <Bus>
    - Renders in the correct place
- <Map>
    - Should be able to zoom, pan
    - Ensure tiles render correctly with snapshot testing
- <LiveMap>
    - Handles network error
        - Load with no internet connection
        - Load then cut off internet
    - Input a quote with an invalid origin and destination
        - E.G origin doesn't match route[0]
    - Loads with the right centrepoint for the given bus position
- Index page
  - Handles query failures
    - Trip query
    - Quotes query
    - Empty quotes list
    - Invalid trip UID
  - Correctly gets the right departure time range

# Design

## User stories

- As a traveler, I would like to see where the bus currently is so that I know when it will pick me up
- As a bus driver, I would like to track the position of the bus I will take over so that I can be ready for the changeover
- As a traveler planning my journey, I would like to know the facilities available on the bus so that I can plan my luggage
- As a passenger, I would like to be able to access the bus tracking on my mobile phone or tablet so that I can track my journey on the go
- As a passenger, I would like to know how long it will take to reach my destination so that I can plan my day
- As a passenger, I would like continuous updates on the ETA so that I feel assured that the ETA is accurate
- As a passenger, I would like to know what the next stop is so that I can get off in an emergency
- As a passenger, I would like to be able to share the bus tracking page with my friends so they know where I am
- As an emergency responder, I would like an accurate position for the bus so that I can efficiently locate it

See https://github.com/SMC242/trip-test/issues for the stories translated to features

## Figma

The Figma designs can be found [here](https://www.figma.com/file/fVAbl3D60KyFosFQS20Glc/Untitled?type=design&node-id=0%3A1&mode=design&t=i4WIygBYycY9kXdn-1)

## Next

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
