(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "apiKey": "3ba22e48229d4b18a6734fcdfcd25847"
}
},{}],2:[function(require,module,exports){
var CONFIG = require('./config.json');
var api_key = CONFIG.apiKey;

$(document).ready(function() {
    $("#search-button").on("click", function() {
        $("#show-results").empty();
        var user_input = "";
        var limit = 0;
        var start_year = "";
        var end_year = "";
        var new_date = new Date();
        user_input = $("#searchTerm").val();
        var params = {'api-key': api_key};
        if (user_input != "") {
            params.q = user_input;
        }
        var selectedOption = $("#records-number option:selected");
        limit = selectedOption.val();
        if ($("#start-year").val() != "") {
            start_year = new_date.setFullYear($("#start-year").val(), 01, 01);
            params.begin_date = start_year;
        }
        if ($("#end-year").val() != "") {
            end_year = new_date.setFullYear($("#end-year").val(), 01, 01);
            params.end_date = end_year;
        }
        
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param(params);

        $.ajax({
        url: url,
        method: 'GET',
        }).done(function(result) {
        var response_list = result.response.docs
        var records;
        if (limit > 0) {
            records = limit;
        }
        else {
            records = response_list.length;
        }

        for(var i=0; i < records; i++) {
            var headline = $("<div>");
            var p1 = $("<p>").text("Headline: " + response_list[i].headline.main);
            var p2 = $("<p><a href=>" + response_list[i].web_url + "</a></p>");
            var p3 = $("<p>");
            p3.text("Source: " + response_list[i].source);
            headline.append(p1);
            headline.append(p2);
            headline.append(p3);
            headline.append($("<br>"));
            $("#show-results").append(headline);
        }
    }).fail(function(err) {
        throw err;
      });
    });

    $("#clear-button").on("click", function() {
        $("#show-results").empty();
    });
});
},{"./config.json":1}]},{},[2]);
