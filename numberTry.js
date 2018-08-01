
var sum_pairs = [10, 5, 2, 3, 7, 5];
var sum= 10;

var numberArray =[]

var calculate = function(passedArray,totalSum){
    passedArray.forEach(function(item,index){
        for (var i = 0; i < passedArray.length; i++) {
      
            if (item+passedArray[i]===totalSum){
               numberArray[i] = {
                    first: index,
                    second: i,
                    difference: index - i
                };      
            };
        };
          
        });
        
     
        numberArray.forEach(function(item,index){
            if (item.difference>0){
                numberArray.forEach(function(item2,index2){
                    if(item.difference<item2.difference){
                        console.log(item)
                    };
                });     
            }   
        });
        
};

calculate(sum_pairs,sum);



