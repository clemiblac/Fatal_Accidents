

/// route name
var accidents="/data/fatal";

//////////////HHHHHHH///////////
d3.json(accidents).then((data)=>{
    //console.log(data);
    /// Heat map ///
    
    /// Day of the week ///
    //count crashes
    var week_day=data.map(t=>t.DAY_WEEK)
    //console.log(week_day)

    var result = { };
    for(var i = 0; i < week_day.length; ++i) {
        if(!result[week_day[i]])
            result[week_day[i]] = 0;
        ++result[week_day[i]];
    }
    //console.log(result)


    var day=Object.keys(result)
    console.log(day)
    var count_crashes=Object.values(result)
    console.log(count_crashes)



    //Sum deaths by day of the week
    var result = [];
    data.reduce(function(res, value) {
    if (!res[value.DAY_WEEK]) {
        res[value.DAY_WEEK] = { DAY_WEEK: value.DAY_WEEK, DEATHS: 0 };
        result.push(res[value.DAY_WEEK])
    }
    res[value.DAY_WEEK].DEATHS += value.DEATHS;
    return res;
    }, {});

    //console.log(result)

    function compare(a, b) {
        const caseA = a.DAY_WEEK;
        const caseB = b.DAY_WEEK;
        
        let comparison = 0;
        if (caseA > caseB) {
            comparison = 1;
        } else if (caseA < caseB) {
            comparison = -1;
        }
        return comparison * 1;
    }
        
    var sort_weekday=result.sort(compare)
    //console.log(sort_weekday)

    var count_deaths=sort_weekday.map(t=>t.DEATHS)
    console.log(count_deaths)

  
    var trace1 = {
        x: day,
        y: count_crashes,
        name:"crashes",
        type: 'scatter'
      };
      
      var trace2 = {
        x: day,
        y: count_deaths,
        name:"deaths",
        type: 'scatter'
      };
      
      var data = [trace1, trace2];

      var layout = {
        title: {
            text:'Fatalities by day of the week',
            font: {
              family: 'Courier New, monospace',
              size: 18
            },
            xref: 'paper',
            x: 0.05,
          },
        xaxis: {title:"day of the week",
                size: 18,
                autotick: false,
                ticks: 'outside',
                tick0: 0,
                dtick: 1,
                ticklen: 8,
                tickwidth: 4,
                tickcolor: '#000'
            },
        yaxis: {title:"count by day",automargin: true,},
        autosize: true,
        width: 500,
        height: 500,
        margin: {
            l: 100,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
        },
        showlegend: true,
        legend: {
            x: 0,
            y: 1,
            traceorder: 'normal',
            font: {
              family: 'sans-serif',
              size: 12,
              color: '#000'
            },  
        
        }
        }
        var config = {responsive: true};
      
      Plotly.newPlot('day-of-week', data,layout,config);

    


  
})


