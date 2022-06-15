function draw(artboard) {
    const canvas = document.getElementById("myCanvas");
    let canWidth = canvas.width;
    let canHeight = canvas.height;

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // create new
        ctx.fillStyle = artboard.backgroundColor;
        ctx.fillRect(canWidth / 2 - artboard.width / 2, canHeight / 2 - artboard.height / 2, artboard.width, artboard.height);
        ctx.strokeStyle = artboard.border;
        ctx.lineWidth = artboard.border;
        // stroked artboard
        ctx.strokeStyle = 'black';
        ctx.strokeRect(canWidth / 2 - artboard.width / 2, canHeight / 2 - artboard.height / 2, artboard.width, artboard.height);

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
    let artboardObj = {
        // set starting points
        width: 816,
        height: 1056,
        backgroundColor: color,
        border: '#000000'
    };
    $('#btn_plus').click((e) => {
        zoomFunc( true)
        drawing(e);
    })
    $('#btn_minus').click((e) => {
        zoomFunc( false)
        drawing(e);

    })
    const zoomFunc = ( z) => {
        // get current size
        let currWidth = parseInt($('#myCanvas').attr('width'))
        let currHeight = parseInt($('#myCanvas').attr('height'))
        let max = 6000;
        let min = 2000;
        // $('#myCanvas').attr({ 'width': 0, 'height': 0 })
        if (z) {
            if (currWidth >= min) {
                $('#myCanvas').attr({ 'width': currWidth- 500, 'height': currHeight - 500 })
            } else {
                return;
            }
        } else {
            if (currWidth <= max) {
                $('#myCanvas').attr({ 'width': currWidth + 500, 'height': currHeight + 500 })
            } else {
                return;
            }
        }
        console.log(currHeight)
    }
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
    // draw when loaded
    draw(artboardObj);
});
