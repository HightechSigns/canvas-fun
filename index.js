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
        // let currWidth = parseInt($('#myCanvas').attr('width'))
        // let currHeight = parseInt($('#myCanvas').attr('height'))
        // let zoomTotal = (currWidth + currHeight)/2;
        // console.log(zoomTotal)
        zoomFunc(true)
        // $('#myCanvas').attr({'width':0,'height':0})
        // $('#myCanvas').attr({'width':currWidth - 500,'height':currHeight - 500})
        drawing(e);
    })
    $('#btn_minus').click((e) => {
        // let currWidth = $('#myCanvas').attr('width')
        // let currHeight = $('#myCanvas').attr('height')
        zoomFunc(false)
        // $('#myCanvas').attr({'width':0,'height':0})
        // $('#myCanvas').attr({'width':currWidth + 500,'height':currHeight + 500})
        drawing(e);
    })
    const zoomFunc = (z) => {
        // get current size
        let currWidth = parseInt($('#myCanvas').attr('width'))
        let currHeight = parseInt($('#myCanvas').attr('height'))
        let total = currWidth + currHeight;
        $('#myCanvas').attr({'width':0,'height':0})
        if (!z && total >= 1000 && total < 6000) {
            $('#myCanvas').attr({ 'width': total + 500, 'height': total + 500 })
        } else {
            $('#myCanvas').attr({ 'width': total - 500, 'height': total - 500 })
        }
        console.log(total)
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
        // console.log(artboardObj);
        // set html with background color
        colorValElm.text(c);
        if (e) {
            draw(artboardObj);
        }
    };
    // draw when loaded
    draw(artboardObj);
});
