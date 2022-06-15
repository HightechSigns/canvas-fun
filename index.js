// notes for SVG drawing
/*
<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Simple rectangle -->
  <rect width="100" height="100" />

  <!-- Rounded corner rectangle -->
  <rect x="120" width="100" height="100" rx="15" />
</svg>


// object on canvas move
ctx.moveTo(20, 20);
*/
// use this for building shapes when a toolbar is made
function drawSVG(shape) {
    let renderShape;
    switch (shape) {
        case 'square':
            renderShape = `<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
                                <!-- Simple rectangle -->
                                <rect width="15" height="15" />
                            </svg>`
            break;
        case 'rectangle':
            renderShape = `<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
                                    <!-- Simple rectangle -->
                                    <rect width="20" height="15" />
                                </svg>`
            break;
        case 'circle':
            renderShape = `<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
                                    <!-- Simple rectangle -->
                                    <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/>
                                </svg>`
            break;
        case 'triangle':
            renderShape = `<svg height="15" width="15" xmlns="http://www.w3.org/2000/svg">
                                    <polygon points="7.5,0 0,15 15,15" />
                                    Sorry, your browser does not support inline SVG.
                                </svg>`
            break;
        default:
            break;
    }
    $(this).append(renderShape)
    // return renderShape;
}
let canvasElm;
function draw(artboard) {
    const canvas = document.getElementById("myCanvas");
    let canWidth = canvas.width;
    let canHeight = canvas.height;

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // create new
        ctx.fillStyle = artboard.backgroundColor;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5
        let path1 = new Path2D();
        path1.rect(canWidth / 2 - artboard.width / 2, canHeight / 2 - artboard.height / 2, artboard.width, artboard.height)
        ctx.fill(path1);
        ctx.stroke(path1);
        // set canvasElm
        canvasElm = path1;
    }
}
var getInch = (inch) => {
    //  goal is to find inches per pixels
    // 1 inch = 96px
    return inch * 96;
}
$(document).ready(() => {
    // getting elements
    const inputWidthElm = $("#widthInput");
    const inputHeightElm = $("#heightInput");
    const inputColorElm = $("#colorPicker");
    const colorValElm = $("#colorVal");
    // set canvas size on load
    $('#myCanvas').attr({ 'width': 3000, 'height': 3000 })
    // set values on load
    inputWidthElm.val(8.5);
    inputHeightElm.val(11);
    let color = inputColorElm.val();
    // set html with background color
    colorValElm.text(color);

    // handler events
    inputColorElm.change((e) => {
        drawing(e);
    });
    inputWidthElm.keyup((e) => {
        checkval(inputWidthElm)
        drawing(e);
    });
    inputHeightElm.keyup((e) => {
        checkval(inputHeightElm)
        drawing(e);
    });
    // check the val to see if it goes past max and min
    const checkval = (element) => {
        $(element).change(function () {
            var max = parseInt($(this).attr('max'));
            var min = parseInt($(this).attr('min'));
            if ($(this).val() > max) {
                $(this).val(max);
            }
            else if ($(this).val() < min) {
                $(this).val(min);
            }
        });
    };
    // artboard object when the user changes a setting
    let artboardObj = {
        // set starting points
        width: 816,
        height: 1056,
        backgroundColor: color,
        border: '#000000'
    };
    $('#btn_plus').click((e) => {
        zoomFunc(true);
        drawing(e);
    })
    $('#btn_minus').click((e) => {
        zoomFunc(false);
        drawing(e);
    })
    // onload hide drop down
    $('#btn_drop_down_cont').hide()
    // dropdown button
    $('#btn_dd').click(e => {
        if (e) {
            $('#btn_drop_down_cont').slideToggle('fast')
            $('.btn_drop_down>i').toggleClass('rotate')
        }
    })
    // canvas shape selection functionality
    var canvasShapeSelectionElm = $('.canvas_shape_sel');
    // selection handler
    canvasShapeSelectionElm.click(function () {
        var slcVal = $(this).attr("data-canshape").toLowerCase();
        // get rid of active class for all
        let slctArr = Array.from(canvasShapeSelectionElm);
        slctArr.map(elm => {
            $(elm).removeClass('canvas_shape_sel_active');
        })
        // add active class to curr
        $(this).addClass('canvas_shape_sel_active');
        // add funtionality to draw new canvas

        console.log(slcVal);
    });
    const zoomFunc = (z) => {
        // get current size
        let currWidth = parseInt($('#myCanvas').attr('width'))
        let currHeight = parseInt($('#myCanvas').attr('height'))
        // user input maxes and readjust zoom level.
        // logic goes here
        let max = 6000; // these are reversed since if you want to "zoom" your making the canvas size smaller and that brings the canvas closer to the user
        let min = 1200;
        if (z) {
            if (currWidth >= min) {
                $('#myCanvas').attr({ 'width': currWidth - 200, 'height': currHeight - 200 })
            } else {
                return;
            }
        } else {
            if (currWidth <= max) {
                $('#myCanvas').attr({ 'width': currWidth + 200, 'height': currHeight + 200 })
            } else {
                return;
            }
        }
        console.log(currHeight)
    }
    // drawing the canvas (Sheet of paper)
    // these are the printing boundaries
    const drawing = (e) => {
        colorValElm.text("");
        // set up the values
        let w = getInch(inputWidthElm.val());
        let h = getInch(inputHeightElm.val());
        let c = inputColorElm.val();
        artboardObj.width = w;
        artboardObj.height = h;
        artboardObj.backgroundColor = c;
        // set html with background color
        colorValElm.text(c);
        if (e) {
            draw(artboardObj);
        }
    };
    // see if you can click on canvas item
    $(canvasElm).click(e=>{
        console.log('clicked canvas!')
    })
    // draw when loaded
    draw(artboardObj);
});
