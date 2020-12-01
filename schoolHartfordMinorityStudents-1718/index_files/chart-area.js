/*
 Highcharts JS v4.1.5 (2015-04-13)
 Exporting module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
/*
(function(f){var z=f.Chart,s=f.addEvent,A=f.removeEvent,B=HighchartsAdapter.fireEvent,j=f.createElement,p=f.discardElement,u=f.css,l=f.merge,m=f.each,q=f.extend,E=f.splat,F=Math.max,k=document,C=window,G=f.isTouchDevice,H=f.Renderer.prototype.symbols,r=f.getOptions(),x;q(r.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});r.navigation=
{menuStyle:{border:"1px solid #A0A0A0",background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:"none",color:"#303030",fontSize:G?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}};r.exporting={type:"image/png",url:"http://export.highcharts.com/",
buttons:{contextButton:{menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};
f.post=function(b,a,e){var c,b=j("form",l({method:"post",action:b,enctype:"multipart/form-data"},e),{display:"none"},k.body);for(c in a)j("input",{type:"hidden",name:c,value:a[c]},null,b);b.submit();p(b)};q(z.prototype,{sanitizeSVG:function(b){return b.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g,
" xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g,"Â ").replace(/&shy;/g,"Â­").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/ id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,
"$1").replace(/style="([^"]+)"/g,function(a){return a.toLowerCase()})},getSVG:function(b){var a=this,e,c,g,y,h,d=l(a.options,b);if(!k.createElementNS)k.createElementNS=function(a,b){return k.createElement(b)};c=j("div",null,{position:"absolute",top:"-9999em",width:a.chartWidth+"px",height:a.chartHeight+"px"},k.body);g=a.renderTo.style.width;h=a.renderTo.style.height;g=d.exporting.sourceWidth||d.chart.width||/px$/.test(g)&&parseInt(g,10)||600;h=d.exporting.sourceHeight||d.chart.height||/px$/.test(h)&&
parseInt(h,10)||400;q(d.chart,{animation:!1,renderTo:c,forExport:!0,width:g,height:h});d.exporting.enabled=!1;delete d.data;d.series=[];m(a.series,function(a){y=l(a.options,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});y.isInternal||d.series.push(y)});b&&m(["xAxis","yAxis"],function(a){m(E(b[a]),function(b,c){d[a][c]=l(d[a][c],b)})});e=new f.Chart(d,a.callback);m(["xAxis","yAxis"],function(b){m(a[b],function(a,d){var c=e[b][d],g=a.getExtremes(),h=g.userMin,g=g.userMax;c&&
(h!==void 0||g!==void 0)&&c.setExtremes(h,g,!0,!1)})});g=e.container.innerHTML;d=null;e.destroy();p(c);g=this.sanitizeSVG(g);return g=g.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")},getSVGForExport:function(b,a){var e=this.options.exporting;return this.getSVG(l({chart:{borderRadius:0}},e.chartOptions,a,{exporting:{sourceWidth:b&&b.sourceWidth||e.sourceWidth,sourceHeight:b&&b.sourceHeight||e.sourceHeight}}))},exportChart:function(b,a){var e=this.getSVGForExport(b,a),b=l(this.options.exporting,
b);f.post(b.url,{filename:b.filename||"chart",type:b.type,width:b.width||0,scale:b.scale||2,svg:e},b.formAttributes)},print:function(){var b=this,a=b.container,e=[],c=a.parentNode,g=k.body,f=g.childNodes;if(!b.isPrinting)b.isPrinting=!0,B(b,"beforePrint"),m(f,function(a,b){if(a.nodeType===1)e[b]=a.style.display,a.style.display="none"}),g.appendChild(a),C.focus(),C.print(),setTimeout(function(){c.appendChild(a);m(f,function(a,b){if(a.nodeType===1)a.style.display=e[b]});b.isPrinting=!1;B(b,"afterPrint")},
1E3)},contextMenu:function(b,a,e,c,g,f,h){var d=this,l=d.options.navigation,D=l.menuItemStyle,n=d.chartWidth,o=d.chartHeight,k="cache-"+b,i=d[k],t=F(g,f),v,w,p,r=function(a){d.pointer.inClass(a.target,b)||w()};if(!i)d[k]=i=j("div",{className:b},{position:"absolute",zIndex:1E3,padding:t+"px"},d.container),v=j("div",null,q({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},l.menuStyle),i),w=function(){u(i,{display:"none"});h&&h.setState(0);d.openMenu=
!1},s(i,"mouseleave",function(){p=setTimeout(w,500)}),s(i,"mouseenter",function(){clearTimeout(p)}),s(document,"mouseup",r),s(d,"destroy",function(){A(document,"mouseup",r)}),m(a,function(a){if(a){var b=a.separator?j("hr",null,null,v):j("div",{onmouseover:function(){u(this,l.menuItemHoverStyle)},onmouseout:function(){u(this,D)},onclick:function(){w();a.onclick&&a.onclick.apply(d,arguments)},innerHTML:a.text||d.options.lang[a.textKey]},q({cursor:"pointer"},D),v);d.exportDivElements.push(b)}}),d.exportDivElements.push(v,
i),d.exportMenuWidth=i.offsetWidth,d.exportMenuHeight=i.offsetHeight;a={display:"block"};e+d.exportMenuWidth>n?a.right=n-e-g-t+"px":a.left=e-t+"px";c+f+d.exportMenuHeight>o&&h.alignOptions.verticalAlign!=="top"?a.bottom=o-c-t+"px":a.top=c+f-t+"px";u(i,a);d.openMenu=!0},addButton:function(b){var a=this,e=a.renderer,c=l(a.options.navigation.buttonOptions,b),g=c.onclick,k=c.menuItems,h,d,m={stroke:c.symbolStroke,fill:c.symbolFill},j=c.symbolSize||12;if(!a.btnCount)a.btnCount=0;if(!a.exportDivElements)a.exportDivElements=
[],a.exportSVGElements=[];if(c.enabled!==!1){var n=c.theme,o=n.states,p=o&&o.hover,o=o&&o.select,i;delete n.states;g?i=function(){g.apply(a,arguments)}:k&&(i=function(){a.contextMenu(d.menuClassName,k,d.translateX,d.translateY,d.width,d.height,d);d.setState(2)});c.text&&c.symbol?n.paddingLeft=f.pick(n.paddingLeft,25):c.text||q(n,{width:c.width,height:c.height,padding:0});d=e.button(c.text,0,0,i,n,p,o).attr({title:a.options.lang[c._titleKey],"stroke-linecap":"round"});d.menuClassName=b.menuClassName||
"highcharts-menu-"+a.btnCount++;c.symbol&&(h=e.symbol(c.symbol,c.symbolX-j/2,c.symbolY-j/2,j,j).attr(q(m,{"stroke-width":c.symbolStrokeWidth||1,zIndex:1})).add(d));d.add().align(q(c,{width:d.width,x:f.pick(c.x,x)}),!0,"spacingBox");x+=(d.width+c.buttonSpacing)*(c.align==="right"?-1:1);a.exportSVGElements.push(d,h)}},destroyExport:function(b){var b=b.target,a,e;for(a=0;a<b.exportSVGElements.length;a++)if(e=b.exportSVGElements[a])e.onclick=e.ontouchstart=null,b.exportSVGElements[a]=e.destroy();for(a=
0;a<b.exportDivElements.length;a++)e=b.exportDivElements[a],A(e,"mouseleave"),b.exportDivElements[a]=e.onmouseout=e.onmouseover=e.ontouchstart=e.onclick=null,p(e)}});H.menu=function(b,a,e,c){return["M",b,a+2.5,"L",b+e,a+2.5,"M",b,a+c/2+0.5,"L",b+e,a+c/2+0.5,"M",b,a+c-1.5,"L",b+e,a+c-1.5]};z.prototype.callbacks.push(function(b){var a,e=b.options.exporting,c=e.buttons;x=0;if(e.enabled!==!1){for(a in c)b.addButton(c[a]);s(b,"destroy",b.destroyExport)}})})(Highcharts);

*/

