jQuery(function($) {

    // getting the 'd' parameter from URL 
    var dataFile = getParam("d");

    // getting the data
    $.getJSON("data/" + dataFile + ".js", function(datum) {
        var d = eval(datum); // storing data in 'd' variable
        console.log(d);
        $('#table').html('<table cellpadding="0" cellspacing="0" border="0" class="display compact" id="adjusted" width="100%"></table>');

        $('#adjusted').dataTable({
            "data": d.data,
            dom: '<"insertHeader">frtip',
            responsive: true,
            scrollY: d.height + 'px',
            scrollCollapse: false,
            paging: d.paging,
            aLengthMenu: [
                [10, 25, 50],
                [10, 25, 50]
            ],
            iDisplayLength: 10,
            order:[[d.col, d.desc_asc]],

            "columns": d.column_names
        });

        $("div.insertHeader").html("<div class='graphicHeader'>" + d.headline + "</div><br /><div class='explainer' id='headersub'>" + d.subhead + "</div>");
        $(".sourceline").html(d.sourceline);
        $(".smallByLine").html(d.byline);

        console.log("done");


    }).fail(function(jqxhr, settings, exception) {
        console.log(jqxhr, settings, exception); // spits out errors to console
    });



    // function to get parameters from url
    function getParam(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ").replace("/", ""));
    }


});
