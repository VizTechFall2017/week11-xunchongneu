function updateData(selectedYear){

    console.log(selectedYear);

    if(sortOrder == 'alphabetical'){

        return nestedData.filter(function(d){return d.key == selectedYear})[0].values.sort(function(a,b){
            return a.fullname.localeCompare(b.fullname);
        });

    }
    else {
        return nestedData.filter(function(d){return d.key == selectedYear})[0].values.sort(function(a,b){
            return b.totalPop-a.totalPop;
        });
    }
}


//this function runs when the HTML slider is moved
function sliderMoved(value){

    newData = updateData(value);
    currentYear = value;
    drawPoints(newData);

}

function radioChange(value){
    sortOrder = value;
    newData = updateData(currentYear);
    drawPoints(newData);
}