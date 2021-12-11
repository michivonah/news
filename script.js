// Swiss RSS Feed Mix: https://www.rssmix.com/u/13497479/rss.xml

function greetings(){
  if(localStorage.getItem('name') != null){
    var name = localStorage.getItem('name');
  }
  else{
    var name = "";
  }
  var timeNow = new Date();
  if(timeNow.getHours() > 5 && timeNow.getHours() < 11){
    document.getElementById('greetings').innerHTML = "Good morning " + name + "!";
  }
  else if(timeNow.getHours() > 11 && timeNow.getHours() < 13){
    document.getElementById('greetings').innerHTML = "Good meal " + name + "!";
  }
  else if(timeNow.getHours() > 13 && timeNow.getHours() < 17){
    document.getElementById('greetings').innerHTML = "Good afternoon " + name + "!";
  }
  else if(timeNow.getHours() > 17 && timeNow.getHours() < 19){
    document.getElementById('greetings').innerHTML = "Good evening " + name + "!";
  }
  else{
    document.getElementById('greetings').innerHTML = "Good night " + name + "!";
  }
}

function nextWelcomePage(currentPageName, nextPageName){
  // exit = end
  if(nextPageName == "exit"){
    localStorage.setItem('tutorials', "version0_0_6");
    // yourNameField
    localStorage.setItem('name', document.getElementById("yourNameField").value);
    greetings();
    addNewFeed("setup");
    loadFeed("defaultRSS");
    document.getElementById(currentPageName).style.display = "none";
    document.getElementById("tutorials").style.display = "none";
  }
  else{
    document.getElementById(currentPageName).style.display = "none";
    document.getElementById(nextPageName).style.display = "block";
  }
}

function resetApp(){
  if(confirm(localStorage.getItem('name') + ", are you sure you want to reset the app?") == true){
    sessionStorage.clear();
    localStorage.clear();
    alert("Your data is cleared!");
    location.reload();
  }
}

function loadFeed(rssType){
  // check if the app is offline
  if(navigator.onLine == false) alert("Hi " + localStorage.getItem('name') + ", I think your internet connection is lost. Can you check it?");
  //
  document.getElementById("feed").innerHTML = ''; // clear feed
  if(localStorage.getItem('feed0') != null){
    //var feedUrl = localStorage.getItem('feed0');
    if(localStorage.getItem('numberOfFeeds') == null) localStorage.setItem('numberOfFeeds', 0);
    if(localStorage.getItem('numberOfFeeds') >= 0){
        //var tempNum1 = 0;
        var feedUrl = localStorage.getItem('feed0');
        //var tempNum1 = parseInt(localStorage.getItem('numberOfFeeds'), 10);
      }
      else{
        var feedUrl = localStorage.getItem('feed0');
      }
  }

  var loadFeedCounter = 0;
  var maxCounter = parseInt(localStorage.getItem('numberOfFeeds'), 10) + 1;
  var tempNum1 = 0;
  while(loadFeedCounter < maxCounter){
    loadFeedCounter++; // load next feed
    //var rssType = "defaultRSS";

    var feedUrl = localStorage.getItem('feed' + tempNum1);
    var tempNum1 = tempNum1 + 1;

    if(rssType == "defaultRSS"){
      let numberOfNews = 0;
      let newscount = 0;
      while (newscount < localStorage.getItem('NumberOfFeedItems')) {
        newscount++;
        let numberOfNews = newscount;
      $.getJSON("https://api.factmaven.com/xml-to-json/?xml=" + feedUrl, function(data) {
        var imageURLfromFeed = data.rss.channel.item[numberOfNews].description.substring(data.rss.channel.item[numberOfNews].description.indexOf('"') + 1, data.rss.channel.item[numberOfNews].description.lastIndexOf('.jpg')) + ".jpg";
        newFeedItem(data.rss.channel.item[numberOfNews].title, imageURLfromFeed, data.rss.channel.item[numberOfNews].description.replace(/<.*>/, ''), data.rss.channel.item[numberOfNews].link);
      });

      }
    }
    else if(rssType == "google-alert"){
      var numberOfNews = 0;
      $.getJSON("https://api.factmaven.com/xml-to-json/?xml=" + feedUrl, function(data) {
        newFeedItem(data.feed.entry[numberOfNews].title.text, "", data.feed.entry[numberOfNews].content.text, data.feed.entry[numberOfNews].link.href);
      });
    }
    else if(rssType != null){
      $.getJSON("https://api.factmaven.com/xml-to-json/?xml=" + feedUrl, function(data) {
        newFeedItem(data.rss.channel.item[numberOfNews].title, "", data.rss.channel.item[numberOfNews].description.replace(/<.*>/, ''), data.rss.channel.item[numberOfNews].link);
      });
    }

  };


}

