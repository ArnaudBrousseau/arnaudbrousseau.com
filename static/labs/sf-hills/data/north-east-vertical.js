var streetCrossings = {
  "Lyon St": ["Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", "Filbert St", "Union St", "Green St"], 
  "Lyon St.": [
    "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", "Sacramento", "California", "Pine", "Bush St", "Sutter St", 
    "Post St", "Geary Blvd", "O'Farrell"], 
  "Lyon St..": ["Turk St", "Golden Gate Ave", "Mc Allister St", "Fulton St", "Grove St", "Hayes St", "Fell St"], 
  "Lyon St...": ["Oak St", "Page St", "Haight St"], 
  "Baker St": [
    "Marina Blvd", "Jefferson St", "Beach St", "North Point St", "Bay St", "Francisco St", "Chestnut St", "Lombard St", 
    "Greenwich St", "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", 
    "Clay", "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary Blvd"], 
  "Baker St.": [
    "Terra Vista Ave", "Anza Vista Ave", "Turk St", "Golden Gate Ave", "Mc Allister St", "Fulton St", "Grove St", "Hayes St", 
    "Fell St", "Oak St", "Page St", "Haight St"],
  "Broderick St": [
    "Marina Blvd", "Jefferson St", "Beach St", "North Point St", "Bay St", "Francisco St", "Chestnut St", "Lombard St", 
    "Greenwich St", "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", 
    "Clay", "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary Blvd"], 
  "Broderick St.": [
    "O'Farrell St", "Ellis St", "Eddy St", "Turk St", "Golden Gate Ave", "Mc Allister St", "Fulton St", "Grove St", "Hayes St", 
    "Fell St", "Oak St", "Page St", "Haight St", "Waller St"],
  "Divisadero St": [
    "Marina Blvd", "Jefferson St", "Beach St", "North Point St", "Bay St", "Francisco St", "Chestnut St", "Lombard St", 
    "Greenwich St", "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", 
    "Clay", "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary Blvd", "O'Farrell St", "Ellis St", 
    "Eddy St", "Turk St", "Golden Gate Ave", "Mc Allister St", "Fulton St", "Grove St", "Hayes St", "Fell St", "Oak St", "Page St", 
    "Haight St", "Waller St", "Duboce Ave", "14th St"],
  "Scott St": [
    "Marina Blvd", "Jefferson St", "Beach St", "North Point St", "Bay St", "Francisco St", "Chestnut St", "Lombard St", 
    "Greenwich St", "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", 
    "Clay", "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary Blvd", "O'Farrell St", "Ellis St", 
    "Eddy St", "Turk St", "Golden Gate Ave", "Mc Allister St", "Fulton St", "Grove St", "Hayes St", "Fell St", "Oak St", "Page St", 
    "Haight St", "Waller St", "Duboce Ave"],
  "Pierce St": [ 
    "Beach St", "Capra Way", "Alhambra St", "Chestnut St", "Lombard St", "Greenwich St", "Filbert St", "Union St", "Green St", 
    "Vallejo St", "Broadway", "Pacific Ave", "Jackson St"], 
  "Pierce St.": ["Clay", "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St"], 
  "Pierce St..": ["O'Farrell St", "Ellis St", "Eddy St", "Turk St", "Golden Gate Ave", "Mc Allister St", "Fulton St"],
  "Pierce St...": ["Grove St", "Hayes St", "Fell St", "Oak St", "Page St", "Haight St", "Waller St"],
  "Steiner St": [
    "Chestnut St", "Lombard St", "Greenwich St", "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", 
    "Jackson St", "Washington St", "Clay", "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary Blvd", 
    "O'Farrell St", "Ellis St", "Eddy St", "Turk St", "Golden Gate Ave", "Mc Allister St", "Fulton St", "Grove St", "Hayes St", 
    "Fell St", "Oak St", "Page St", "Haight St", "Waller St", "Hermann St", "Duboce Ave"],
  "Fillmore St": [
    "Marina Blvd", "Jefferson St", "Beach St", "Noth Point St", "Bay St","Chestnut St", "Lombard St", "Greenwich St", 
    "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", 
    "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary Blvd", "O'Farrell St", "Eddy St", "Turk St", 
    "Golden Gate Ave", "Mc Allister St", "Fulton St", "Grove St", "Hayes St", "Fell St", "Oak St", "Page St", "Haight St", 
    "Waller St", "Hermann St", "Duboce Ave"],
  "Webster St": ["Jefferson St", "Beach St", "Noth Point St", "Bay St"],
  "Webster St.": ["Chestnut St", "Lombard St", "Greenwich St", "Filbert St", "Union St", 
    "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", "Sacramento", "California",
    "Pine", "Bush St", "Sutter St", "Post St", "Geary Blvd", "Ellis St", "Eddy St", "Turk St", "Golden Gate Ave", 
    "Mc Allister St", "Fulton St", "Grove St", "Hayes St", "Fell St", "Oak St", "Page St", "Haight St", "Waller St", "Hermann St" ],
  "Buchanan St": ["Marina Blvd", "North Point St", "Bay St"], 
  "Buchanan St.": [
    "Chestnut St", "Lombard St", "Greenwich St", "Filbert St", "Union St", 
    "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", "Sacramento", "California",
    "Pine", "Bush St", "Sutter St", "Post St", "Geary Blvd"], 
  "Buchanan St..": [
    "Eddy St", "Turk St", "Golden Gate Ave", "Mc Allister St", "Fulton St", "Grove St", "Hayes St", 
    "Fell St", "Oak St", "Page St", "Haight St", "Hermann St", "Waller St", "Market St"],
  "Laguna St": [
    "Marina Blvd", "North Point St", "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", "Filbert St", "Union St", 
    "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", "Sacramento", "California",
    "Pine", "Bush St", "Sutter St", "Post St", "Geary Blvd", "O'Farell St", "Ellis St", "Eddy St", "Turk St", "Golden Gate Ave", 
    "Mc Allister St", "Fulton St", "Grove St", "Hayes St", "Fell St", "Oak St", "Page St", "Haight St", "Waller St", "Hermann St" ],
  "Octavia St": [
    "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", "Filbert St", "Union St", "Green St",
    "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St"],
  "Octavia St.": ["Sacramento", "California", "Pine", "Bush St", "Sutter St"],
  "Octavia St..": ["Fulton St", "Grove St", "Hayes St", "Fell St", "Oak St", "Page St", "Haight St", "Market St" ],
  "Gough St": [
    "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", "Filbert St", "Union St", "Green St",
    "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", "Sacramento", "California",
    "Pine", "Bush St", "Sutter St", "Post St", "Geary Blvd", "O'Farell St", "Ellis St", "Eddy St", "Turk St",
    "Golden Gate Ave", "Mc Allister St", "Fulton St", "Grove St", "Hayes St", "Fell St", "Oak St", "Page St",
    "Haight St", "Market St" ],
  "Franklin St": [
    "Funston Rd", "MacArthur Ave", "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", "Filbert St", "Union St", 
    "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", "Sacramento", "California",
    "Pine", "Bush St", "Sutter St", "Post St", "Geary St", "O'Farell St", "Ellis St", "Eddy St", "Turk St",
    "Golden Gate Ave", "Mc Allister St", "Fulton St", "Grove St", "Hayes St", "Fell St", "Oak St", "Page St", "Market St" ],
  "Van Ness Ave": [
    "Nort Point Ave", "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", "Filbert St", "Union St", "Green St",
    "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", "Sacramento", "California",
    "Pine", "Bush St", "Sutter St", "Post St", "Geary St", "O'Farell St", "Ellis St", "Eddy St", "Turk St",
    "Golden Gate Ave", "Mc Allister St", "Grove St", "Hayes St", "Fell St", "Oak St", "Market St" ],
  "Polk St": [
    "Beach St", "Nort Point Ave", "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", "Filbert St", "Union St", 
    "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", "Sacramento", "California",
    "Pine", "Bush St", "Sutter St", "Post St", "Geary St", "O'Farell St", "Ellis St", "Eddy St", "Turk St",
    "Golden Gate Ave", "Mc Allister St", "Grove St", "Hayes St", "Market St" ],
  "Larkin St": [
    "Beach St", "Nort Point Ave", "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", "Filbert St", "Union St", 
    "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", "Sacramento", "California",
    "Pine", "Bush St", "Sutter St", "Post St", "Geary St", "O'Farell St", "Ellis St", "Eddy St", "Turk St",
    "Golden Gate Ave", "Mc Allister St", "Fulton St", "Grove St", "Hayes St", "Market St" ],
  "Hyde St": [
    "Jefferson St", "Beach St", "Nort Point St", "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", 
    "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", 
    "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary St", "O'Farell St", "Ellis St", "Eddy St", 
    "Turk St", "Golden Gate Ave", "Mc Allister St", "Fulton St", "Grove St", "Market St" ],
  "Leavenworth St": [
    "Jefferson St", "Beach St", "Colombus Ave", "Nort Point St", "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", 
    "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", 
    "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary St", "O'Farell St", "Ellis St", "Eddy St", 
    "Turk St", "Golden Gate Ave", "Mc Allister St" ],
  "Jones St": [
    "Jefferson St", "Beach St", "Nort Point St", "Bay St", "Colombus Ave", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", 
    "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", 
    "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary St", "O'Farell St", "Ellis St", "Eddy St", 
    "Turk St", "Golden Gate Ave", "Mc Allister St", "Market St" ],
  "Taylor St": [
    "Jefferson St", "Beach St", "Nort Point St", "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", 
    "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", 
    "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary St", "O'Farell St", "Ellis St", "Eddy St", 
    "Turk St", "Golden Gate Ave"], 
  "Mason St": [
    "Jefferson St", "Beach St", "Nort Point St", "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", 
    "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", 
    "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary St", "O'Farell St", "Ellis St", "Eddy St", 
    "Turk St", "Market St"],
  "Powell St": [
    "Jefferson St", "Beach St", "Nort Point St", "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", 
    "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", 
    "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary St", "O'Farell St", "Ellis St", "Market St"],
  "Stockton St": [
    "Beach St", "Nort Point St", "Bay St", "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", 
    "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", 
    "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary St", "O'Farell St", "Ellis St"],
  "Grant Ave": [
    "Francisco St", "Chestnut St", "Lombard St", "Greenwich St", 
    "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", 
    "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary St", "O'Farell St"],
  "Grant Avenue": ["The Embarcadero", "North Point St"],
  "Kearny St": [
    "Filbert St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", 
    "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Geary St"],
  "Kearny Street": ["North Point St", "Bay St", "Francisco St"],
  "Montgomery St": [
    "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", "Washington St", "Clay", 
    "Sacramento", "California", "Pine", "Bush St", "Sutter St", "Post St", "Market St"],
  "Montgomery Street": ["Francisco St", "Chestnut St", "Lombard St"],
  "Sansome St": [
    "Chestnut St", "Lombard St", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", 
    "Washington St", "Clay", "Sacramento", "California", "Pine", "Bush St", "Sutter St"],
  "Battery St": [
    "The Embarcadero", "Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St", 
    "Washington St", "Clay", "Sacramento", "California", "Pine", "Bush St", "Market St"],
  "Front St": ["Union St", "Green St", "Vallejo St", "Broadway", "Pacific Ave", "Jackson St"],
  "Front Street": [ "Clay", "Sacramento", "California", "Pine St", "Market St"], 
  "Davis St": ["Vallejo St", "Broadway", "Jackson St"],
  "Davis Street": ["Washington St", "Clay", "Sacramento", "California", "Market St"],
  "Drumm St": ["Washington St", "Clay", "Sacramento", "California", "Market St"]
};