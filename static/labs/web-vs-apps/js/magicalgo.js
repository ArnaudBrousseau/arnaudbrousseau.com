//Here lies the magic

var magicAlgo = (function() {
  
  //This variable will hold all the parameters we get
  var params = {};
  
  /*
   This function evaluates the relevant parameters based on the scores
   of the different questions of the form. The parameters evaluated are:
   -Time 
    Marketing 
    Monetization
    Irrational reasons
    Device support
    Computation complexity
    Real-time constraints
    Use of native features 
    Network connectivity
    Technologies maturity
   */
  var evaluate = function(form) {
    params = {}; //clean our object, in case it's dirty
    
    var deadlines = form.find("input[type=range]").each(function() {
      var rangeId = $(this).attr("id");
      var rangeValue = $(this).val();
      
      params[rangeId] = parseInt(rangeValue);
    });
    
    console.log("Here comes the params", params);
    return params;
  };
  
  var secretDarkSauce = function() {
    //Just a joke to make you see this file :)
  };
  
  var computeResults = function() {
    
    //Initialisation
    var resultsObj = {
      "native": {
        "name": "Native applications",
        "advices":[],
        "score":0
      },
      "shell": {
        "name": "Shell applications",
        "advices":[],
        "score":0
      },
      "web": {
        "name": "Web applications",
        "advices":[],
        "score":0
      }
    };
    
    //Let's define shortcuts, just because we can
    var web = resultsObj.web,
        nat = resultsObj.native,
        shell = resultsObj.shell;

    /**************
     * Skills *****
     **************/

    var webSkills = params['skills-html'] + params['skills-css'] + params['skills-javascript'];
    var javaSkills = params['skills-java'];
    var objcSkills = params['skills-objc'];
    var deadlines = params['project-deadlines']; 

    if (webSkills >= 9) { 
      web.score += 5*deadlines;
      web.advices.push("You seem proficient with Web technologies.");
      shell.score += 3*deadlines;
      shell.advices.push("You can build shell apps with your Web skills using a cross-compiler.");
    }
    if (javaSkills >=3) {
      nat.score += 3*deadlines;
      nat.advices.push("You're a Java guy.");
    }
    if (objcSkills >= 3) {
      nat.score += 3*deadlines;
      nat.advices.push("You know Obj-C.")
    }
    
    /**************
     * Support ****
     **************/
    
    var desktop = params['support-desktop'];
    var ios = params['support-ios'];
    var android = params['support-android'];
    var blackberry = params['support-blackberry'];
    var symbian = params['support-symbian'];
    var windows = params['support-windows']; 
    
    var supportSum = desktop+ios+android+blackberry+symbian+windows;
    console.log("support sum:", supportSum);
    if (desktop == 4) {
      var webOnly = true;
      web.score += 50;
      web.advices.push("You have to support Web browsers.");
    }
    if (supportSum >= 18) {
      var broadSupport = true;
      web.score += 20;
      web.advices.push("You are planning to support a wide range of devices.");
    }
    if ( (ios == 4 && supportSum < 8) 
        || (android == 4 && supportSum < 8)
        || (windows == 4 && supportSum < 8)
        || (blackberry == 4 && supportSum < 8)
        || (symbian == 4 && supportSum < 8)) {
      var nativeOnly = true;
      nat.score += 50;
      nat.advices.push("You are planning to support mainly one device family only.");
    }

    /**************
     * Money ******
     **************/

    var moneyImportance = params['money-importance'];
    var ads = params['money-ads'];
    var paid = params['money-paid'];
    var payments = params['money-payments'];
    var premium = params['money-premium'];

    if (paid >=3) {
      nat.score += paid * moneyImportance;
      nat.advices.push("Paid application dowload is important to you");
    }
    if (ads >= 3) {
      web.score += ads * moneyImportance;
      shell.score += ads * moneyImportance;
    }

    /**************
     * Irrational *
     **************/
    
    if (params['market-web'] == 4) {
      web.score += 20;
      web.advices.push("You want to be available on the Open Web");
    }
    if (params['market-web'] == 0 
        || params['market-appstore'] == 4
        || params['market-android'] == 4
        || params['market-blackberry'] == 4
        || params['market-windows'] == 4
        || params['market-ovi'] == 4) {
      nat.score += 20;
      nat.advices.push("Apparently, native markets count a lot for you.");
    }

    /**************
     * Features ***
     **************/
    
    if (params['features-onlinedata'] == 4) {
      web.score += 10;
      shell.score += 10;
    }
    if (params['features-bluetooth'] == 4) {
      nat.score += 20;
      nat.advices.push("Bluetooth is required")
    }
    if (params['features-accelerometer'] == 4) {
      nat.score += 20;
      nat.advices.push("You will use accelerometer");
    }
    if (params['features-notifications'] == 4) {
      nat.score += 20;
      nat.advices.push("You will use push notifications");
    }
    if (params['features-responsive'] == 4) {
      nat.score += 10;
      nat.advices.push("You need near real-time computation");
    }
    
    /**************
     * Marketing **
     **************/
    
    if (params['marketing-markets'] == 4) {
      nat.score += 10;
      nat.advices.push("You are planning to advertize in a marketplace");
    }
    
    /**************
     * Misc *******
     **************/

    if (params['project-html5'] > 2) {
      web.score += 10;
      shell.score += 5;
    }
    if (params['project-html5'] < 2) {
      nat.score += 10;
      shell.score += 2;
    }
    if (params['project-ux'] > 2) {
      nat.score += 10;
      shell.score += 2;
    }
    if (params['project-innovation'] > 2) {
      web.score += 5;
    }



    //MOCKUP WORK.
    //Let's say our algortithm does this
    //resultsObj.native.score = 33;
    //resultsObj.web.score = 42;
    //resultsObj.shell.score = 20;
    //resultsObj.native.advices = [
    //    "It seems you are proficient with Web technologies. We advise that you look use a cross-compiler to build your Web applications. +10pts", 
    //    "You could build native applications, but your timing is short. +5pts"];
    //resultsObj.web.advices = [
    //    "You are proficient with Web technologies. +30pts", 
    //    "You're planning to support multiple devices. +5pts"];
    //resultsObj.shell.advices = [
    //    "Planning to support multiple devices. +10pts", 
    //    "Proficient with Web technologies. +15pts"];
    
    //Transform our obj to HTML string for displaying it
    return formatResults(resultsObj);
  };
  
  //Helper, private function
  var formatResults = function(resultsObj) {
    
    var resultsStr = "";
    //Just for fun, really
    var footer = "<footer>Disclaimer: this advice is provided \"as is\", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringment. In no event shall I be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from out or in connection with the software the use or other dealings in the software. </footer>";
    
    var result, i;
    for (i=0; i<3; i++) {
      result = pickWinner(resultsObj, i); //picks the winner among the different solutions
      resultsStr += formatResult(result);
    }

    return resultsStr + footer;
  };
  
  var pickWinner = function(resultsObj, position) {
    var solutions = [
        {"name":"web", "score": resultsObj.web.score},
        {"name":"shell", "score":resultsObj.shell.score},
        {"name":"native", "score":resultsObj.native.score}];
        //console.log("Non sorted solutions: ", solutions);
    
    //Sorts the array in descending order via "sort of" bubble sort.
    if(solutions[0].score < solutions[1].score) {
      var temp = solutions[1];
      solutions[1] = solutions[0];
      solutions[0] = temp; 
    }
    if(solutions[1].score < solutions[2].score) {
      temp = solutions[2];
      solutions[2] = solutions[1];
      solutions[1] = temp; 
    }
    if(solutions[0].score < solutions[1].score) {
      var temp = solutions[1];
      solutions[1] = solutions[0];
      solutions[0] = temp; 
    }
    //console.log("sorted solutions: ", solutions);
    return resultsObj[solutions[position].name];
  };
  
  var formatResult = function(result) {
    
    var i=0, 
        advices = result.advices,
        listStr= "";
    for (i;i<advices.length;i++) {
      listStr += "<li>" + advices[i] + "</li>";
    }
    
    //Scores are displayed with a minimum font-size of 16px
    var fontSize = 16;
    if (result.score > 16) {fontSize = result.score;}

    var resultStr = "<article>" 
                    + "<h2>" + result.name + "<span style=\"font-size:" + fontSize + "px;\">" + result.score + "</span>" + "</h2>"
                    + "<ul>" + listStr + "</ul>"
                    + "</article>";
    return resultStr;
  };
  
  
  
  return {
    secretDarkSauce: secretDarkSauce, 
    evaluate: evaluate,
    computeResults: computeResults,
    params: params
  };
  
})();
