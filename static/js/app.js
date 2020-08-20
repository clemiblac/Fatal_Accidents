
function updateDash(){

    /// route name
    var accidents="/data/fatal";

   //////////////HHHHHHH///////////
    d3.json(accidents).then((data)=>{
        console.log(data);
        

    })


}
updateDash()