function newFeedItem(title, image, desc, url){
  var feed = document.getElementById("feed");

  if(sessionStorage.getItem('feedCounter') == null){
    sessionStorage.setItem('feedCounter', 0);
  }
  var feedCounter = sessionStorage.getItem('feedCounter');
  feedCounter++;

  var newEntry = document.createElement('div');
  newEntry.id = "feedID" + feedCounter;
  newEntry.classList = "news-object";
  //newEntry.setAttribute('data-aos', 'fade-left');

  var newTitle = document.createElement('h1');
  newTitle.textContent = title;

  var newDesc = document.createElement('p');
  newDesc.textContent = desc;

  var newDescDiv = document.createElement('div');
  newDescDiv.classList = "news-description";

  if(image != null){
    var newImage = document.createElement('img');
    newImage.src = image;
  }

  var newBtn = document.createElement('button');
  newBtn.id = "feedButtonID" + feedCounter;
  var newI = document.createElement('i');
  if(/iPhone|iPad/i.test(navigator.userAgent)){
    newI.classList = "ai-heart news-object-i";
  }
  else{
    newI.classList = "ai-heart";
  }
  newBtn.appendChild(newI);
  newBtn.addEventListener("click", function(){
    readLater();
  });

  newEntry.addEventListener("click", function(){
    window.open(url);
  });

  newEntry.appendChild(newTitle);
  if(image != null){
    newEntry.appendChild(newImage);
  }
  newDescDiv.appendChild(newDesc);
  newDescDiv.appendChild(newBtn);
  newEntry.appendChild(newDescDiv);
  feed.appendChild(newEntry);
}

function readLater(){
  alert("Hey " + localStorage.getItem('name') + " the read later function is coming soon.");
  window.event.stopPropagation();
}

function addNewFeed(mode){
  if(mode == null){
    var feedUrl = prompt("RSS Feed:", "");
    if(feedUrl.toLowerCase().includes('https://')){
      if(localStorage.getItem('numberOfFeeds') == null) localStorage.setItem('numberOfFeeds', 0);
      if(localStorage.getItem('numberOfFeeds') >= 0){
        var tempNum = localStorage.getItem('numberOfFeeds');
        tempNum++;
        localStorage.setItem('numberOfFeeds', tempNum)
        localStorage.setItem('feed' + tempNum, feedUrl);
      }
      else{
        localStorage.setItem('numberOfFeeds', 1);
        localStorage.setItem('feed0', feedUrl);
      }
    }
    else{
      alert("Hey " + localStorage.getItem('name') + " your RSS Feed URL is invalid.");
    }
    //alert("Feed successfully saved.");
    loadFeed("defaultRSS");
  }
  else if(mode == "setup"){
    if(document.getElementById('firstRssFeed').value.toLowerCase().includes('https://')){
      localStorage.setItem('feed0', document.getElementById('firstRssFeed').value);
    }
    else{
      alert("Hey " + localStorage.getItem('name') + " your RSS Feed URL is invalid.");
    }
  }


  var newFeed = document.createElement('div');
  //newFeed.id = "feedUrlId" + feedCounter;
  newFeed.classList = "all-feed-items";

  var newFeedName = document.createElement('p');
  newFeedName.textContent = localStorage.getItem('feed0');

  var newFeedI = document.createElement('i');
  newFeedI.classList = "ai-newspaper";

  var newFeedBtn = document.createElement('button');
  //newFeedBtn.id = "feedButtonID" + feedCounter;
  var newFeedI2 = document.createElement('i');
  newFeedI2.classList = "ai-cross";
  newFeedBtn.appendChild(newFeedI2);

  newFeed.appendChild(newFeedI);
  newFeed.appendChild(newFeedName);
  document.getElementById("all-feeds").appendChild(newFeed);

  if(mode == "loadFromStorage"){
    if(localStorage.getItem('firstRssFeed') != null){
      console.log("Try to load your feed. (" + localStorage.getItem('firstRssFeed') + ")");
    }
    var tempLoadCounter = 1;
    while(tempLoadCounter <= parseInt(localStorage.getItem('numberOfFeeds'), 10)){
      var newFeed = document.createElement('div');
      //newFeed.id = "feedUrlId" + feedCounter;
      newFeed.classList = "all-feed-items";

      var newFeedName = document.createElement('p');
      newFeedName.textContent = localStorage.getItem('feed' + tempLoadCounter);

      var newFeedI = document.createElement('i');
      newFeedI.classList = "ai-newspaper";

      var newFeedBtn = document.createElement('button');
      //newFeedBtn.id = "feedButtonID" + feedCounter;
      var newFeedI2 = document.createElement('i');
      newFeedI2.classList = "ai-cross";
      newFeedBtn.appendChild(newFeedI2);

      newFeed.appendChild(newFeedI);
      newFeed.appendChild(newFeedName);
      document.getElementById("all-feeds").appendChild(newFeed);

      tempLoadCounter++;
    }


  }

}

function updateNumberOfFeedItems(){
  localStorage.setItem('NumberOfFeedItems', parseInt(document.getElementById('maxNewsPerSite').value));
}

function showSection(sectionName){
  var section = document.getElementById(sectionName);
  document.getElementById("home").style.display = "none";
  document.getElementById("read-later").style.display = "none";
  document.getElementById("settings").style.display = "none";
  section.style.display = "block";
}

function createJSON(type){
  var storage = new Object();
  storage.name = localStorage.getItem('name');
  storage.tutorials = localStorage.getItem('NumberOfFeedItems');
  storage.NumberOfFeedItems = localStorage.getItem('NumberOfFeedItems');
  //storage.NumberOfFeeds = 1;
  storage.feed0 = localStorage.getItem('feed0');
  storage.feeds = [];
  var feedData = new Object();
  feedData.name = "test";
  feedData.url = localStorage.getItem('feed0');
  storage.feeds.push(feedData, feedData);
  var storageJSON = JSON.stringify(storage);
  localStorage.setItem('storage', JSON.stringify(storage));
  console.log(storage);
  console.log(storageJSON);
  console.log(JSON.parse(localStorage.getItem('storage')).name);
  //console.log(JSON.parse(localStorage.getItem('storage')).feeds[1].url);
  //console.log(JSON.parse(localStorage.getItem('storage')).feeds.length);
}

function startGame(){
  console.log("This function is coming soon!");
}
