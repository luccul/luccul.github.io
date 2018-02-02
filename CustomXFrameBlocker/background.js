var HEADERS_TO_STRIP_LOWERCASE = [
  'content-security-policy',
  'x-frame-options',
];

chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function (tabs) {
        tabURL = tabs[0].url;
    });
    if(tabURL.includes('ballotready.org')){
        return {
            responseHeaders: details.responseHeaders.filter(function(header) {
            return HEADERS_TO_STRIP_LOWERCASE.indexOf(header.name.toLowerCase()) < 0;
        })
    };
    }else{return details;}
  }, {
    urls: ["<all_urls>"]
  }, ["blocking", "responseHeaders"]);

