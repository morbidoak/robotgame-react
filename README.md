## Contents
 - [About project](#about)
 - [Robot Game rules](#rules)
 - [Download & Run localдy](#run)
 - [ToDo list](#todo)

<a name="about"></a>

## About project
This is educational website-game for kids (and adults too, why not), based on 1st part of [A.Shen and D.Shkolnik programming course](https://www.mccme.ru/shen/progbook/part1.pdf). It is designed to teach programming basics: opertors, conditions, cycles and their invariants, subprograms with recursion.

Last version is available on http://robotgame.oakela.org

<a name="rules"></a>

## Robot game rules
*Obvious things should be said more often for that they remain so.*

### Program
Program consists from one or several procedures.

Procedure is a sequence of commands:
 - ***step north/south/east/west*** - Robot makes a step to neighbour cell in target direction. If a wall blocks his way - robot breaks down and program stops.
 - ***paint*** - Robot paints cell under him.
 - ***if*** - Consists of condition and sequence of commands, witch will be executed if condition is true.
 - ***while*** - Like ***if***, but sequence will be executed while condition is true.
 - ***call*** - Runs another procedure. It is possible to run procedure from itself to make a recursion.

Conditions in ***if*** and ***while*** are one of:
 - ***north/south/east/west free*** - True if target direction is open.
 - ***painted*** - True if cell under the robot is painted.
 - ***not {condition}*** - True if ***{condition}*** is false.
 - ***{condition} and {condition}*** - True if both of conditions are true.
 - ***{condition} or {condition}*** - True if at least one of conditions is true.

You can drag&drop commands and condition from instruments panel (on the right) to procedures. To remove some use big red dustbin.

### Game field
Drag&drop robot to change his start position.
Click on cell to add or remove paint.
Click between cells to add or remove walls.

You can run your robot program on normal speed, tripple speed or step-by-step. Field and program can be editted only when robot is stopped.

<a name="run"></a>

## Download & Run locally

Install npm, if you haven't. For example:
```bash
curl https://npmjs.org/install.sh | sh
```
clone this repository:
```bash
cd /path/to/projects
git clone https://github.com/morbidoak/robotgame-react
```
go to it:
```bash
cd robotgame-react
```
install dependencies:
```bash
npm install
```
and run:
```bash
npm run
```

<a name="todo"></a>

## ToDo list
- [X] Write Readme.md
- [X] Publish project on hosting
- [ ] Interactive tutorial
- [ ] Prepare lessons (texts, tasks, examples)
- [ ] Autotests for tasks
- [ ] Optimize treatments of program tree (src/functions/mapProgram.js). Maybe switch to fully binary tree (if add an option (command) = (command)(command)) 
- [ ] Find someone qualified to draw better design

