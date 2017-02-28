/**
 * Created by Stephan on 28.02.2017.
 */

const f = 72 / 25.4;
const m2p = mm => mm * f;
const p2m = p => p / f;


var config = {
    _labelFont: "/fonts/SourceSansPro-Bold.otf",
    labelFont: "",
    letterboxLabelTextSize: 13,
    ringButtonLabelTextSize: 14,
    lineHeight: 1.5,
    letterboxLabelWidth: 65,
    letterboxLabelHeight: 14,
    entryRingButtonLabelWidth: 60,
    entryRingButtonLabelHeight: 15,
    ringButtonLabelWidth: 47,
    ringButtonLabelHeight: 37,
    paddingTop: 4.0
};


var sheetConfig = {
    size: "A4"
};


/**
 *
 *          _|                      |_
 *
 *          _                        _
 *           |                      |
 *
 * @param doc
 * @param x
 * @param y
 * @param width
 * @param height
 */
function makeCuttingBox(doc, x, y, width, height) {

    var legSize = 5;

    doc.moveTo(m2p(x), m2p(y - legSize))
        .lineTo(m2p(x), m2p(y))
        .lineTo(m2p(x - legSize), m2p(y))
        .stroke();


    doc.moveTo(m2p(x + width), m2p(y - legSize))
        .lineTo(m2p(x + width), m2p(y))
        .lineTo(m2p(x + legSize + width), m2p(y))
        .stroke();

    doc.moveTo(m2p(x + width), m2p(y + height + legSize))
        .lineTo(m2p(x + width), m2p(y + height))
        .lineTo(m2p(x + legSize + width), m2p(y + height))
        .stroke();

    doc.moveTo(m2p(x), m2p(y + height + legSize))
        .lineTo(m2p(x), m2p(y + height))
        .lineTo(m2p(x - legSize), m2p(y + height))
        .stroke();
}


function makeLetterBoxLabel(doc, config, x, y, names, app) {
    doc.lineWidth(0.5);
    doc.fontSize(config.letterboxLabelTextSize).fillColor("black");

    var text = names.join("/");

    var options = {align: "center", width: m2p(config.letterboxLabelWidth)};
    var lineHeight = doc.heightOfString(text, options);

    var px = m2p(x);
    var py = m2p(y) + 0.5 * (m2p(config.letterboxLabelHeight) - lineHeight);

    makeCuttingBox(doc, x, y, config.letterboxLabelWidth, config.letterboxLabelHeight);
    //doc.font(config.labelFont).text(text, px, py, options);

    if (app) {
       // doc.font(config.labelFont).text("" + app, m2p(x + 5), py);
    }
}


function makeEntryRingButtonLabel(doc, config, x, y, names, app) {
    doc.lineWidth(0.5);
    doc.fontSize(config.letterboxLabelTextSize).fillColor("black");

    var text = names.join("/");
    var options = {align: "center", width: m2p(config.entryRingButtonLabelWidth)};
    var lineHeight = doc.heightOfString(text, options);

    var px = m2p(x);
    var py = m2p(y) + 0.5 * (m2p(config.entryRingButtonLabelHeight) - lineHeight);

    makeCuttingBox(doc, x, y, config.entryRingButtonLabelWidth, config.entryRingButtonLabelHeight);
    //doc.font(config.labelFont).text(text, px, py, options);
    if (app) {
        //doc.font(config.labelFont).text("" + app, m2p(x + 3), py);
    }
}

function makeRingButtonLabel(doc, config, x, y, names) {
    doc.lineWidth(0.5);
    doc.fontSize(config.ringButtonLabelTextSize).fillColor("black");

    makeCuttingBox(doc, x, y, config.ringButtonLabelWidth, config.ringButtonLabelHeight);
    //doc.font(config.labelFont);

    var ry = y;
    if (names.length === 1) {
        ry += config.lineHeight * p2m(config.ringButtonLabelTextSize);
    }

    var px = m2p(x);
    names.forEach((n, i) => {
        var py = m2p(ry + config.paddingTop) + i * config.lineHeight * config.ringButtonLabelTextSize;
        doc.text(n, px, py, { align: "center", width: m2p(config.ringButtonLabelWidth)})
    });
}

export function makeLabelSet(doc, names, appartment, description) {
    doc.addPage(sheetConfig);
    doc.fontSize(12);
   // doc.font("fonts/Fanwood Text.otf");
    doc.text(`Wohnung ${appartment}: ${names.join(", ")} ${description ? " - " + description : ""}`);

    function makeSet(x, y) {
        for(var i = 0; i < 2; i++) {
            makeLetterBoxLabel(doc, config, x, y + i * 30, names, appartment);
        }
        makeEntryRingButtonLabel(doc, config, x, y + 2 * 30, names, appartment);

        makeRingButtonLabel(doc, config, x + 90, y, names);
    }

    makeSet(30, 50);
    makeSet(30, 170);
}

