type =
  "text/javascript" >
  !(function () {
    "use strict";
    window.addEventListener("message", function (a) {
      if (void 0 !== a.data["datawrapper-height"]) {
        var e = document.querySelectorAll("iframe");
        for (var t in a.data["datawrapper-height"])
          for (var r = 0; r < e.length; r++)
            if (e[r].contentWindow === a.source) {
              var i = a.data["datawrapper-height"][t] + "px";
              e[r].style.height = i;
            }
      }
    });
  })();

/*
<hr>
<b>Occupied by: </b>{{ occupied_by }}<br><hr>
<b>Reef Destruction: </b>{{ total_area_of_scarring_acres }} acres, of which {{ reef_destruction_by_giant_clam_harvesting }} by harvesting giant clams.<br>


<div>
    <div style="margin-bottom:11px;">
        <div style='margin-bottom:4px;'>Damage caused by giant clams harvesting:</div>
        <div style='background:#82C0FF; width: 180px; height:15px; display:flex; align-items: center;'>
            <div style='display:flex; align-items:center; background:#6B84DB; height:100%; width: {{ clam }}%'>
                {{ clam <= 20 ? CONCAT("<span style='color:white; font-weight:normal; margin:0px 5px;'>", FORMAT(clam, '0'), "%</span>") : "" }}
            </div>
            	{{ clam > 20 ? CONCAT("<span style='color:white; font-weight:normal; margin:0px -28px;'>", FORMAT(clam, '0'), "%</span>") : "" }}
        </div>
    </div>
*/
