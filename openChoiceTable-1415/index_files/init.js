jQuery(function() {

	var cols = [];
	var mobileCols = [0,2,3,4];
	var info = {
		hed: "Open Choice seats, 2014-15",
		sub: "The Department of Education requested a total of 617 additional Open Choice seats, but the Hartford region's suburban districts only offered 400. For students who wish to enroll in a Hartford public school, the district is also offering additional seats."
	};
	setupVars();
	populateTable();
	setupTable();
	heds();

	function setupVars() {
		for (var key in data[0]) {
			cols.push(key);
		}
	}

	function setupTable() {
		var headers = jQuery("<tr></tr>");
		for ( i in cols ) {
			if (jQuery.inArray(Number(i),mobileCols) == -1) {
				headers.append("<th class='bothSort mobileHide'>" + cols[i] + "</th>");
			} else {
				headers.append("<th class='bothSort'>" + cols[i] + "</th>");
			}
		}
		jQuery("#myTable").prepend("<thead><tr>" + headers.html() + "</tr></thead>");
		jQuery("th:first-child").addClass("sorted");
	}

	function populateTable() {
		for ( i in data ) {
			var row = jQuery("<tr></tr>");
			for ( j in cols ) {
				var cell;
				if (jQuery.inArray(Number(j),mobileCols) == -1) {
					cell = jQuery("<td class='mobileHide'>" + checkNull(data[i][cols[j]]) + "</td>");
				} else {
					cell = jQuery("<td>" + checkNull(data[i][cols[j]]) + "</td>");
				}
				row.append(cell);
			}
			jQuery("#myTable tbody").append(row);
		}
	}

	function heds() {
		var hed = "<div class='graphicHeader'>" + info.hed + "</div>";
		var sub = "<div class='explainer'>" + info.sub + "</div>";
		jQuery(".chartContainer").prepend(sub).prepend(hed);
	}

	function checkNull(str) {
		if (str == null) {
			return "--";
		} else {
			return str;
		}
	} 
	jQuery("#myTable").tablesorter();

	jQuery("#myTable th").click(function() {
		jQuery(this).siblings().removeClass("sorted").removeClass("upSort").removeClass("downSort");
		if (jQuery(this).hasClass("upSort")) {
			jQuery(this).addClass("sorted").removeClass("upSort")
			.addClass("downSort");
		} else {
			jQuery(this).addClass("sorted").removeClass("downSort")
			.addClass("upSort");
		}

	});

})