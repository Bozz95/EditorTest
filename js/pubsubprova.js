(function ($) {

    var o = $({});

    $.subscribe = function () {
        o.on.apply(o, arguments);
    };

    $.unsubscribe = function () {
        o.off.apply(o, arguments);
    };

    $.publish = function () {
        o.trigger.apply(o, arguments);
    };

}(jQuery));


;
(function ($) {

    var pippo = $("#userTemplate");
    console.log(pippo);
    // Pre-compile templates and "cache" them using closure
    var
        userTemplate = _.template($("#userTemplate").html()),
        ratingsTemplate = _.template($("#ratingsTemplate").html());

    /*var
    userTemplate = _.template(window.document.getElementById("userTemplate").innerHTML),
    ratingsTemplate = _.template(window.document.getElementById("ratingsTemplate").innerHTML);*/

    // Subscribe to the new user topic, which adds a user
    // to a list of users who have submitted reviews
    $.subscribe("/new/user", function (e, data) {

        if (data) {

            $('#users').append(userTemplate(data));

        }

    });

    // Subscribe to the new rating topic. This is composed of a title and
    // rating. New ratings are appended to a running list of added user
    // ratings.
    $.subscribe("/new/rating", function (e, data) {

        if (data) {

            $("#ratings").append(ratingsTemplate(data));

        }

    });

    // Handler for adding a new user
    $("#add").on("click", function (e) {

        e.preventDefault();

        var strUser = $("#twitter_handle").val(),
            strMovie = $("#movie_seen").val(),
            strRating = $("#movie_rating").val();

        // Inform the application a new user is available
        $.publish("/new/user", {
            name: strUser
        });

        // Inform the app a new rating is available
        $.publish("/new/rating", {
            title: strMovie,
            rating: strRating
        });

    });

})(jQuery);

;
(function ($) {

    // Pre-compile template and "cache" it using closure
    var resultTemplate = _.template($("#resultTemplate").html());

    // Subscribe to the new search tags topic
    $.subscribe("/search/tags", function (e, tags) {
        $("#lastQuery")
            .html("<p>Searched for:<strong>" + tags + "</strong></p>");
    });

    // Subscribe to the new results topic
    $.subscribe("/search/resultSet", function (e, results) {

        $("#searchResults").empty().append(resultTemplate(results));

    });

    // Submit a search query and publish tags on the /search/tags topic
    $("#flickrSearch").submit(function (e) {

        e.preventDefault();
        var tags = $(this).find("#query").val();

        if (!tags) {
            return;
        }

        $.publish("/search/tags", [$.trim(tags)]);
        var ciccio = [];
        

    });


    // Subscribe to new tags being published and perform
    // a search query using them. Once data has returned
    // publish this data for the rest of the application
    // to consume

    $.subscribe("/search/tags", function (e, tags) {

        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
                tags: tags,
                tagmode: "any",
                format: "json"
            },

            function (data) {

                if (!data.items.length) {
                    return;
                }

                $.publish("/search/resultSet", {
                    items: data.items
                });
            });

    });


})(jQuery);