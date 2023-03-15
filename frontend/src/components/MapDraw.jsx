import { forwardRef, useEffect, useState } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";

const MapDraw = forwardRef((props, editRef) => {
    const [drawing, setDrawing] = useState(false);

    const onShapeDrawn = (e) => {
        setDrawing(false);
        e.layer.on("click", () => {
            editRef._toolbars.edit._modes.edit.handler.enable();
        });
        e.layer.on("contextmenu", () => {
            // do some contextmenu action here
        });
        e.layer.bindTooltip("Text", {
            className:
                "leaflet-draw-tooltip:before leaflet-draw-tooltip leaflet-draw-tooltip-visible leaflet-draw-tooltip-single",
            sticky: true,
            direction: "right",
        });
    };

    useEffect(() => {
        if (editRef) {
            // Once the EditControl component has mounted, set up the EditRef reference
            editRef._toolbars.draw._modes.polygon.handler.disable();
            editRef._toolbars.draw._modes.rectangle.handler.disable();
        }
    }, [editRef]);

    return (
        <FeatureGroup>
            <EditControl
                onMounted={props.onMounted}
                position="topright"
                onCreated={onShapeDrawn}
                draw={{
                    circle: false,
                    polyline: false,
                    circlemarker: false,
                    marker: false,
                    polygon: {
                        allowIntersection: false,
                        shapeOptions: {
                            color: "#ff0000",
                        },
                    },
                    rectangle: {
                        shapeOptions: {
                            color: "#ff0000",
                        },
                        showArea: false,
                    },
                }}
            />
        </FeatureGroup>
    );
});

export default MapDraw;
