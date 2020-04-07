---
title: "Has Overwatch become more repetitive? A statistical answer"
date: 2020-01-12
---

<style>
.formula { height: 60px; position: relative; }
.formula span { position: absolute; }
.up, .down { font-weight: bold; }
.up { color: green; }
.down { color: red; }
</style>

I'm a big fan of [Overwatch][overwatch], Blizzard's FPS. Something about it
keeps calling me back to play, season after season. I've been playing since the
very first competitive season.

Lately I've felt like the game is more repetitive. Teams draw from a reduced
set of heroes. It feels like the same teams face each other. Can we quantify
this with statistics?

## Genesis

![Overwatch Release](/img/overwatch-release.jpg)

On May 24th, Overwatch was released with a pool of 21 heroes: Tracer, Reaper,
Widowmaker, Pharah, Reinhardt, Mercy, Torbjörn, Hanzo, Winston, Zenyatta,
Bastion, Symmetra, Zarya, McCree, Soldier: 76, Lúcio, Roadhog, Junkrat, D.Va,
Mei and Genji.

On June 28th 2016 competitive play is released. Rules are simple: teams
are 6 vs 6, and each player can pick from a pool of 21 heroes. How many
possible teams does that leave us with?

Assembling an Overwatch team means picking 6 heroes among 21. Since order of
heros doesn't matter we're dealing with a _combination_ of 6 heroes out of a
set of 21. And since we can pick the same hero multiple times, we're dealing
with a _multicombination_ (in early competitive overwatch, a team of 6
Winstons was allowed!). In mathematical terms we have a **6-multicombination
from a 21-set**. Formula for this:

<div class="formula">
<span style="top: 0px; left: -2px; font-size: 40px; font-weight: 100;">⟨</span>
<span style="top: 0px; left: 3px; font-size: 40px; font-weight: 100;">⟨</span>
<span style="top: 4px; left: 20px;">n</span>
<span style="top: 27px; left: 20px;">k</span>
<span style="top: 0px; left: 34px; font-size: 40px; font-weight: 100;">⟩</span>
<span style="top: 0px; left: 40px; font-size: 40px; font-weight: 100;">⟩</span>
<span style="top: 16px; left: 56px;">=</span>
<span style="top: 0px; left: 70px; font-size: 40px; font-weight: 100;">⟨</span>
<span style="top: 4px; left: 85px;">n + k - 1</span>
<span style="top: 27px; left: 115px;">k</span>
<span style="top: 0px; left: 157px; font-size: 40px; font-weight: 100;">⟩</span>
<span style="top: 16px; left: 173px;">=</span>
<span style="top: 4px; left: 196px;">(n + k - 1)!</span>
<span style="top: 31px; left: 190px; border-top: 1px solid #222">(k! × (n - 1)!)</span>
</div>

We can compute this for `k=6` and `n=21`:

<div class="formula">
<span style="top: 4px; left: 5px;">(21 + 6 - 1)!</span>
<span style="top: 31px; left: 0px; border-top: 1px solid #222">(6! × (21 - 1)!)</span>
<span style="top: 16px; left: 130px;">=</span>
<span style="top: 16px; left: 156px; font-weight: bold">230,230 different teams</span>
</div>

## One hero per team
On July 19th 2016 we went from a system which allowed to pick multiple of the
same heroes to one hero per team. This is actually a fairly significant change!
We are going from multicombination to simple combination with no repetition.
The formula becomes:

<div class="formula">
<span style="top: 0px; left: 0px; font-size: 40px; font-weight: 100;">⟨</span>
<span style="top: 4px; left: 20px;">n</span>
<span style="top: 27px; left: 20px;">k</span>
<span style="top: 0px; left: 34px; font-size: 40px; font-weight: 100;">⟩</span>
<span style="top: 16px; left: 56px;">=</span>
<span style="top: 4px; left: 114px;">n!</span>
<span style="top: 31px; left: 77px; border-top: 1px solid #222">k! × (n - k)!</span>
</div>

Computing this for `k=6` and `n=21`:

<div class="formula">
<span style="top: 4px; left: 43px;">21!</span>
<span style="top: 31px; left: 0px; border-top: 1px solid #222">6! × (21 - 6)!</span>
<span style="top: 16px; left: 122px;">=</span>
<span style="top: 16px; left: 145px; font-weight: bold">54,264 different teams</span>
</div>

Substantial difference indeed! We've lost 76% of the possible teams compared to what we started with.

## New characters to the rescue!

![New Overwatch Heroes](/img/overwatch-new-heroes.png)

Over time Blizzard has added new heroes to the game:

