var pluginhelper = {

    getData : function(json) {
        if ($('#type').val() == "dutchlanguagearea") {
            var data = [
                {   offset : 1,
                    kloekecodes : json.data[0].split(/\s+/)
                },
                {   offset : 2,
                    kloekecodes :  json.data[1].split(/\s+/)
                }                
            ];
        } else {
            var data = {};
            var codes = json.municipalitycodes[0].split(/\s+/);
            for (var i = 0; i < codes.length; i++) {
                data[codes[i]] = "#FFE680"; 
            }
            var codes = json.municipalitycodes[1].split(/\s+/);
            for (var i = 0; i < codes.length; i++) {
                data[codes[i]] = "#33FF33"; 
            }
        }
        return data;
    }
};

