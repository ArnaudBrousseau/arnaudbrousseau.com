// Hints, printed when user selects a choice
// Like any good programer would do, we count from 0. Don't be surpised that 
// median choice is 2 :)

var hints = {
  //Skills are rated from 0 to 4
  "skills": [
      "What's that?",
      "I've read/heard about it", 
      "I've done a couple of tutorials",
      "Solid knowledge",
      "I'm a ninja"
  ], 
  //Device support. Default:0
  "support": [
      "Not important",
      "Why not? Maybe in the future",
      "I don't know",
      "Planing to support it",
      "Required. No way around that."
  ],
  //Default for markets is 2
  "markets": [
      "Not wanted. Meaning...really not.",
      "Not really",
      "Don't care",
      "Would be nice",
      "Absolutely. Yes."
  ],
  //Default to 0. We are not greedy!
  "money-importance": [
      "Not important at all",
      "Not really important",
      "I don't know",
      "This will be a second source of revenue",
      "Important. I do this app to earn some money."
  ],
  //Strategy, also defaults to 2
  "money-strategy": [
      "No",
      "Probably not",
      "No idea",
      "Part of my strategy",
      "First source of revenue"
  ],
  //Marketing, Default: 2
  "marketing": [
      "No",
      "Probably no",
      "Don't know",
      "Probably yes",
      "Yes"
  ],
  //The "do you agree?" questions. Defaults:2
  "agree": [
      "Not at all",
      "Not really...",
      "Don't know",
      "Maybe, yes...",
      "Yes, sure!"
  ],
  //Features. Default: 2
  "features": [
      "Not using it",
      "Probably not",
      "I don't know",
      "That's part of the plan",
      "Yes! That's a MUST have."
  ]
};
