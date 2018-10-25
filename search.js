
$(document).ready(function() {
    $("#search-button").on("click", function() {
        console.log("pushed submit");
        var api_key = "3ba22e48229d4b18a6734fcdfcd25847";
        var user_input = $("#searchTerm").val();
        var limit = 10;
        var start_year = $("#start-date").val();
        var end_year = $("#end-date").val();
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        
        url += '?' + $.param({
        'api-key': api_key,
        'q': user_input,
        'begin_date': start_year,
        'end_date': end_year
        });

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
            //
            $("#show-results").append(headline);
        }
    });
    });

    $("#clear-button").on("click", function() {
        $("#show-results").empty();
    });
});