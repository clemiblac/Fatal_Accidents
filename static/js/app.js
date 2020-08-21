

/// route name
var accidents="static/js/fatal_accidents.json";
//var accidents="/data/fatal";

d3.json(accidents).then((data)=>{

    console.log(data)
        /// Map ///
    // var map_result = [];
    // data.reduce(function(res, value) {
    // if (!res[value.STATE_NAME]) {
    //     res[value.STATE_NAME] = { STATE_NAME: value.STATE_NAME, FATALS: 0 };
    //     map_result.push(res[value.STATE_NAME])
    // }
    // res[value.STATE_NAME].FATALS += value.FATALS;
    // return res;
    // }, {});

    // console.log(map_result)
    // var state=map_result.map(t=>t.STATE_NAME)
    // var fatal_accidents=map_result.map(t=>t.FATALS)




    /////////// Time of day
    var time_day=data.map(t=>t.HOUR)
    console.log(time_day)
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



    var data2 = [{
        type: 'bar',
        x: hour_t,
        y: count_crashes_time,
        marker:{color:'#FF6347'},
    }];
    var layout = {
        xaxis: {title:"Hour of the day",
            size: 14,
            autotick: false,
            //ticks: 'outside',
            tick0: 0,
            dtick: 1,
            ticklen: 8,
            tickwidth: 2,
            tickangle: 45,
            tickcolor: '#000'},
        yaxis: {title:"Total crashes",automargin: true,},
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
    var config = {responsive: true}           
    Plotly.newPlot('time-of-day', data2,layout,config);

    // /////////////////// GENDER //////////////////////////////

    //First filter dataset by gender
    male=data.filter(c=>c.SEX==1)
    female=data.filter(c=>c.SEX==2)
    console.log("male")
    //console.log(male)

    /// Males 
    male0_16=male.filter(c=>c.AGE<=16).length
    console.log(male0_16)
    male17_20=male.filter(c=>c.AGE>=17&&c.AGE<=20).length
    console.log(male17_20)
    male21_25=male.filter(c=>c.AGE>=21&&c.AGE<=25).length
    console.log(male21_25)
    male26_30=male.filter(c=>c.AGE>=26&&c.AGE<=30).length
    console.log(male26_30)
    male31_35=male.filter(c=>c.AGE>=31&&c.AGE<=35).length
    console.log(male31_35)
    male36_40=male.filter(c=>c.AGE>=36&&c.AGE<=40).length
    console.log(male36_40)
    male41_45=male.filter(c=>c.AGE>=41&&c.AGE<=45).length
    console.log(male41_45)
    male46_50=male.filter(c=>c.AGE>=46&&c.AGE<=50).length
    console.log(male46_50)
    male51_55=male.filter(c=>c.AGE>=51&&c.AGE<=55).length
    console.log(male51_55)
    male56_60=male.filter(c=>c.AGE>=56&&c.AGE<=60).length
    console.log(male56_60)
    male61_65=male.filter(c=>c.AGE>=61&&c.AGE<=65).length
    console.log(male61_65)
    male66_70=male.filter(c=>c.AGE>=66&&c.AGE<=70).length
    console.log(male66_70)
    male71_plus=male.filter(c=>c.AGE>=71).length
    console.log(male71_plus)

    /// Females
    female0_16=female.filter(c=>c.AGE<=16).length
    console.log(female0_16)
    female17_20=female.filter(c=>c.AGE>=17&&c.AGE<=20).length
    console.log(female17_20)
    female21_25=female.filter(c=>c.AGE>=21&&c.AGE<=25).length
    console.log(female21_25)
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


    console.log("Male 17-20")
    console.log(male17_20)

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
    console.log(light_result)

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

    console.log(lgt_fatalities_result)

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


