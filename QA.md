# Verification record — November 4, 2026 (Central time)

## Ran and passed

Node built-in test runner: 5 tests passed.

- Exactly 48 unique characters and 48 distinguishable question-answer profiles.
- Every question checked against each of 48 secrets, including exact elimination.
- All three difficulties completed against every secret: 144 strategy matches.
- Strategy ignores unseen secret input and does not mutate its candidate history.
- Correct/incorrect referee guesses and invalid character rejection.
- Syntax checks for app.js, engine.js, and data.js passed.

Browser: Chromium through the provided interactive browser.

- Original prototype's Computer and Two Players buttons worked over HTTP.
- Rebuilt computer mode, Easy selection, private Doctor Doom selection.
- Completed CPU match: six questions narrowed Black Widow to one; correct guess won.
- Manual elimination reduced 48 to 47; restore returned eligible cards.
- Revealing and hiding secret showed the correct selected character.
- Computer question/answer flow, elimination, and turn advancement worked.
- Complete hard-mode match: computer narrowed Thor to one and guessed correctly.
- Wrong final guess ended a CPU match and recorded a loss.
- Complete desktop local match: Player 1 Spider-Man, Player 2 Doctor Doom;
  separate clues/boards; Player 1 guessed Doctor Doom correctly.
- Complete narrow local match: Player 1 Hulk, Player 2 Thanos;
  Player 2 guessed Hulk correctly and won.
- Handoff DOM contained zero character buttons, secret panels, or logs.
- Handoff also cleared previous modal question/answer contents.
- Restart returned 48 eligible cards, empty log, turn 1 and new secret selection.
- Card inspection, tap-mode toggle, rules, sound toggle, play again, new mode.
- Scores survived a page reload / new iframe document.
- 320- and 390-pixel iframe widths exercised game controls and mobile layouts.
- No horizontal document overflow observed at 320, 390, 768, or 1280 iframe
  widths in tested screens. Inner available widths were 305/375/753/1265
  because the Chromium scrollbar occupies 15 pixels.
- Visual inspection of desktop landing page and 390-pixel landing layout.

Responsive iframe testing is Chromium viewport testing, not Safari emulation.
Audio toggle and synthesis path exercised; audible output not independently verified.

## Pending

- Public repository creation and GitHub Pages deployment require GitHub browser
  authentication. The connected GitHub API tools do not expose repo creation
  or Pages configuration; gh CLI is not authenticated.
- Live URL load, buttons, complete CPU/local games, and mobile checks after deploy.
- Actual iPhone Safari / physical touch-device test: unavailable in this runtime.

The delivered source is ready for publishing; no live deployment is claimed yet.
