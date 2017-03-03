import React, {Component} from 'react';
import {observer} from 'mobx-react';

var Spacer = props => <div style={{height: "2cm"}}></div>;

var Box = props => {
    var solidLine = "1pt solid black";
    var dottedLine = "1pt solid #eee";
    var invisibleLine = "1pt solid white";
    var style = {
        display: "table-cell",
        width: props.w + "mm",
        maxWidth: props.w + "mm",
        overflow: "hidden",
        height: props.h + "mm",
        maxHeight: props.h + "mm",
        padding: "0"
    };

    style.borderLeft = invisibleLine;
    style.borderTop = invisibleLine;
    style.borderBottom = invisibleLine;
    style.borderRight = invisibleLine;

    if (props.b) {
        style.borderBottom = solidLine;
    }

    if (props.t) {
        style.borderTop = solidLine;
    }

    if (props.l) {
        style.borderLeft = solidLine;
    }

    if (props.r) {
        style.borderRight = solidLine;
    }

    if (props.bd) {
        style.borderBottom = dottedLine;
    }

    if (props.td) {
        style.borderTop = dottedLine;
    }

    if (props.rd) {
        style.borderRight = dottedLine;
    }

    if (props.ld) {
        style.borderLeft = dottedLine;
    }

    return <div className={props.className} style={style}>{props.children}</div>
};

var CutoutBox = props => {
    const leg = 5;

    return <div className={props.className}>
        <div>
            <Box className="tl" w={leg} h={leg}/>
            <Box className="tc" w={props.width} l r h={leg} bd={props.dotted}/>
            <Box className="tr" w={leg} h={leg}/>
        </div>
        <div>
            <Box className="cl" w={leg} h={props.height} t b rd={props.dotted}/>
            <Box className="cc" w={props.width} h={props.height}>{props.children}</Box>
            <Box className="cr" w={leg} h={props.height} t b ld={props.dotted}/>
        </div>
        <div>
            <Box className="bl" w={leg} h={leg}/>
            <Box className="bc" w={props.width} l r h={leg} td={props.dotted}/>
            <Box className="br" w={leg} h={leg}/>
        </div>
    </div>
};


@observer
class App extends Component {
    render() {
        var appState = this.props.appState;

        var apts = [];
        for (var i = 1; i <= 20; apts.push(i++)) {}

        var appt = appState.showAppartment ? <span className="appartment">{appState.appartment}</span> : null;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-1 noprint"></div>
                    <div className="col-md-3 noprint">
                        <h1>Deine Daten</h1>
                        <form onSubmit={e => e.preventDefault()}>
                            {appState.names.map((n, i) =>
                                <div className="form-group" key={i}>
                                    <label>{i ? "noch ein " : ""}Name</label><br/>
                                    <input key={i} value={n} placeholder={i === 0 ? "ein Name pro Feld" : i > 2 ? "ab hier wird's eng" : `${i+1}. Name`}
                                           onChange={e => this.nameChanged(n, i, e)}/></div>)}

                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" checked={appState.showAppartment}
                                           onChange={e => appState.showAppartment = e.target.checked}/> Wohnungsnummer
                                    anzeigen
                                </label>
                            </div>
                                {appState.showAppartment ?
                            <div className="form-group">
                                    <label htmlFor="appartmentNumber">Wohnung&nbsp;</label>
                                <select id="appartmentNumber" value={appState.appartment}
                                        onChange={e => appState.appartment = e.target.value}>
                                    {apts.map(i => <option key={i} value={i}>{i}</option>)}
                                </select>
                            </div>
                                    :
                                    null }

                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" checked={appState.dotted}
                                           onChange={e => appState.dotted = e.target.checked}/> Schnittkanten für
                                    Scheren
                                </label>
                            </div>
                            {appState.dotted ? <p className="info">Wenn du ein Messer und ein Lineal aus Metall hast, solltest du die Schnittkanten ausblenden.</p> : null}

                            {appState.names.filter(n => !!n).length ?
                            <div className="form-group">
                                <button className="btn btn-success letsgo" onClick={() => { window.print(); return false; }}>Drucken</button>
                            </div>
                                : null
                            }
                        </form>
                    </div>
                    <div className="col-md-1 noprint"></div>
                    <div className="col-md-5">
                        <h1 className="noprint">Labels</h1>
                        <div className="labelSheet">
                            <CutoutBox className="letterBox" width="65" height="14"
                                       dotted={appState.dotted}>
                                {appt}
                                <span className="names">{appState.names.filter(n => !!n).join("/")}</span></CutoutBox>
                            <Spacer/>
                            <CutoutBox className="letterBox" width="65" height="14"
                                       dotted={appState.dotted}>
                                {appt}
                                <span className="names">{appState.names.filter(n => !!n).join("/")}</span></CutoutBox>
                            <Spacer/>

                            <CutoutBox className="letterBox" width="60" height="15"
                                       dotted={appState.dotted}>
                                {appt}
                                <span className="names">{appState.names.filter(n => !!n).join("/")}</span></CutoutBox>
                            <Spacer/>

                            <CutoutBox className="doorBell" width="47" height="37"
                                       dotted={appState.dotted}>
                                {appt}
                                { appState.names.filter(n => !!n).length < 3 ? <br/> : null}
                                <span className="names">{appState.names.filter(n => !!n).map(n => [n, <br/>])}</span>
                            </CutoutBox></div>
                    </div>

                </div>
            </div>
        );
    }

    nameChanged(oldName, index, event) {
        var names = this.props.appState.names;
        var newName = event.target.value;

        names[index] = newName;

        if (!newName) {
            names.replace(names.filter(n => !!n));
            names.push("");
        } else {
            var last = names[names.length - 1];
            if (last) {
                names.push("");
            }
        }
    }
}


export default App;