jQuery(function() {

    jQuery(".graphicHeader").html(q.headline);
    jQuery(".explainer").html(q.subhead);
    jQuery(".sourceline").html("Source: " + q.source);
    jQuery(".smallByline").html(q.byline);

    var containerType = "container";
    if (q.container != null) {
        containerType = q.container;
    }
    Highcharts.setOptions({
        colors: ['rgb(205,70,70)', 'rgb(68,108,179)', 'rgb(158,1,66)', 'rgb(94,79,162)', 'rgb(213,62,79)', 'rgb(50,136,189)', 'rgb(244,109,67)', 'rgb(102,194,165)', 'rgb(253,174,97)', 'rgb(171,221,164)', 'rgb(230,245,152)', 'rgb(254,224,139)']
    });
    var legendOpts = {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0,
        itemStyle: {
            fontFamily: "Lato, Arial",
            color: "#444",
            fontSize: 13,
            fontWeight: "300"
        }
    };
    if ($(window).width() < 550) {
        legendOpts = {
            verticalAlign: 'top',
            borderWidth: 0,
            layout: 'vertical',
            x: 0,
            y: 0,
            itemStyle: {
                fontFamily: "Lato, Arial",
                color: "#444",
                fontSize: 13,
                fontWeight: "300"
            }
        }
    }



    var chart = new Highcharts.Chart({
        chart: {
            type: q.type,
            renderTo: containerType
        },
        title: {
            text: '',
            x: -20,
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: '',
            x: -20,
            style: {
                display: 'none'
            }
        },
        credits: {
            enabled: false
        },
        // exporting: {
        //     enabled: false
        // },
        xAxis: {
            valueSuffix: q.xSuffix,
            valuePrefix: q.xPrefix,
            categories: q.xCategories,
            title: {
                text: q.xTitle,
                style: {
                    fontFamily: "Lato, Arial",
                    color: "#444",
                    fontSize: 17,
                    fontWeight: "300"
                }
            },
            labels: {
                style: {
                    fontFamily: "Lato, Arial",
                    color: "#aaa",
                    fontSize: 13,
                    fontWeight: "300"
                },
                formatter: function() {
                    return q.xPrefix + this.value + q.xSuffix;
                }
            }
        },
        yAxis: {
            valueSuffix: q.ySuffix,
            valuePrefix: q.yPrefix,
            title: {
                text: q.yTitle,
                style: {
                    fontFamily: "Lato, Arial",
                    color: "#444",
                    fontSize: 17,
                    fontWeight: "300"
                }
            },
            labels: {
                style: {
                    fontFamily: "Lato, Arial",
                    color: "#aaa",
                    fontSize: 13,
                    fontWeight: "300"
                },
                formatter: function() {
                    return q.yPrefix + comma(this.value) + q.ySuffix;
                }
            },
            lineColor: "#eee",
            min: 0
        },
        tooltip: {
            valueSuffix: q.ySuffix,
            valuePrefix: q.yPrefix,
            shadow: false,
            backgroundColor: "#ffffff",
            borderColor: "#444444",
            borderWidth: 2,
            useHTML: true,
            headerFormat: '<div class="tooltipHead">{point.key}</div>',
            formatter: function() {
                return "<div class='toolTipper'>" + this.series.name + " | " + this.key + "</div><div class='tooltipbottom'>" + q.yPrefix + comma(this.y) + q.ySuffix + "</div>";
            },
            style: {
                fontFamily: "Lato, Arial",
                color: "#333",
                fontSize: 14,
                opacity: 1,
                fontWeight: "400"
            }
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                marker: {
                    radius: 0,
                    symbol: "circle"
                }
            },
            series: {
                marker: {
                    enabled: false,
                    symbol: "circle"
                },
                lineWidth: 4
            }
        },
        legend: legendOpts,
        series: data
    });

    function comma(val) {
        num = val;
        if (num == "--") {
            return val;
        } else {
            val = Math.round(val * 1000) / 1000;
            while (/(\d+)(\d{3})/.test(val.toString())) {
                val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }
            return val;
        }
    }

    var height = 460;
    var mainContainer = "#container";
    shaper();
    jQuery(window).resize(function() {
        shaper();
    });


    function shaper() {
        var top = jQuery(".interactiveContainer").height() - jQuery(mainContainer).height();
        var leftover = height - top;
        jQuery(mainContainer).css("height", leftover + "px");
    }
    setInterval(function() {
        shaper();
    }, 100);

});
