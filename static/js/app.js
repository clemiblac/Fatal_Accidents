

/// route name
var accidents="static/js/fatal_accidents.json";
//var accidents="/data/fatal";

d3.json(accidents).then((data)=>{

    console.log(data)
    /// Map ///--Not representative of all accidents because not all accidents had
    //lat lon reported
    //Remove cases where lat and long where not reported
    coordinates1=data.filter(c=>c.LATITUDE!=99.9999000)
    coordinates2=coordinates1.filter(c=>c.LATITUDE!=77.7777000)
    console.log(coordinates2)
    var latitude=coordinates2.map(t=>t.LATITUDE)
    var longitude=coordinates2.map(t=>t.LONGITUD)
    var fatalities=coordinates2.map(t=>t.FATALS)


    var mapdata = [{type: 'densitymapbox', lon: longitude, lat:latitude, z:fatalities,
                    coloraxis: 'coloraxis',hoverinfo: 'skip',radius:5}];

    var layout = {
    mapbox: {center: {lon: -90, lat: 37}, style: 'stamen-terrain', zoom: 3},
    coloraxis: {colorscale: "Viridis"}, 
    title: {text: "Heat Map of Vehicle Fatalities in the United States"},
    width: 900, height: 400, margin: {t: 30, b: 0}};

    Plotly.newPlot('myMap', mapdata, layout);
  
   ///////////////                   TIME FACTORS                    //////////

    /////////// Time of day ///////////////////
    var time_day=data.map(t=>t.HOUR)
    //console.log(time_day)
    var result1 = { };
    for(var i = 0; i < time_day.length; ++i) {
        if(!result1[time_day[i]])
            result1[time_day[i]] = 0;
        ++result1[time_day[i]];
    }
    //console.log(result1)

    /// slice to remove 99th hour which is the number assigned to unknown hour for crash
    var hour_t=Object.keys(result1).slice(0,24)
    //console.log(hour_t)
    var count_crashes_time=Object.values(result1).slice(0,24)
    //console.log(count_crashes_time)

    ////Day of the week 
    var week_day=data.map(t=>t.DAY_WEEK)
    //console.log(time_day)
    var result2 = { };
    for(var i = 0; i < week_day.length; ++i) {
        if(!result2[week_day[i]])
            result2[week_day[i]] = 0;
        ++result2[week_day[i]];
    }
    console.log(result2)
    var day_t=Object.keys(result2)
    var count_crashes_day=Object.values(result2)


    var data_hour = {
        type: 'bar',
        x: hour_t,
        y: count_crashes_time,
        marker:{color:'#FF6347'},
        visible:true
    };

    var data_day ={
        type:'bar',
        x:day_t,
        y:count_crashes_day,
        marker:{color:'#47ff5c'},
        visible:false
    };

    var time_plots=[data_hour,data_day];


    var updatemenus=[{
        buttons: [   
            {
                args: [{visible: [true, false]}],
                label: 'Hour of the day',
                method: 'update'
            },
            {
                args: [{visible: [false, true]}],
                label:'Day of the week',
                method:'update'
               
            }             
        ],
        direction: 'left',
        pad: {'r': 10, 't': 10},
        showactive: true,
        type: 'buttons',
        x: 0.15,
        xanchor: 'left',
        y: 1.1,
        yanchor: 'top' 
    }]

    var layout = {
        updatemenus: updatemenus,
        // xaxis: {title:"Hour of the day",
        //     size: 14,
        //     autotick: false,
        //     //ticks: 'outside',
        //     tick0: 0,
        //     dtick: 1,
        //     //ticklen: 8,
        //     tickwidth: 2,
        //     tickangle: 45,
        //     tickcolor: '#000'},
        // yaxis: {title:"Total crashes",automargin: true,},
        autosize: true,
        width: 500,
        height: 500,
        margin: {
            l: 100,
            r: 50,
            b: 100,
            t: 50,
            pad: 4
        }
    };

    var config = {responsive: true}           
    Plotly.newPlot('time-of-day', time_plots,layout,config);
   

    

    
       

    // /////////////////// GENDER //////////////////////////////

    //First filter dataset by gender
    male=data.filter(c=>c.SEX==1)
    female=data.filter(c=>c.SEX==2)
    //console.log("male")
    //console.log(male)

    /// Males 
    male0_16=male.filter(c=>c.AGE<=16).length
    male17_20=male.filter(c=>c.AGE>=17&&c.AGE<=20).length
    male21_25=male.filter(c=>c.AGE>=21&&c.AGE<=25).length
    male26_30=male.filter(c=>c.AGE>=26&&c.AGE<=30).length
    male31_35=male.filter(c=>c.AGE>=31&&c.AGE<=35).length
    male36_40=male.filter(c=>c.AGE>=36&&c.AGE<=40).length
    male41_45=male.filter(c=>c.AGE>=41&&c.AGE<=45).length
    male46_50=male.filter(c=>c.AGE>=46&&c.AGE<=50).length
    male51_55=male.filter(c=>c.AGE>=51&&c.AGE<=55).length
    male56_60=male.filter(c=>c.AGE>=56&&c.AGE<=60).length
    male61_65=male.filter(c=>c.AGE>=61&&c.AGE<=65).length
    male66_70=male.filter(c=>c.AGE>=66&&c.AGE<=70).length
    male71_plus=male.filter(c=>c.AGE>=71).length

    /// Females
    female0_16=female.filter(c=>c.AGE<=16).length
    female17_20=female.filter(c=>c.AGE>=17&&c.AGE<=20).length
    female21_25=female.filter(c=>c.AGE>=21&&c.AGE<=25).length
    female26_30=female.filter(c=>c.AGE>=26&&c.AGE<=30).length
    female31_35=female.filter(c=>c.AGE>=31&&c.AGE<=35).length
    female36_40=female.filter(c=>c.AGE>=36&&c.AGE<=40).length
    female41_45=female.filter(c=>c.AGE>=41&&c.AGE<=45).length
    female46_50=female.filter(c=>c.AGE>=46&&c.AGE<=50).length
    female51_55=female.filter(c=>c.AGE>=51&&c.AGE<=55).length
    female56_60=female.filter(c=>c.AGE>=56&&c.AGE<=60).length
    female61_65=female.filter(c=>c.AGE>=61&&c.AGE<=65).length
    female66_70=female.filter(c=>c.AGE>=66&&c.AGE<=70).length
    female71_plus=female.filter(c=>c.AGE>=71).length



    var chart = JSC.chart('gender-age', { 
        debug: true, 
        type: 'horizontal column', 
        title_label_text: 
          'distibution of accidents by sex and age', 
        yAxis: { 
          scale_type: 'stacked', 
          defaultTick_label_text: 
            '{Math.abs(%Value):a2}'
        }, 
        xAxis: { 
          label_text: 'Age', 
          crosshair_enabled: true
        }, 
        defaultTooltip_label_text: 
          'Ages %xValue:<br><b>%points</b>', 
        defaultPoint_tooltip: 
          '%icon {Math.abs(%Value)}', 
        legend_template: 
          '%name %icon {Math.abs(%Value)}', 
        series: [ 
          { 
            name: 'Male', 
            points: { 
              mapTo: 'x,y', 
              data: [ 
                ['0-16', -male0_16], 
                ['17-20', -male17_20], 
                ['21-25', -male21_25], 
                ['26-30', -male26_30], 
                ['31-35', -male31_35], 
                ['36-40', -male36_40], 
                ['41-45', -male41_45], 
                ['46-50', -male46_50], 
                ['51-55', -male51_55], 
                ['56-60', -male56_60], 
                ['61-65', -male61_65], 
                ['66-70', -male66_70], 
                ['71+', -male71_plus] 
              ] 
            } 
          }, 
          { 
            name: 'Female', 
            points: { 
              mapTo: 'x,y', 
              data: [ 
                ['0-16', female0_16], 
                ['17-20',female17_20], 
                ['21-25', female21_25], 
                ['26-30', female26_30], 
                ['31-35', female31_35], 
                ['36-40', female36_40], 
                ['41-45', female41_45], 
                ['46-50', female46_50], 
                ['51-55', female51_55], 
                ['56-60', female56_60], 
                ['61-65', female61_65], 
                ['66-70', female66_70], 
                ['71+', female71_plus] 
              ] 
            } 
          } 
        ] 
      }); 


    // /////// LIGHT CONDITIONS ///////////

    /// Count crashes by light conditions
    var light_conditions=data.map(t=>t.LGT_CONDITIONS)
    var light_result = { };
    for(var i = 0; i < light_conditions.length; ++i) {
        if(!light_result[light_conditions[i]])
            light_result[light_conditions[i]] = 0;
        ++light_result[light_conditions[i]];
    }
    //console.log(light_result)

    /// Sum of fatalities by light conditions
    var lgt_fatalities_result = [];
    data.reduce(function(res, value) {
    if (!res[value.LGT_CONDITIONS]) {
        res[value.LGT_CONDITIONS] = { LGT_CONDITIONS: value.LGT_CONDITIONS, FATALS: 0 };
        lgt_fatalities_result.push(res[value.LGT_CONDITIONS])
    }
    res[value.LGT_CONDITIONS].FATALS += value.FATALS;
    return res;
    }, {});

    //console.log(lgt_fatalities_result)

    /// Variables
    var l_condition=Object.keys(light_result)
    var l_count_crashes=Object.values(light_result)
    var l_count_deaths=lgt_fatalities_result.map(t=>t.FATALS)
    var l_con_fatal=lgt_fatalities_result.map(t=>t.LGT_CONDITIONS)

    var trace1 = {
        x: l_condition,
        y: l_count_crashes,
        name: 'crashes',
        type: 'bar'
    };
    
    var trace2 = {
        x: l_con_fatal,
        y: l_count_deaths,
        name: 'fatalities',
        type: 'bar'
    };
    
    var light_data = [trace1, trace2];
    
    var layout = {barmode: 'group',
        title: 'Light conditions',
        autosize: true,
        width: 500,
        height: 500,
        margin: {
            l: 100,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
        }
    };
    var config = {responsive: true};
    Plotly.newPlot('light', light_data, layout,config);


  
})


