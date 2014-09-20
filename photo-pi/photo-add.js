/*
 * photo-add.js
 * Copyright (C) 2014 Sébastien Diemer <sebastien.diemer@mines-paristech.fr>
 *
 * Distributed under terms of the MIT license.
 *
 *
 * This module defines an ajax request that is executed periodically and aims at polling the
 * server for new images.
 * If images are received from the server, they are added to the DOM and placed randomly on the
 * "board".
 *
 */


var SERVER_URL = "http://localhost:8012";
//var PHOTOS_URL = "/resources/img/";
var PHOTOS_URL = "/Users/Diem/Dropbox/Camera Uploads/";

var CSS_CLASS = "imgBorders";
var DIV_ID = "photos";

var IMG_Z_INDEX = 1;
var MIN_ANGLE = -30; //the minimum rotation of the image in deg
var MAX_ANGLE = 30; //the maximum rotation of the image in deg
var REFRESH_TIME = 3000; //ms

var MAX_COORDS = 10;
var OLD_COORDS = [[0,0]];

function is_near_old_images(x, y)
{
    var THRESHOLD = 500;
    for (var i=0; i<OLD_COORDS.length; i++) {
        var x_old = OLD_COORDS[i][0];
        var y_old = OLD_COORDS[i][1];
        if (Math.sqrt((Math.pow(x_old-x, 2) + Math.pow(y_old-y, 2))) < THRESHOLD) {
            return true;
        }
    }
    return false;
}

function find_coords()
{
    var x = 0.;
    var y = 0.;
    var i = 0;
    do {
       x = Math.random()*1200;
       y = Math.random()*600;
       i++;
    }
    while (is_near_old_images(x, y) && i < 100);
    return [x, y];
}

function save_coords(x, y)
{
    OLD_COORDS.push([x, y]);
    if (OLD_COORDS.length > MAX_COORDS) {
        OLD_COORDS.splice(0, 1);
    }
}

function place_img(id, src)
{
    $("#"+DIV_ID).prepend('<img class="'+CSS_CLASS+'" id="'+id+'" '+'src="'+PHOTOS_URL+src+'"/>');
    var coords = find_coords();
    $("#"+id).css("right", coords[0] + "px");
    $("#"+id).css("top", coords[1] + "px");
    var angle = MIN_ANGLE + (MAX_ANGLE-MIN_ANGLE)*Math.random();
    $("#"+id).css("-webkit-transform", 'rotate(' + angle + 'deg)');
    $("#"+id).css('z-index', IMG_Z_INDEX);
    IMG_Z_INDEX++;
    save_coords(coords[0], coords[1]);
}

$(document).ready(
        function() {
            function updateImages() {
                $.ajax({
                    cache: false,
                    url: SERVER_URL,
                    type: "GET",
                    contentType: "application/json"
                }).done(function(json) {
                    $.each(json, function(i, src) {
                        var escaped_id = src.replace(/ /g, '').replace(/\./g, '');
                        place_img("img"+escaped_id, src);
                    });
                });
            }
            setInterval(updateImages, REFRESH_TIME);
        });
