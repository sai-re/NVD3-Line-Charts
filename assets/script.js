(function ($) {
    
    //function to replace default values with real values
    function getValues(arrayName, file) {
        //short url for all files 
        var fileUrl = "http://localhost/sai-xampp/charts+filter/line/data/" + file + ".php";
        //create array with default values
        for (var i = 1; i <= 12; i++) {
            arrayName.push({
                x: i,
                y: 0
            })
        }
        //swaps default values with json values
        $.ajax({
            dataType: "json",
            url: fileUrl,
            async: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    //using month index from data as index for studentCount to match eachother
                    arrayName[data[i].month - 1].y = +data[i].count;
                }
            }
        });
    }//end function
    
    //array for x axis months
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //function to draw graphs
    function drawGraphs (graphName, callData, num) {
        nv.addGraph(function () {
            graphName = nv.models.lineChart()
                .options({
                    duration: 300,
                    useInteractiveGuideline: true
                });

            graphName.xAxis
                .axisLabel("Month")
                .tickValues([1,2,3,4,5,6,7,8,9,10,11,12]) //swaps numbers for months
                .tickFormat(function(d) {
                    return months[d-1];
                });

            graphName.yAxis
                .axisLabel('Count')
                .tickFormat(function (d) {
                    if (d == null) {
                        return 'N/A';
                    }
                    return d3.format()(d);
                });

            data = callData;

            d3.select('#chart'+num+'').append('svg')
                .datum(data)
                .call(graphName);

            nv.utils.windowResize(graphName.update);

            return graphName;
        });
    }//end function
    
    ////////////////////
    //AGE CHARTS
    var age;
    //GETTING DATA    
    function getData() {
        //DATA ARRAYS
        var ageOne = [],
            ageTwo = [],
            ageThree = [],
            ageFour = [];

        getValues(ageOne, "age/under-30");
        getValues(ageTwo, "age/30-40");
        getValues(ageThree, "age/40-60");
        getValues(ageFour, "age/over-60");

        return [
            {
                values: ageOne,
                key: "Under 30",
                color: "#1f77b4"
                },
            {
                values: ageTwo,
                key: "30-40",
                color: "#ff7f0e"
                },
            {
                values: ageThree,
                key: "40-60",
                color: "#2ca02c"
                },
            {
                values: ageFour,
                key: "Over 60",
                color: "#d62728"
            }
        ];
    }
    //DRAW GRAPH
    drawGraphs(age, getData(), 1);

    ////////////////////
    //NATIONALITY CHARTS
    var nationalityChart;
    //GETTING DATA    
    function getData2() {
        //DATA ARRAYS
        var african = [],
            american = [],
            australasia = [],
            british = [],
            european = [],
            farEast = [],
            middleEastern = [],
            russian = [],
            sAmerican = [];

        getValues(african, "nationality/african");
        getValues(american, "nationality/american");
        getValues(australasia, "nationality/australasia");
        getValues(british, "nationality/british");
        getValues(european, "nationality/european");
        getValues(farEast, "nationality/far-east");
        getValues(middleEastern, "nationality/middle-east");
        getValues(russian, "nationality/russian");
        getValues(sAmerican, "nationality/s-american");

        return [
            {
                values: african,
                key: "african",
                color: "#1f77b4"
                },
            {
                values: american,
                key: "american",
                color: "#ff7f0e"
                },
            {
                values: australasia,
                key: "australasia",
                color: "#2ca02c"
                },
            {
                values: british,
                key: "british",
                color: "#d62728"
                },
            {
                values: european,
                key: "european",
                color: "#aec7e8"
                },
            {
                values: farEast,
                key: "farEast",
                color: "#ffbb78"
                },
            {
                values: middleEastern,
                key: "middleEastern",
                color: "#98df8a"
                },
            {
                values: russian,
                key: "russian",
                color: "#ff9896"
                },
            {
                values: sAmerican,
                key: "sAmerican",
                color: "#9467bd"
            }
        ];
    }
    //DRAW GRAPH
    drawGraphs(nationalityChart, getData2(), 2);

    ////////////////////
    //RELATIONSHIP GRAPHS
    var relationship;
    //GETTING DATA
    function getData3() {

        //DATA ARRAYS
        var single = [],
            married = [],
            divorced = [],
            inRelationship = [],
            widowed = [];

        //GETTING DATA    
        getValues(single, "relationship/single");
        getValues(married, "relationship/married");
        getValues(divorced, "relationship/divorced");
        getValues(inRelationship, "relationship/in-relationship");
        getValues(widowed, "relationship/widowed");

        //line values and descriptions
        return [
            {
                values: single,
                key: "Single",
                color: "#1f77b4"
                },
            {
                values: married,
                key: "Married",
                color: "#ff7f0e"
                },
            {
                values: divorced,
                key: "Divorced",
                color: "#2ca02c"
                },
            {
                values: inRelationship,
                key: "In relationship",
                color: "#d62728"
                },
            {
                values: widowed,
                key: "Widowed",
                color: "#aec7e8"
            }
        ];
    }
    //DRAW GRAPH
    drawGraphs(relationship, getData3(), 3);

    //TABS
    $("#tab1").on('click', function () {
        openCity(event, 'age');
    });

    $("#tab2").on('click', function () {
        openCity(event, 'nationality');
    });

    $("#tab3").on('click', function () {
        openCity(event, 'relationship');
    });

    function openCity(evt, chartName) {
        // Declare all variables
        var i, tabcontent, tablinks;
        // Get all elements with class="tabcontent" and hide them
        tabcontent = $(".tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent.css("display", "none");
            tabcontent.css("visibility", "hidden");
        }
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = $(".tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        // Show the current tab, and add an "active" class to the link that opened the tab
        $("#" + chartName).css("display", "block");
        $("#" + chartName).css("visibility", "visible");
        evt.currentTarget.className += " active";
    }//end function
    
    //draws charts first then hides them, to avoid broken charts in tabs
    setTimeout(function() {
        $("#nationality, #relationship").css("display", "none");
    }, 500);

})(jQuery)//END JQUERY