<ul>
<li>Ana (#22) is added on July 19th 2016. This gives 74,613 teams (<span class="down">-67%</span> compared to genesis)</li>
<li>Sombra (#23) is added on November 15th 2016: 100,947 teams (<span class="down">-56%</span>)</li>
<li>Orisa (#24) is added on March 21st 2017: 134,596 teams (<span class="down">-42%</span>)</li>
<li>Doomfist (#25) is added on July 27th 2017: 177,100 teams (<span class="down">-23%</span>)</li>
<li>Moira (#26) is added on November 16th 2017: 230,230 teams (<em>same than genesis exactly!</em>)</li>
<li>Brigitte (#27) is added on March 20th 2018: 296,010 teams (<span class="up">+29%</span>)</li>
<li>Wrecking Ball (#28) is added on July 24th 2018: 376,740 teams (<span class="up">+64%</span>)</li>
<li>Ashe (#29) is added on November 13th 2018: 475,020 teams (<span class="up">+106%</span>)</li>
<li>Baptiste (#30) is added on March 19th 2019: 593,775 teams (<span class="up">+158%</span>)</li>
<li>Sigma (#29) is added on August 13th 2019: 736,281 teams (<span class="up">+220%</span>)</li>
</ul>

I was surprised/pleased to see how much new heroes contributed to the overall
complexity of the game. We've had almost 2 years (Nov 2017 to Sept 2019) during
which the game was **more** complex than when it was released, despite the new
"one hero per team" restriction.

## Enters Role Queue

![Overwatch Role Queue](/img/overwatch-role-queue.jpg)

On September 1st 2019 Blizzard launched Role Queue, a system which enforces a
2-2-2 composition for competitive teams. 2 tank, 2 damage, and 2 support
heroes. How does this affect the possible teams? Let's find out.

The 31 heroes are divided as follow:
* 8 tank heroes: D.Va, Orisa, Reinhardt, Roadhog , Sigma, Winston, Wrecking Ball, Zarya
* 16 damage characters: Ashe, Bastion, Doomfist, Genji, Hanzo, Junkrat, McCree, Mei, Pharah, Reaper, Soldier: 76, Sombra, Symmetra, Torbjörn, Tracer, Widowmaker
* 7 support characters: Ana, Baptiste, Brigitte, Lúcio, Mercy, Moira, Zenyatta

A competitive team is now defined by 3 sub-teams. Each sub-team is a
2-combination. And the 3 sub-teams can be combined independently (no
restriction). So, if X, Y and Z are the number of sub-teams for each hero
class, the number of competitive teams is X × Y × Z.


<div class="formula">
<span style="top: 16px; left: 0px;">Number of teams =</span>
<span style="top: 0px; left: 174px; font-size: 40px; font-weight: 100;">⟨</span>
<span style="top: 4px; left: 190px;">8</span>
<span style="top: 27px; left: 190px;">2</span>
<span style="top: 0px; left: 203px; font-size: 40px; font-weight: 100;">⟩</span>
<span style="top: 16px; left: 219px;">×</span>
<span style="top: 0px; left: 232px; font-size: 40px; font-weight: 100;">⟨</span>
<span style="top: 4px; left: 245px;">16</span>
<span style="top: 27px; left: 252px;">2</span>
<span style="top: 0px; left: 267px; font-size: 40px; font-weight: 100;">⟩</span>
<span style="top: 16px; left: 281px;">×</span>
<span style="top: 0px; left: 293px; font-size: 40px; font-weight: 100;">⟨</span>
<span style="top: 4px; left: 307px;">7</span>
<span style="top: 27px; left: 307px;">2</span>
<span style="top: 0px; left: 318px; font-size: 40px; font-weight: 100;">⟩</span>
<span style="top: 16px; left: 334px;">=</span>
<span style="top: 16px; left: 350px;">70,560 (-70%)</span>
</div>

Pretty big dip in complexity!

Fun fact: if we had an even split (10 tank, 11 damage, and 10 support heroes) we'd have 111,375 possible teams instead of ~70k.

Another fun thought: to get back to the initial number of possible teams
(~230k), we'd need 5 extra heroes in support/tank (giving 10/16/10 for
tank/damage/support counts) or..._13 extra damage heroes_ if we keep support/tank
pools at their current capacity (giving 8/29/7 for tank/damage/support).

The limiting factor in complexity right now is the disproportionately small
pool of support and tank heroes.

## Conclusion

Until now I didn't realize how much new heroes contributed to the overall
complexity of Overwatch. My initial feeling as a player is not backed by
statistics. There was big chunk of time during which the game was significantly
**more** complex than when it launched due to new heroes added.

What statistics did confirm however: the introduction of Role Queue caused the
number of possible teams to go drastically down. That's not a bad thing
necessarily: many team compositions outside of 2-2-2 weren't viable for
competitive play. But it does make the game more repetitive. We'll have to wait
until Blizzard introduces a few new heroes to experience higher levels of
complexity once again. Or maybe another game will come first...

![Overwatch 2](/img/overwatch-2.jpg)

[overwatch]: https://playoverwatch.com
