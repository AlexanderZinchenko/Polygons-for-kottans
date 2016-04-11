function cut(basePoly, cutPoly){
    var bp1, bpn, ct1, ctn;
    
    var cross = function(){
        var cutPolCor = [bp1[0] - bpn[0], bp1[1] - bpn[1]];
        basePolCor = [ct1[0] - ctn[0], ct1[1] - ctn[1]];
        e1 = bp1[0] * bpn[1] - bp1[1] * bpn[0];
        e2 = ct1[0] * ctn[1] - ct1[1] * ctn[0];
        e3 = 1.0 / (cutPolCor[0] * basePolCor[1] - cutPolCor[1] * basePolCor[0]);
        return [(e1*basePolCor[0] - e2*cutPolCor[0]) * e3, (e1*basePolCor[1] - e2*cutPolCor[1]) * e3];
    };

    var inside = function(a){
        return (bpn[0]-bp1[0])*(a[1]-bp1[1]) > (bpn[1]-bp1[1])*(a[0]-bp1[0]);
    };
    
    var finalCor = basePoly;
    bp1 = cutPoly[cutPoly.length-1];
    for(i in cutPoly){
        var bpn = cutPoly[i];
        var startCorList = finalCor;
        finalCor = [];
        ct1 = startCorList[startCorList.length-1]; 
        for(j in startCorList){
            var ctn = startCorList[j];
            if(inside(ctn)){
                if(!inside(ct1)){
                    finalCor.push(cross());
                }
            finalCor.push(ctn);
            }
            else if(inside(ct1)){
                finalCor.push(cross());
            }
            ct1 = ctn;
        }
        bp1 = bpn;
    }
    return finalCor;
}