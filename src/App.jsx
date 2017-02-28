import React, {Component} from 'react';
import {observer} from 'mobx-react';
/*
import {makeLabelSet} from './labels';
import blobStream from 'blob-stream';
var PDFDocument = require('pdfkit');
*/


class Box extends Component {
    render() {
        var solidLine = "1px solid black";
        var dottedLine = "1px dotted black";
        var style = {
            fontFamily: "Source Sans Pro, Times New Roman",
            fontWeight: "Bold",
            fontSize: "14pt",
            display: "table-cell", verticalAlign: "middle", width: this.props.w + "mm", overflow: "hidden", height: this.props.h + "mm", padding: "0", textAlign: "center" };

        if (this.props.b) {
            style.borderBottom = solidLine;
        }

        if (this.props.t) {
            style.borderTop = solidLine;
        }

        if (this.props.l) {
            style.borderLeft = solidLine;
        }

        if (this.props.r) {
            style.borderRight = solidLine;
        }

        if (this.props.bd) {
            style.borderBottom = dottedLine;
        }

        if (this.props.td) {
            style.borderTop = dottedLine;
        }

        if (this.props.rd) {
            style.borderRight = dottedLine;
        }

        if (this.props.ld) {
            style.borderLeft = dottedLine;
        }

        return <div style={style}>{this.props.text}</div>
    }
}

class CutoutBox extends Component {

    render() {
        const leg=10;
        
        return <div>
            <div>
                <Box w={leg} h={leg} b r />
                <Box w={this.props.width} h={leg} bd={this.props.dotted} />
                <Box w={leg} h={leg} b l />
            </div>
            <div>
                <Box w={leg} h={this.props.height} rd={this.props.dotted}/>
                <Box w={this.props.width} h={this.props.height} text={this.props.text} />
                <Box w={leg} h={this.props.height} ld={this.props.dotted}/>
            </div>
            <div>
                <Box w={leg} h={leg} t r />
                <Box w={this.props.width} h={leg} td={this.props.dotted}/>
                <Box w={leg} h={leg} t l />
            </div>
        </div>
    }
}


@observer
class App extends Component {
    render() {
        var appState = this.props.appState;

        var apts = [];
        for (var i = 1; i <=20; apts.push(i++)) {}

        return (
            <div>
                <input value={appState.names} onChange={e => appState.names = e.target.value}/>
                <input type="checkbox" checked={appState.dotted} onChange={e => appState.dotted = e.target.checked} />
                <select value={appState.appartment} onChange={e => appState.appartment = e.target.value}>
                    {apts.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                <CutoutBox width="65" height="14" dotted={appState.dotted} text={appState.appartment + " " + appState.names}/>
                <CutoutBox width="65" height="14" dotted={appState.dotted} text={appState.names}/>
                <CutoutBox width="60" height="15" dotted={appState.dotted} text={appState.names}/>
                <CutoutBox width="47" height="37" dotted={appState.dotted} text={appState.names}/>


            </div>
        );
    }
}


export default App;
