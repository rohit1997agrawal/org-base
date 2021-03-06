    import { render } from 'react-dom';
import './index.css';
import * as React from "react";
import { LayoutAnimation, HierarchicalTree, DataBinding, DiagramComponent, SnapConstraints, Inject, DiagramTools } from "@syncfusion/ej2-react-diagrams";
import { SampleBase } from './sample-base';
import { DataManager } from "@syncfusion/ej2-data";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { localBindData } from './diagram-data';
const SAMPLE_CSS = `.image-pattern-style {
        background-color: white;
        background-size: contain;
        background-repeat: no-repeat;
        height: 75px;
        width: calc((100% - 18px) / 3);
        cursor: pointer;
        border: 1px solid #D5D5D5;
        background-position: center;
        float: left;
    }

    .image-pattern-style:hover {
        border-color: gray;
        border-width: 2px;
    }

    .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .row-header {
        font-size: 13px;
        font-weight: 500;
    }

    .row-header1 {
        font-size: 12px;
        padding-left: 2px;
        font-weight: 400;
    }

    .property-panel-header {
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .e-selected-orientation-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .e-selected-pattern-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .e-checkbox-wrapper .e-label {
        font-size: 12px;
    }

    .diagram-control-pane .col-xs-6 {
        padding-left: 0px;
        padding-right: 0px;
    }`;
