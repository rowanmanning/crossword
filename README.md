
# Crossword

> [!WARNING]
> This website is no longer updated. It relied on the New York Times crossword leaderboard being available on a web page and it no longer is as of 2025-05-21. Thanks for getting involved! The website will be left as-is.

Fetch and archive the New York Times crossword leaderboard - [crossword.rowanmanning.com](https://crossword.rowanmanning.com/).


## Running locally

  1. Install [Hugo](https://gohugo.io/)

  2. Clone this repo locally and initialise submodules:

     ```bash
     git clone https://github.com/rowanmanning/crossword.git && cd crossword && submodule init && git submodule update
     ```

  3. Install dependencies with `npm install`

  4. Run `npm start`

  5. Visit [http://localhost:1313/](http://localhost:1313/)


## Manually editing times

Times should rarely (if ever) be manually added or edited. Some cases where this is fine to do:

### Glitched times

If someone reports that the time on the site isn't their _actual_ time (normally it's an extremely fast time less than 10 seconds), that's a glitched time. If a time is marked as glitched, it retains all the awards and position on the leaderboard, but no longer counts towards the best or average times for that person.

Once a day is over you can modify the times for that day (doing so before a day is over will result in your changes being overwritten).

To mark a time as glitched, find the offending time in [`data/leaderboards`](data/leaderboards) and add a `"isGlitch": true` property to the JSON for that time. Then run the page generation script with:

```
./scripts/generate-pages.js
```

Commit all of the changes, yours _and_ the ones made by the script.


## Contributing

[The contributing guide is available here](docs/contributing.md). All contributors must follow [Crossword's code of conduct](docs/code_of_conduct.md).


## License

Licensed under the [GPLv3](LICENSE.md) license.<br/>
Copyright &copy; 2021, Rowan Manning.
