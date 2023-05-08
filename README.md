# Full Stack Sudoku

This repository contains a fully working sudoku game, with admin page for analytics and user information.

## Soft Skills Assesed:

1) Critical thinking - Solving the puzzle swiftly and accurately requires intelligent thinking.
2) Time Management - The running time gives a sense of time management.
3) Patience - it takes a good amount of time to solve such a puzzle so patience is necessary.
4) Attention to details - A wrong placement of a number could lead to a dead end.
5) Problem solving skills - Good amount of brain power and smart technique to solve such a puzzle.

## Sudoku puzzle solving techniques:

There are several ways to solve a Sudoku puzzle, but one of the most common techniques is the following:

1) Look for singletons: Identify any cells that have only one possible value based on the numbers already present in the same row, column, and 3x3 square. Fill in that value.

2) Look for hidden singles: Identify any rows, columns, or 3x3 squares where only one number is missing. Fill in that number.

3) Look for pairs, triples, and quadruples: Identify any pairs, triples, or quadruples of cells in a row, column, or 3x3 square that can only contain the same set of two, three, or four numbers. Eliminate those numbers as possibilities from other cells in the same row, column, or 3x3 square.

4) Use "what if" scenarios: If you're stuck, try guessing a number and filling it in. Then, see if you can use logic to eliminate possibilities and narrow down the correct answer. If you end up with a contradiction, you know that your guess was incorrect, and you can try another number.


## Sudoku puzzle dead-ends:

Some of the possible scenarios of a dead-end are:

1) Contradictions: If you make a mistake and end up with a contradiction, such as two of the same number in the same row or column, you'll need to backtrack and try a different approach.

2) Unsolvability: Some Sudoku puzzles are unsolvable or have multiple solutions. If you've tried all the possible techniques and still can't fill in all the cells, it's possible that the puzzle is unsolvable or has multiple solutions.

3) Stuck: It's possible to get stuck and not be able to make any progress using the above techniques. In this case, you may need to take a break and come back with fresh eyes, or try a different technique such as brute-forcing or using advanced logic.

**Note:** It is guaranteed that the random sudoku puzzle generated in the website is always solvable.

## Steps to setup the project:

**Note:** Make sure you have node and npm installed on your system before following this setup guide. For more information on how to install node on your system, follow this <a href="https://nodejs.dev/en/learn/how-to-install-nodejs/">link</a>.

1) Clone the repository by using ```git clone```.
   
2) After cloning is done, open up the cloned folder in the terminal and use ```npm i``` command to install node modules.

3) After node modules are installed, write the ```npm start run``` command to start the app on port 3000.

4) Visit [localhost:3000](http://localhost:3000/) to use the app.

## Checklist of implemented features:

* Must Have Features 
- [x] User can create an account and login using email and password.
- [x] User has to find the clues and it is guaranteed that there are atleast 5 clues in the whole puzzle.
- [x] User can play and complete a sudoku game.
- [x] User can reach more than 2 dead-ends in a game.
- [x] The always has one unique solution.
- [x] All progress/user data is stored and retrieved when required.
- [x] On refreshing or changing the browser, user progress is restored.
- [x] Admin dashboard is working and shows all the required data.

<hr/>

* Additional Features
- [x] Data Analytics using graphs is shown in admin page.
- [x] User leader board is shown for both the user and admin.

## Addtional Information:

* The app is hosted on firebase. You can visit the app [here](https://elitmus-163bf.web.app/).

* If you find it difficult to solve the puzzle and want to get the solution anyway, you can use my [Sudoku Solution App](https://sudoku-solver-a4f72.web.app/) to do so.