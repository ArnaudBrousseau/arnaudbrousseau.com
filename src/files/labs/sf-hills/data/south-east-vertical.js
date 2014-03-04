var streetCrossings = {
  "Steuart St": ["Market St", "Mission St", "Howard St"], 
  "Spear St": ["Market St", "Mission St", "Howard St", "Folsom St", "Harisson St"],
  "Main St": ["Market St", "Mission St", "Howard St", "Folsom St", "Harisson St", "Bryant St"],
  "Beale St": ["Market St", "Mission St", "Howard St", "Folsom St", "Harisson St", "Bryant St"],
  "Fremont St": ["Market St", "Mission St", "Howard St", "Folsom St", "Harisson St"],
  "1st St": ["Market St", "Mission St", "Howard St", "Folsom St", "Harisson St"],
  "2nd St": ["Market St", "Mission St", "Howard St", "Folsom St", "Harisson St", "Bryant St", "Brannan St", "Townsend St"],
  "3rd St": [
    "Market St", "Mission St", "Howard St", "Folsom St", "Harisson St", "Bryant St", "Brannan St", "Townsend St", "King St",
    "Terry A Francois Blvd", "Channel St", "Mission Rock St", "China Basin St", "Nelson Rising Ln", "16th St", "Mariposa St",
    "18th St", "19th St", "20th St", "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St", "Cargo Way",
    "Custer Ave", "Evans Ave", "Galvez Ave", "Hudson Ave", "Innes Ave", "Jerold Ave", "Kirkwood Ave", "La salle ave", 
    "McKinnon Ave", "NewComb Ave", "Oakdale Ave", "Palou Ave", "Quesada Ave", "Revere Ave", "Shafter Ave", "Thomas Ave",
    "Underwood Ave", "Van Dyke Ave", "Wallace Ave", "Yosemite Ave", "Armstrong Ave", "Carroll Ave", "Egbert Ave", "Fitzgerald Ave", 
    "Gilman Ave", "Hollister Ave", "Ingerson Ave", "Jamestown Ave", "Key Ave", "Le Conte Ave", "Meade Ave"],
  "4th St": [
    "Market St", "Mission St", "Howard St", "Folsom St", "Harisson St", "Bryant St", "Brannan St", "Townsend St", "King St",
    "Channel St", "Mission Rock St", "China Basin St", "Nelson Rising Ln", "16th St"],
  "5th St": ["Market St", "Mission St", "Howard St", "Folsom St", "Harisson St", "Bryant St", "Brannan St", "Townsend St"],
  "6th St": ["Market St", "Mission St", "Howard St", "Folsom St", "Harisson St", "Bryant St", "Brannan St", "Townsend St"],
  "7th St": [
    "Market St", "Mission St", "Howard St", "Folsom St", "Harisson St", "Bryant St", "Brannan St", "Townsend St", "King St",
    "Beary St", "Hooper St", "Irwin St", "16th St"],
  "8th St": ["Market St", "Mission St", "Howard St", "Folsom St", "Harisson St", "Bryant St", "Brannan St", "Townsend St"],
  "9th St": ["Market St", "Mission St", "Howard St", "Folsom St", "Harisson St", "Bryant St", "Brannan St", "Division St"],
  "10th St": ["Market St", "Mission St", "Howard St", "Folsom St", "Harisson St", "Bryant St", "Division St"],
  "11th St": ["Market St", "Mission St", "Howard St", "Folsom St", "Harisson St", "Bryant St"],
  "South Van Ness Ave": [
    "Market St", "Mission St", "Howard St", "14th St", "15th St", "16th St", "17th St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St"],
  "Mission St": [
    "South Van Ness Ave", "Duboce Ave", "14th St", "15th St", "16th St", "17th St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St", "Precita Ave", "Powers Ave", "Fair Ave", 
    "Virginia Ave", "Godeus Ave", "Eugenia Ave", "Kingston Ave", "Cortland Ave", "Santa Marina St", "Appleton Ave", 
    "Highland Ave", "Park St", "Richland Ave", "Crescent Ave", "Murray St", "Alemany Blvd", "Trumbul St", "Ney St", "Maynard St", 
    "Silver Ave", "Avalon Ave", "Excelsior Ave", "Brazil Ave", "Persia Ave", "Russia Ave", "France Ave", "Amazon Ave", "Geneva Ave", 
    "Rolph St", "Allison St", "Concord St", "Florentine St", "Guttenberg St", "Lowell St", "Whittier St", "Oliver St", "Acton St", 
    "Templeton Ave", "Evergreen Ave", "Crocker Ave", "Wellington Ave", "John Daly Blvd", "Vista Grande Ave", "Parkview Ave", 
    "Westlake Ave", "Citrus Ave", "Bismark Ave", "E Cavour St", "E Moltke St", "Garibaldi St", "Price St", "Castle St"],  
  "Valencia St": [
    "Market St", "Duboce Ave", "14th St", "15th St", "16th St", "17th St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St", "Mission St"],
  "Guerrero St": [
    "Market St", "Duboce Ave", "14th St", "15th St", "16th St", "17th St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St", "27th St", "Duncan St", "28th St"],
  "Dolores St": [
    "Market St", "14th St", "15th St", "16th St", "17th St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St", "27th St", "Duncan St", "28th St", "valley St", 
    "29th St", "Day St", "30th St", "San Jose Avenue"],
  "Church St": [
    "Duboce Ave", "Market St", "15th St", "16th St", "17th St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St", "27th St", "Duncan St", "28th St", "valley St", 
    "29th St", "Day St", "30th St", "randall St"],
  "Sanchez St": [
    "Duboce Ave", "14th St", "Market St", "16th St", "17th St", "18th St", "19th St", "20th St", "21st St", "22nd St", "23rd St", 
    "24th St", "25th St", "26th St", "Cesar Chavez St", "27th St", "Duncan St", "28th St", "valley St", "29th St", 
    "Day St", "30th St", "randall St"],
  "Noe St": [
    "Duboce Ave", "14th St", "15th St", "Market St", "17th St", "18th St", "19th St", "20th St", "21st St", "22nd St", "23rd St", 
    "24th St", "25th St", "26th St", "Cesar Chavez St", "27th St", "28th St", "valley St", "29th St", "Day St", "30th St", 
    "Laidley St"],
  "Castro St": [
    "Duboce Ave", "14th St", "15th St", "16th St", "Market St", "18th St", "19th St", "20th St", "21st St", "22nd St", "23rd St", 
    "24th St", "25th St", "26th St", "Cesar Chavez St", "27th St"], 
  "Castro St.": ["28th St", "valley St", "29th St", "Day St", "30th St"],
  "Collingwood St": ["Market St", "18th St", "19th St", "20th St", "21st St", "22nd St"],
  "Diamond St": [
    "17th St", "18th St", "19th St", "20th St", "21st St", "22nd St", "23rd St", "Elizabeth St", "24th St", "Jersey St", "25th St", 
    "Clipper St", "26th St", "Cesar Chavez St", "27th St","Duncan St", "28th St", "29th St", "Beacon St"],
  "Eureka St": ["17th St", "18th St", "19th St", "20th St", "21st St", "22nd St", "23rd St"],
  "Douglass St": [
    "17th St", "18th St", "19th St", "20th St", "21st St", "22nd St", "23rd St", "Elizabeth St", "24th St", "Jersey St", "25th St", 
    "Clipper St", "26th St", "Cesar Chavez St", "27th St","Duncan St", "28th St"],
  "Hoffman Ave": ["22nd St", "Alvarado St", "23rd St", "Elizabeth St", "24th St", "25th St"],
  "Shotwell St": [
    "14th St", "15th St", "16th St", "17th St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St", "Precita Ave"],
  "Folsom St": [
    "12th St", "13th St", "14th St", "15th St", "16th St", "17th St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St", "Precita Ave", "Stoneman St", "Ripley St"],
  "Harrison St": [
    "12th St", "13th St", "14th St", "15th St", "16th St", "17th St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St", "Precita Ave"],
  "Treat Ave": ["16th", "17th", "18th"],
  "Treat Ave.": ["20th St", "21st St", "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St"],
  "Alabama St": [
    "15th St", "16th St", "17th St", "Mariposa St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St", "Precita Ave"],
  "Florida St": [
    "Division St", "16th St", "17th St", "Mariposa St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St", "Precita Ave"],
  "Bryant St": [
    "13th St", "Alameda St", "15th St", "16th St", "17th St", "Mariposa St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St", "Precita Ave"],
  "York St": [
    "Mariposa St", "18th St", "19th St", "20th St", "21st St", "22nd St", "23rd St", "24th St", "25th St", 
    "26th St", "Cesar Chavez St", "Peralta Ave"],
  "Hampshire St": [
    "17th St", "Mariposa St", "18th St", "19th St", "20th St", "21st St", "22nd St", "23rd St", "24th St", "25th St", 
    "26th St", "Cesar Chavez St"],
  "Portrero Ave": [
    "Alameda St", "15th St", "16th St", "17th St", "Mariposa St", "18th St", "19th St", "20th St", "21st St",
    "22nd St", "23rd St", "24th St", "25th St", "Cesar Chavez St"],
  "Utah St": ["Alameda St", "15th St", "16th St", "17th St", "Mariposa St", "18th St"],
  "Utah St.": ["23rd St", "24th St", "25th St"],
  "San Bruno Ave": ["Alameda St", "15th St", "16th St", "17th St", "Mariposa St"],
  "San Bruno Ave.": ["18th St", "19th St", "20th St"],
  "San Bruno Ave..": ["23rd St", "24th St", "25th St"],
  "Vermont St.": ["Division St", "Alameda St", "15th St", "16th St", "17th St", "Mariposa St", "18th St", "19th St", "20th St", "22nd St"],
  "Vermont St": ["22nd St", "23rd St", "24th St", "25th St"],
  "Kansas St": [
    "Alameda St", "15th St", "16th St", "17th St", "Mariposa St", "18th St", "19th St", "20th St", "22nd St", "23rd St", 
    "24th St", "25th St", "26th St"],
  "Rhode Island St": [
    "Division St", "Alameda St", "15th St", "16th St", "17th St", "Mariposa St", "18th St", "19th St", "20th St", "22nd St", 
    "23rd St", "24th St", "25th St", "26th St"],
  "De Haro St": [
    "Division St", "Alameda St", "15th St", "16th St", "17th St", "Mariposa St", "18th St", "19th St", "20th St", "22nd St", 
    "23rd St", "24th St", "25th St", "26th St"],
  "Carolina St": ["15th St", "16th St", "17th St", "Mariposa St", "18th St"],
  "Carolina St.": ["20th St", "22nd St", "23rd St", "Wisconsin St"],
  "Wisconsin St": ["16th St", "17th St"],
  "Wisconsin St.": ["19th St", "20th St", "22nd St", "Madera St", "23rd St", "Connecticut St", "25th St", "26th St"],
  "Arkansas St": ["16th St", "17th St", "Mariposa St", "18th St", "19th St", "20th St", "Madera St", "23rd St"],
  "Connecticut St": ["16th St", "17th St", "Mariposa St", "18th St", "19th St", "20th St"],
  "Missouri St": ["16th St", "17th St", "Mariposa St", "18th St", "19th St", "20th St", "22nd St", "Turner Terrace", "Watchman Way"],
  "Texas St": ["17th St", "Mariposa St", "18th St", "19th St", "20th St", "Sierra St", "22nd St"],
  "Mississippi St": ["16th St", "17th St", "Mariposa St", "18th St", "19th St", "20th St", "22nd St"],
  "Pennsylvania Ave": ["17th St", "Mariposa St", "18th St", "19th St", "20th St", "22nd St", "23rd St", "25th St", "Cesar Chavez St"],
  "Indiana St": [
    "Mariposa St", "18th St", "19th St", "20th St", "22nd St", "23rd St", "25th St", "26th St", "Cesar Chavez St", 
    "Marin St", "Tulare St"],
  "Minnesota St": ["Mariposa St", "18th St", "19th St", "20th St", "22nd St"],
  "Minnesota St.": ["23rd St", "24th St", "25th St", "26th St", "Cesar Chavez St"],
  "Tennesse St": ["Mariposa St", "18th St", "19th St", "20th St", "22nd St"],
  "Tennesse St.": ["23rd St", "24th St", "25th St"], 
  "Tennesse St..": ["26th St", "Cesar Chavez St", "Marin St"],
  "Illinois St": [
    "16th St", "Mariposa St", "18th St", "19th St", "20th St", "22nd St", "23rd St", "24th St", "25th St", 
    "Cesar Chavez St", "Marin St", "Amador St"] 
}