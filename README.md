# MARVEL MYSTERY WHO?

A responsive, browser-local deduction game rebuilt from Lucas's original
Marvel Guess Who prototype. Buildless HTML, CSS, and JavaScript modules.

## Features

- 48 named heroes and villains with original geometric / typographic card designs.
- Computer opponent with Easy, Medium, and Hard strategies.
- Private secret selection and independent pass-and-play boards.
- Answers and automatic elimination from a fixed, inspectable trait roster.
- Manual elimination / restoration and animated flips.
- Correct and incorrect final guesses, private logs, and pass-device screens.
- Persistent computer wins/losses and separate Player 1 / Player 2 wins.
- Optional synthesized sounds, new game, restart, and instructions.
- Responsive layouts, keyboard controls, native modal dialogs, reduced motion.

## Run and test

Serve the dist directory with a normal HTTP static server. Open the server URL.
Opening index.html directly from a file preview is unsupported: previews may
disable scripts, and JavaScript modules require HTTP serving.

Node 22 or newer:

    npm test

No application dependencies, build step, external fonts, CDN assets, or API keys.

## GitHub Pages

The included workflow tests the engine and deploys dist on pushes to main.
The repository's Settings → Pages → Source must be set to GitHub Actions.
All asset references are relative so repository subpath hosting works.

## Fair computer strategy

engine.js separates the referee from chooseComputerMove. The strategy receives
candidate IDs, prior question IDs, difficulty, and an RNG. It receives no secret,
referee, answer lookup, DOM, or game object. The controller passes the chosen
question to the referee, then supplies the resulting reduced candidate set on
the following turn.

Easy chooses a random question that splits its candidate set. Medium picks
among up to four strongest splits. Hard always picks the most balanced split.
All difficulties guess once one candidate remains.

This is a local single-device game, not a tamper-resistant server game.
Browser developer tools can inspect local memory. Pass-and-play privacy is
designed for normal use: board, secret panel, logs, and prior modal contents are
removed from the rendered DOM during each handoff. Only the active player's
private view is rendered. Active secrets are never saved to localStorage.

## Fixed trait rule

Question answers use data.js, not every possible comic/movie portrayal.
Inspect any card for its exact game traits. Role, team and power-source labels
are intentionally simplified. Every character has a unique complete answer
profile, so no two characters are mechanically indistinguishable.

## Artwork and attribution

All card graphics are original CSS geometric and typographic compositions.
No official Marvel artwork, downloaded portraits, character logos, or external
art assets are included. Marvel character names and related properties belong
to their respective owners. This is an unofficial fan game with no affiliation
or endorsement. No claim of ownership over those characters is made.

## Prototype diagnosis

The original file was retrieved and inspected, then served over HTTP.
Both Play vs Computer and Two Players responded in Chromium. Therefore, the
reported unresponsive iPhone display is consistent with a preview environment
that does not execute JavaScript; the exact iPhone preview was not available
to reproduce. There was no observed mode-button JavaScript failure under HTTP.
The original had incomplete local selection/privacy and no difficulty or scores.
The rebuild also gives every character a distinguishable set of questions.

See QA.md for actual tests and remaining verification.
