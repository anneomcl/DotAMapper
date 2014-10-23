DotaMapper
=====

CS 467 Social Visualization Project
---------------------------------------------
## Overview
There is a lot of cool game data, but not many cool visualizations about them. We think both gamers and game designers will get much more useful information through visualizing game statistics.

Furthermore, professional gamers rely on 1) tournaments and 2) replay streams for income. The latter is the only steady source. Therefore, professional gamers need to know which games are entertaining, which are successful, and why.

Our map takes DotA2 replays and algorithmically generates a map that will allow gamers to visualize what makes a match successful and entertaining through various maps. Our audience is specific to advanced players with a deeper understanding of the game.

## People 
+ Anne McLaughlin
+ Faizaan Mahmud
+ Xuefeng Zhu 
+ Teddy Marszalek

 
## Web application(Part1)
For the web application, we demonstrate two visualizations. The demo can be find at http://xuefeng-zhu.github.io/DotaMapper/part1/#/main

The first visualization we are trying to show how kill/death ratio (a ratio often used to represent a player's individual skill; a higher ratio indicates more skill) will influence the viewers vote for the match. User can just provide matchID and then click "Visualize". For example, 613379400 as matchID. The page will switch the visualization, and at bottom, the user can provide extra matchID to add more data the graph. We write the code to fetch data from steamAPI, process them, and use [Google Chart](https://google-developers.appspot.com/chart/) to draw the scatter plot. 

The second visualization we show how gold can influence a player's performance in the game. Gold is used to buy items that can make or break a game, so this is measuring generally how items affect performance.
User can just provide matchID and then click "Visualize". For example, 613379400 as matchID. We write the code to fetch data from steamAPI, process them, and use [D3Plus](http://d3plus.org/) to draw the treemap. 

If you want to run the application offline, just go to the application folder in terminal and then run "python -m SimpleHTTPServer" Then visit localhost:8000

Since the Steam API has cross domain restriction, we also write a server side code to wrap arround it. The code is available [here](https://github.com/Xuefeng-Zhu/DotaMapper-server)


## Static page(Part2)
This is an example of how the above statistics and visualizations can be shown on the in-game map. The web application could be extended to generate a map like this for any matchID.

Sample outputs of the code can be seen in the "Sample Maps" folder. One map is a visualization of a single game, and the other is a visualization of nearly 3000 games aggregated to one map. 

Green dots are players on the Radiant team (in the lower left corner) and red dots are players on the Dire team (in the upper right corner). "Rank" is calculated by considering their xp/min and gold/min. Players with high rank are further along one of the three "lanes". Players with heroes that tend to be top, bottom or middle are placed in those lanes. "Size" is calculated with the kill-death-ratio, with larger circles denoting lots of kills and few deaths.  

The 2000games sample shows that people with very low kd-ratios also have low rank, since they are tiny circles that are closer to the base. People with high kd-ratios have higher rank. One Dire player had a high enough rank that they were in the Radiant base. In general, however, our visualization shows a nice approximate correlation between kd-ratio and rank.

In the 1game sample, the Dire team won. While a glance shows that both teams had a similar rank on average, the larger size (high kd-ratio) of the Dire player in the top lane likely allowed the team to "snowball" (a term used to denote the point that a game dramatically shifts in favor of a certain team with little hope of it shifting back) to victory.

This map was implemented by crawling for replay files and using the Steam API to parse them. A standard in-game map was used in conjunction with Java code to create a coordinate system, calculate size and rank, as well as to plot the players.

