# Adventure Capitalist
A sample simulation game inspired from http://en.gameslol.net/adventure-capitalist-1086.html. The theme of the game is playing like a capitalist who starts businesses and reinvest the profit again in same / other business to regenerate more profit, hires manager(s) to run the businesses without his intervention.

## Problem
1. To build a Simulation Game inspired from http://en.gameslol.net/adventure-capitalist-1086.html
2. To buy and upgrade businesses.
3. There should be several business types to choose from.
4. Make money from a business  (i.e. you click on a business and in a certain amount of time you get money)
5. Hire managers, so that money is made automatically.
6. When you close the game, next time you open it, you should see the money that your businesses made for you. (Businesses continue to make progress while you’re away.)

## Solution
1. The game developed shows a clean and minimalistic UI.
2. When loaded first time, it shows Buy button for all the businesses.
3. Player has a minimum balance to start with buying a business.
4. Player can start getting profit buy running the businesses manually by clicking on the Run button available after buying the business. It takes some time to get profit after Running the business.
5. When the player starts getting profit, they can Upgrade the existing businesses, Hire Managers to run the businesses automatically without Players manual intervention and can Buy new businesses also.
6. After Reaching certain thresholds of Business Level when Upgrading the business, the business Run time gets half that increases the speed of getting profit to double.
7. When the player is away, if a managered is hired for a particular business, the manager takes care of running of the business.
8. When the player closes the game and opens it later or just simply refreshes it, the game keeps the last progress of the player and resumes where the player left.

### Solution Area - Front-end
1. The main focus of the solution is on Front-end to make it clean and easily understandable by the player.
2. All the calculations and logics are run on the front-end only seeing the large number of processes running in a small amount of time.
3. If all these processes are linked to server then game will suffer due to network latency. The server suffer with large number of requests.

### Solution Area - Storage
1. As its just a sample game and due to less amount of time, the game is using localStorage API to store and retrieve the real-time data.
2. The advantage of using this is its speed, as it doesn't depends over the network.
3. The disadvantage is lack of security.

## Solution - Architecture
1. The architecture used here is the MVC architecture.
2. The reason behind using it seperate the controlling of business running process from the model and view because although its a simple game but there are number of things happening simultaneously and in a short amount of time, So its better to keep the controller seperate.
3. I used ES6 version of JavaScript that helps to code in JavaScript and in Object Oriented Approach that saved from using TypeScript and then converting it into the JavaScript.

## Trade-offs
1. If I had more time I will use a server as well and more secured way to store the data that is currently stored in localStorage.

## Hosted Demo Link
http://sanrachnatech.com/live/games/playco-code-challenge-2020/