let diagramInstance;
let hSpacing;
let vSpacing;
let orien;
let typ;
export class OrganizationModel extends SampleBase {
    rendereComplete() {
        //Click Event for orientation of the PropertyPanel.
        document.getElementById("orientation").onclick = (args) => {
            let target = args.target;
            if (target.className === "image-pattern-style e-selected-orientation-style") {
                switch (target.id) {
                    case "toptobottom":
                        diagramInstance.layout.orientation = "TopToBottom";
                        break;
                    case "bottomtotop":
                        diagramInstance.layout.orientation = "BottomToTop";
                        break;
                    case "lefttoright":
                        diagramInstance.layout.orientation = "LeftToRight";
                        break;
                    case "righttoleft":
                        diagramInstance.layout.orientation = "RightToLeft";
                        break;
                    default:
                        if (selectedElement.length) {
                            selectedElement[0].classList.remove("e-selected-orientation-style");
                        }
                }
                diagramInstance.dataBind();
                diagramInstance.doLayout();
            }
        };
        //Click Event for pattern of the PropertyPanel.
        document.getElementById("pattern").onclick = (args) => {
            let target = args.target;
            if (target.className === "image-pattern-style e-selected-pattern-style") {
                switch (target.id) {
                    case "pattern1":
                        orien = "Vertical".toString();
                        typ = "Alternate";
                        break;
                    case "pattern2":
                        orien = "Vertical".toString();
                        typ = "Left";
                        break;
                    case "pattern3":
                        orien = "Vertical".toString();
                        typ = "Left";
                        break;
                    case "pattern4":
                        orien = "Vertical".toString();
                        typ = "Right";
                        break;
                    case "pattern5":
                        orien = "Vertical".toString();
                        typ = "Right";
                        break;
                    case "pattern6":
                        orien = "Horizontal".toString();
                        typ = "Balanced";
                        break;
                    case "pattern7":
                        orien = "Horizontal".toString();
                        typ = "Center";
                        break;
                    case "pattern8":
                        orien = "Horizontal".toString();
                        typ = "Left";
                        break;
                    case "pattern9":
                        orien = "Horizontal".toString();
                        typ = "Right";
                        break;
                    default:
                        if (selectedpatternElement.length) {
                            selectedpatternElement[0].classList.remove("e-selected-pattern-style");
                        }
                }
                diagramInstance.layout.getLayoutInfo = (node, options) => {
                    if (target.id === "pattern4" || target.id === "pattern3") {
                        options.offset = -50;
                    }
                    if (orien) {
                        getLayoutInfo(node, options, orien, typ);
                    }
                };
                diagramInstance.dataBind();
                diagramInstance.doLayout();
            }
        };
    }
    render() {
        return (<div className="control-pane diagram-control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="col-lg-8 control-section">
          <div className="content-wrapper" style={{ width: "100%" }}>
            <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"700px"} snapSettings={{ constraints: SnapConstraints.None }} 
        //configures data source settings
        dataSourceSettings={{
            id: "Id",
            parentId: "Manager",
            dataSource: new DataManager(localBindData),
            doBinding: (nodeModel, data, diagram) => {
                nodeModel.shape = {
                    type: "Text",
                    content: data.Role,
                    margin: { left: 10, right: 10, top: 10, bottom: 10 }
                };
            }
        }} 
        //Disables all interactions except zoom/pan
        tool={DiagramTools.ZoomPan} 
        //Configures automatic layout
        layout={{
            type: "OrganizationalChart",
            getLayoutInfo: (node, options) => {
                /* tslint:disable:no-string-literal */
                if (node.data["Role"] === "General Manager") {
                    options.assistants.push(options.children[0]);
                    options.children.splice(0, 1);
                }
                if (!options.hasSubTree) {
                    options.type = "Right";
                }
            }
        }} 
        //Defines the default node and connector properties
        getNodeDefaults={(obj, diagram) => {
            /* tslint:disable:no-string-literal */
            return nodeDefaults(obj, diagram);
        }} getConnectorDefaults={(connector, diagram) => {
            return connectorDefaults(connector, diagram);
        }}>
              <Inject services={[DataBinding, HierarchicalTree, LayoutAnimation]}/>
            </DiagramComponent>
          </div>
        </div>

        <div className="col-lg-4 property-section" style={{ float: "right", height: "80%" }}>
          <div className="property-panel-header">Properties</div>
          <div className="row property-panel-content" id="appearance">
            <div className="row" style={{ paddingTop: "10px" }}>
              <div className="row row-header">Orientation</div>
              <div id="orientation">
                <div className="row" style={{ paddingTop: "8px" }}>
                  <div className="image-pattern-style e-selected-orientation-style" id="toptobottom" style={{
            backgroundImage: "url('https://ej2.syncfusion.com/react/demos/src/diagram/Images/common-orientation/toptobottom.png')",
            marginRight: "3px"
        }}/>
                  <div className="image-pattern-style" id="bottomtotop" style={{
            backgroundImage: "url('https://ej2.syncfusion.com/react/demos/src/diagram/Images/common-orientation/bottomtotop.png')",
            margin: "0px 3px"
        }}/>
                  <div className="image-pattern-style" id="lefttoright" style={{
            backgroundImage: "url('https://ej2.syncfusion.com/react/demos/src/diagram/Images/common-orientation/lefttoright.png')",
            marginRight: "0px 3px"
        }}/>
                </div>
                <div className="row" style={{ paddingTop: "8px" }}>
                  <div className="image-pattern-style" id="righttoleft" style={{
            backgroundImage: "url('https://ej2.syncfusion.com/react/demos/src/diagram/Images/common-orientation/righttoleft.png')",
            margin: "0px 3px"
        }}/>
                </div>
              </div>
              <div className="row row-header" style={{ paddingTop: "10px" }}>
                Subtree Alignment
              </div>
              <div id="pattern">
                <div className="row" style={{ paddingTop: "8px" }}>
                  <div className="image-pattern-style" id="pattern1" style={{
            backgroundImage: "url('https://ej2.syncfusion.com/react/demos/src/diagram/patternimages/Pattern_1.png')",
            marginRight: "3px"
        }}/>
                  <div className="image-pattern-style e-selected-pattern-style" id="pattern2" style={{
            backgroundImage: "url('https://ej2.syncfusion.com/react/demos/src/diagram/patternimages/Pattern_2.png')",
            marginRight: "3px"
        }}/>
                  <div className="image-pattern-style" id="pattern5" style={{
            backgroundImage: "url('https://ej2.syncfusion.com/react/demos/src/diagram/patternimages/Pattern_5.png')",
            margin: "0px 3px"
        }}/>
                </div>
                <div className="row" style={{ paddingTop: "8px" }}>
                  <div className="image-pattern-style" id="pattern6" style={{
            backgroundImage: "url('https://ej2.syncfusion.com/react/demos/src/diagram/patternimages/Pattern_6.png')",
            marginRight: "3px"
        }}/>
                  <div className="image-pattern-style" id="pattern7" style={{
            backgroundImage: "url('https://ej2.syncfusion.com/react/demos/src/diagram/patternimages/Pattern_7.png')",
            marginRight: "3px"
        }}/>
                  <div className="image-pattern-style" id="pattern8" style={{
            backgroundImage: "url('https://ej2.syncfusion.com/react/demos/src/diagram/patternimages/Pattern_8.png')",
            margin: "0px 3px"
        }}/>
                </div>
                <div className="row" style={{ paddingTop: "8px" }}>
                  <div className="image-pattern-style" id="pattern9" style={{
            backgroundImage: "url('https://ej2.syncfusion.com/react/demos/src/diagram/patternimages/Pattern_9.png')",
            margin: "0px 3px"
        }}/>
                </div>
              </div>
            </div>
          </div>
          <div className="row property-panel-content" style={{ paddingTop: "10px" }}>
            <div className="row row-header">Behavior</div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div style={{ display: "table", height: "35px" }} className="col-xs-6">
                <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                  Horizontal Spacing
                </div>
              </div>
              <div className="col-xs-6">
                <NumericTextBoxComponent ref={hSpacingRef => (hSpacing = hSpacingRef)} id="hSpacing" style={{ width: "100%" }} min={20} max={60} step={2} value={30} change={() => {
            diagramInstance.layout.horizontalSpacing = Number(hSpacing.value);
            diagramInstance.dataBind();
        }}/>
              </div>
            </div>
            <div className="row" style={{ paddingTop: "8px" }}>
              <div style={{ display: "table", height: "35px" }} className="col-xs-6">
                <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                  Vertical Spacing
                </div>
              </div>
              <div className="col-xs-6">
                <NumericTextBoxComponent ref={vSpacingRef => (vSpacing = vSpacingRef)} id="vSpacing" style={{ width: "100%" }} min={20} max={60} step={2} value={30} change={() => {
            diagramInstance.layout.verticalSpacing = Number(vSpacing.value);
            diagramInstance.dataBind();
        }}/>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
}
//set orientation and type of the Layout.
function getLayoutInfo(node, options, orientation, type) {
    /* tslint:disable:no-string-literal */
    if (node.data["Role"] === "General Manager") {
        options.assistants.push(options.children[0]);
        options.children.splice(0, 1);
    }
    if (!options.hasSubTree) {
        options.orientation = orientation;
        options.type = type;
    }
}
//sets default value for Node.
function nodeDefaults(obj, diagram) {
    obj.backgroundColor = obj.data.color;
    obj.style = { fill: "none", strokeColor: "none", color: "white" };
    obj.expandIcon = {
        height: 10,
        width: 10,
        shape: "None",
        fill: "lightgray",
        offset: { x: 0.5, y: 1 }
    };
    obj.expandIcon.verticalAlignment = "Center";
    obj.expandIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon.offset = { x: 0.5, y: 1 };
    obj.collapseIcon.verticalAlignment = "Center";
    obj.collapseIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
    obj.collapseIcon.height = 10;
    obj.collapseIcon.width = 10;
    obj.collapseIcon.shape = "None";
    obj.collapseIcon.fill = "lightgray";
    obj.width = 120;
    obj.height = 30;
    return obj;
}
//sets default value for Connector.
function connectorDefaults(connector, diagram) {
    connector.targetDecorator.shape = "None";
    connector.type = "Orthogonal";
    connector.constraints = 0;
    connector.cornerRadius = 0;
    return connector;
}

render(<OrganizationModel />, document.getElementById('sample'));