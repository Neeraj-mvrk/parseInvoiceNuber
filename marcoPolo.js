function marcopolo(){
    var obj = {};
    for(var i=1;i<=100;i++){ 
        if(i%4==0){if(i%7==0){
            obj[i]='marcopolo';
        }else{
            obj[i]='marco';}
        }
        else if(i%7==0){
            obj[i]='polo';
        }
        else {obj[i]=i;}
    }
    return Object.values(obj).toString();
}

marcopolo();