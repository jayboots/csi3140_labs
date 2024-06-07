# Lab 3: 1D PacMan

Using JavaScript, the students will implement a few core concepts 
of a 1D game of pacman

## Learning Objectives

* Experience writing JavaScript

## Resources

* [1D PacMan](https://abagames.github.io/crisp-game-lib-11-games/?pakupaku)
* [Arstechnica review](https://arstechnica.com/gaming/2024/01/1d-pac-man-is-the-best-game-ive-played-in-2024-so-far)]
* [JavaScript](https://en.wikipedia.org/wiki/ECMAScript)
* JavaScript Web Applications. MacCaw, A. (2011) United-States: O'Reilly Media.
* Simplifying JavaScript: Writing Modern JavaScript with ES5, ES6, and Beyond. Joe Morgan, [https://pragprog.com/titles/es6tips/simplifying-javascript/](https://pragprog.com/titles/es6tips/simplifying-javascript/)
* Rediscovering JavaScript - Master ES6, ES7, and ES8. Venkat Subramaniam [https://pragprog.com/titles/ves6/rediscovering-javascript/](https://pragprog.com/titles/ves6/rediscovering-javascript/)

## Tasks

This is an individual lab in your `csi3x40_labs`
repository from previous labs.

### 1. Set Up Your Project

Create a branch `f-lab03` and push it
to
[GitHub](https://github.com/).

Create a directory `lab03`
(our working directory for this lab)
and commit empty `pacman.html`.

You can write all your javascript within `<script>` directly
within `pacman.html`, or link to an external file `pacman.js`.

You do not need to implement a functional visual game for
full marks, it is sufficient to _demonstrate_ the proper behaviour
of your code through "console.log()" like assertions.

Commit these changes and push to [GitHub](https://github.com/).

### 2. Implement Game Model (the game "board")

A 1D pacmac consists of

* 1 Pacman ("C")
* 1 Ghost ("^")
* 1 fruit ("@")
* m pellets (".")

Write a function `createGame(n)` that will place all game pieces into
an array of n.  There should be a pellet or fruit on every game piece
except the "C" square.

For example,

```javascript
createGame(10)
```

Should return something similar to

```javascript
[ ".", ".", ".", ".", "C", ".", ".", "@", ".", "^." ]
```

In this case, you are showing both the ghost (^) and the pellet (.)
on the board tile.  In future steps you might just show the ghost
as it would take prescendence.

Note: you do not need to the _render_ the game in HTML, but it can make
this a much more enjoyable exercise.

Commit these changes and push to [GitHub](https://github.com/).

### 3. Implement Pacman movements (left / right)

Write the functions `moveLeft(game)` and `moveRight(game)` that will
move the pacmac to the left or the right.  For now, PacMan will **not**
be _eating_ the pellets or Fruits.

For example

```javascript
moveLeft([ ".", ".", ".", ".", "C", ".", ".", "@", ".", "^." ])
```

Should return

```javascript
[ ".", ".", ".", "C.", "", ".", ".", "@", ".", "^." ]
```

Similarily, we can move pacman to the right.

```javascript
moveRight([ ".", ".", ".", ".", "C", ".", ".", "@", ".", "^." ])
```

Should return

```javascript
[ ".", ".", ".", ".", "", "C.", ".", "@", ".", "^." ]
```

Optional: You might notice it is desireable to know the index
of the C instead of _looking it up_ each time and adjusting
the board.  In doing so, you can also no longer need to track
both the "C" and "." on the same tile piece.  Update your
code to separate the "C" and "^" from the board tiles.

Commit these changes and push to [GitHub](https://github.com/).

### 4. Eating Pellets

Now we want to handle PacMan eating the pellets.  What 
are some things that we need to consider now (try not to read ahead)?

Two (hopeful) discoveries include

* We need to _process_ a move (e.g. C eating the pellet)
* We need to _store_ more informatino about the game (e.g. the score)

Update your game to process when "C" lands on a pellet.  Optinally
update the score as well.

Commit these changes and push to [GitHub](https://github.com/).

### 5. Completing a Level

What happens if C eats all the pellets?  We want to _advance_
to the next level, we also want to reset the pellets, the ghost and
maybe even pacman.

Implement the completion of a level.

Commit these changes and push to [GitHub](https://github.com/).

### 6. Move the Ghost

Now let's make the ghost move around.  You will need to implement
a strategy for the ghost to attack Pacman (and later on possibly a second stratgey for the ghost to avoid the Pacman).  Here is a simple strategy
to consider for your first attempt.

The ghost moves a random direction every 2 seconds.  Two methods
that will help you are `setTimeout` and `setInterval`.

Commit these changes and push to [GitHub](https://github.com/).


### 7. Optional: "Finish" the game

Continue working on the game.  For example, 

* Pacman eats a fruit
* Ghost kills Pacman
* Pacman has multiple lives
* Pacman (after eating fruit) kills Ghost
* "Celebration" pausing when level succeeded
* Managing High Scores
* Multiple / differ ghost attack strategies
* Arrow Keys to control Pacman
* Improved interface
* Automated tests

Commit these changes and push to [GitHub](https://github.com/).
