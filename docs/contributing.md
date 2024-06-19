
# Crossword: Contribution Guide

We welcome contributions to Crossword. This guide outlines what's expected of you when you contribute, and what you can expect from me.

## Table of Contents

  * [What I expect from you](#what-i-expect-from-you)
  * [What you can expect from me](#what-you-can-expect-from-me)
  * [Technical](#technical)
    * [Linting](#linting)
    * [Tests](#tests)
    * [Manual testing](#manual-testing)


## What I expect from you

If you're going to contribute to Crossword, thanks! I have a few expectations of contributors:

  1. [Follow the code of conduct](code_of_conduct.md)
  2. [Follow the technical contribution guidelines](#technical)
  3. Be respectful of the time and energy that me and other contributors offer


## What you can expect from me

If you're a contributor to Crossword, you can expect the following from me:

  1. I will enforce [Crossword's code of conduct](code_of_conduct.md)
  2. If I decide not to implement a feature or accept a PR, I will explain why

Contributing to Crossword **does not**:

  1. Guarantee you my (or any other contributor's) attention or time – I work on this in my free time and I make no promises about how quickly somebody will get back to you on a PR, Issue, or general query
  2. Mean your contribution will be accepted


## Technical

To contribute to Crossword's code, clone this repo locally and commit your work on a separate branch. Open a pull-request to get your changes merged. If you're doing any large feature work, please make sure to have a discussion in an issue first – I'd rather not waste your time if it's not a feature I want to add to Crossword 🙂

I don't offer any guarantees on how long it will take me to review a PR or respond to an issue, [as outlined here](#what-you-can-expect-from-me).

### Linting

Crossword is linted using [Biome](https://biomejs.dev/), configured in the way I normally write JavaScript. Please keep to the existing style.

Biome errors will fail the build on any PRs. Most editors have a Biome plugin which will pick up errors, but you can also run the linter manually with the following command:

```
npm run verify
```

### Tests

Most of Crossword's code is not tested. Any code that looks like a library will probably eventually be transferred out into a separate module, or replaced with a preexisting one.

### Manual testing

If you make any changes to styling, please test your changes manually across a range of browsers. Crossword aims to support the following browsers:

  - [Apple Safari](https://www.apple.com/safari/) (latest stable)
  - [Google Chrome](https://www.google.co.uk/chrome/) (latest stable)
  - [Microsoft Edge](https://www.microsoft.com/edge) (latest stable)
  - [Mozilla Firefox](https://www.mozilla.org/firefox/) (latest stable)

Crossword also needs to work well on mobile devices. Please make sure that you test your styles on a range of screen sizes, in most case developer tools are enough.
