import React, {Component} from 'react';
import {observer} from 'mobx-react';

const Spacer = props => <div style={{height: "1cm"}}></div>;

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const Box = props => {
    let d = "";
    if (props.t) {
        d += `M0 0 l${props.w} 0 `;
    }
    if (props.r) {
        d += `M${props.w} 0 l0 ${props.h} `;
    }
    if (props.b) {
        d += `M0 ${props.h} l${props.w} 0 `;
    }
    if (props.l) {
        d += `M0 0 l0 ${props.h} `;
    }


    return <g transform={`translate(${props.x} ${props.y})`}>
        <path d={d}/>
    </g>;
};

const CutoutBox = props => {
    const leg = 5;

    const w = 2 * leg + props.width;
    const h = 2 * leg + props.height;

    let f = 1.0;
    if (isSafari) {
        f = 1 / 0.93;
    }


    return <svg width={`${2 * w}mm`} height={`${h}mm`} viewBox={`0 0 ${2 * f * w} ${f * h}`}>
        <Box w={leg} h={leg} r b x={0} y={0}/>
        <Box w={leg} h={leg} l b x={leg + props.width} y={0}/>

        <Box w={leg} h={leg} r t x={0} y={leg + props.height}/>
        <Box w={leg} h={leg} l t x={props.width + leg} y={leg + props.height}/>

        {props.dotted ?
            <rect x={leg} y={leg} width={props.width} height={props.height} className="dotted"/>
            : null
        }

        <g transform={`translate(${leg} ${leg})`}>
            {props.children}
        </g>

        <text y={2 * leg} className="info">
            <tspan x={w + 20}>{`${props.width}mm x ${props.height}mm`}</tspan>
            <tspan x={w + 20} dy="6">{props.where}</tspan>
            </text>
        ;
    </svg>;
};


@observer
class Labels extends Component {
    render() {
        const appState = this.props.appState;

        let letterBoxTexts = [];

        if (appState.multilineLetterbox) {
            if (appState.names.length) {
                letterBoxTexts.push(appState.names.filter(n => !!n)[0]);
            }
            if (appState.names.length > 1) {
                letterBoxTexts.push(appState.names.filter((n, i) => !!n && i).join("/"));
            }
        } else {
            letterBoxTexts.push(appState.names.filter((n) => !!n).join("/"));
        }
        if (appState.showAppartment) {
            letterBoxTexts[0] = `${appState.appartment} - ${letterBoxTexts[0]}`;
        }


        const lineSize = 6;
        const doorBellText =
            <text className="doorBell" x={47 / 2} y={appState.names.filter(n => !!n).length > 2 ? 0 : lineSize}>
                {appState.names.map((n, i) => <tspan x={47 / 2} dy={lineSize}>{n}</tspan>)}
            </text>;

        let letterBoxText;

        if (appState.multilineLetterbox) {
            letterBoxText = <text className="letterBox" y={-lineSize / 3.2} x={65 / 2}>
                {letterBoxTexts.map(t => <tspan x={65 / 2} dy={lineSize}>{t}</tspan>)}
            </text>
        } else {
            letterBoxText = <text className="letterBox" x={65 / 2} y={7}>{letterBoxTexts[0]} </text>
        }


        return <div className="labelSheet">
            <CutoutBox width={65} height={14}
                       dotted={appState.dotted}
                       where="Briefkasten"
            >
                {letterBoxText}
            </CutoutBox>

            <Spacer/>
            <CutoutBox width={65} height={14}
                       dotted={appState.dotted}
                       where="Briefkasten"
            >
                {letterBoxText}
            </CutoutBox>
            <Spacer/>
            <CutoutBox width={60} height={15}
                       dotted={appState.dotted}
                       where="Klingel Haustür"
            >
                {letterBoxText}
            </CutoutBox>
            <Spacer/>
            <CutoutBox width={47} height={37} dotted={appState.dotted}
                       where="Klingel Wohnungstür"
            >
                {doorBellText}
                {appState.showAppartment ?
                    <text className="doorBellAppartment" x="4" y="32">{appState.appartment}</text>
                    : null
                }
            </CutoutBox>

        </div>;
    }
}

@observer
class App extends Component {
    render() {
        const appState = this.props.appState;
        const apts = [];
        for (let i = 1; i <= 20; apts.push(i++)) {}

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-1 noprint"/>
                    <div className="col-md-3 noprint">
                        <h1>Deine Daten</h1>
                        <form onSubmit={e => e.preventDefault()}>
                            {appState.names.map((n, i) =>
                                <div className="form-group" key={`group${i}`}>
                                    <label>{i ? "noch ein " : ""}Name</label><br/>
                                    <input key={`textField${i}`} value={n}
                                           placeholder={i === 0 ? "ein Name pro Feld" : i > 2 ? "ab hier wird's eng" : `${i + 1}. Name`}
                                           onChange={e => this.nameChanged(n, i, e)}/></div>)}

                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" checked={appState.multilineLetterbox}
                                           onChange={e => appState.multilineLetterbox = e.target.checked}/> Briefkastenschild
                                    zweizeilig
                                </label>
                            </div>

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
                            {appState.dotted ?
                                <p className="info">Wenn du ein Messer und ein Lineal aus Metall hast, solltest du die
                                    Schnittkanten ausblenden.</p> : null}

                            {appState.names.filter(n => !!n).length ?
                                <div className="form-group">
                                    <button className="btn btn-success letsgo" onClick={() => {
                                        window.print();
                                        return false;
                                    }}>Drucken
                                    </button>
                                </div>
                                : null
                            }
                        </form>
                    </div>
                    <div className="col-md-1 noprint"/>
                    <div className="col-md-5">
                        <h1 className="noprint">Labels</h1>
                        <Labels appState={appState}/>
                    </div>

                </div>
            </div>
        );
    }

    nameChanged(oldName, index, event) {
        const names = this.props.appState.names;
        const newName = event.target.value;

        if (index === names.length - 1 && newName === "") {
            return;
        }

        names[index] = newName;

        if (!newName) {
            names.replace(names.filter(n => !!n));
            names.push("");
        } else {
            const last = names[names.length - 1];
            if (last) {
                names.push("");
            }
        }
    }
}


export default App;
