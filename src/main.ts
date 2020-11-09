
import { LotPath } from './lot';
import { HousePath } from './house';

import * as localforage from 'localforage';


const fig: SVGSVGElement = document.getElementById('fig') as any;

const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
const cartesianTransform = fig.createSVGTransform();
group.transform.baseVal.appendItem(cartesianTransform);

fig.appendChild(group);

group.appendChild(LotPath(fig));

const houseTransformRotate = fig.createSVGTransform();
const houseTransformTranslate = fig.createSVGTransform();
const house = HousePath(fig);
house.transform.baseVal.appendItem(houseTransformTranslate);
house.transform.baseVal.appendItem(houseTransformRotate);

group.appendChild(house);

const HOUSE_PARAMS_KEY = 'house';
const WINDOW_PARAMS_KEY = 'window';


const PAN_X_INPUT_NAME = 'pan-x-input';
const PAN_X_INPUT_LABEL_NAME = 'pan-x-input-label';
const PAN_Y_INPUT_NAME = 'pan-y-input';
const PAN_Y_INPUT_LABEL_NAME = 'pan-y-input-label';
const ZOOM_INPUT_NAME = 'zoom-input';


document.getElementById(PAN_X_INPUT_NAME).oninput = updateWindow;
document.getElementById(PAN_Y_INPUT_NAME).oninput = updateWindow;
document.getElementById(ZOOM_INPUT_NAME).oninput = updateWindow;

const baseZoomX = 500;
const baseZoomY = 250;

interface WindowParams {
    panX: number;
    panY: number;
    zoom: number;
}

async function updateWindow(e: Event, restore?: boolean): Promise<void> {

    const panXInput = document.getElementById(PAN_X_INPUT_NAME) as HTMLInputElement;
    const panYInput = document.getElementById(PAN_Y_INPUT_NAME) as HTMLInputElement;
    const zoomInput = document.getElementById(ZOOM_INPUT_NAME) as HTMLInputElement;

    let p: WindowParams;
    if (restore) {
        p = await localforage.getItem(WINDOW_PARAMS_KEY);
        if (!p) {
            p = {
                panX: 0,
                panY: 0,
                zoom: 1
            };
        }

        panXInput.value = p.panX.toString();
        panYInput.value = p.panY.toString();
        zoomInput.value = p.zoom.toString();

    } else {

        const x = parseFloat(panXInput.value);
        const y = parseFloat(panYInput.value);
        const zoom = parseFloat(zoomInput.value);

        p = {
            panX: x,
            panY: y,
            zoom,
        };
    }


    fig.viewBox.baseVal.x = p.panX;
    fig.viewBox.baseVal.y = p.panY;
    fig.viewBox.baseVal.width = (1 / p.zoom) * baseZoomX;
    fig.viewBox.baseVal.height = (1 / p.zoom) * baseZoomY;

    const panYInputLabel = document.getElementById(PAN_Y_INPUT_LABEL_NAME);
    const panXInputLabel = document.getElementById(PAN_X_INPUT_LABEL_NAME);
    panXInputLabel.innerText = `X: ${p.panX.toFixed(0)}`;
    panYInputLabel.innerText = `Y: ${p.panY.toFixed(0)}`;

    localforage.setItem(WINDOW_PARAMS_KEY, p);
    return;
}


document.getElementById('house-x-range').oninput = updateHouse;
document.getElementById('house-y-range').oninput = updateHouse;
document.getElementById('house-rotate-range').oninput = updateHouse;


interface HouseParams {
    x: number;
    y: number;
    theta: number;
}

async function updateHouse(e: Event, restore?: boolean): Promise<void> {

    const houseXRangeInput = document.getElementById('house-x-range') as HTMLInputElement;
    const houseYRangeInput = document.getElementById('house-y-range') as HTMLInputElement;
    const houseRotateRangeInput = document.getElementById('house-rotate-range') as HTMLInputElement;

    let houseParams: HouseParams;
    if (restore) {
        houseParams = await localforage.getItem(HOUSE_PARAMS_KEY);
        if (!houseParams) {
            houseParams = {
                theta: 0,
                x: 0,
                y: 0
            };
        }

        houseXRangeInput.value = houseParams.x.toString();
        houseYRangeInput.value = houseParams.y.toString();
        houseRotateRangeInput.value = houseParams.theta.toString();
    } else {

        const x = parseFloat(houseXRangeInput.value);
        const y = parseFloat(houseYRangeInput.value);
        const theta = parseFloat(houseRotateRangeInput.value);

        houseParams = {
            theta,
            x,
            y
        };
    }

    const houseXRangeLabel = document.getElementById('house-x-range-label') as HTMLLabelElement;
    const houseYRangeLabel = document.getElementById('house-y-range-label');
    const houseRotateRangeLabel = document.getElementById('house-rotate-range-label');
    houseTransformTranslate.setTranslate(houseParams.x, houseParams.y);
    houseTransformRotate.setRotate(houseParams.theta, (46 + 25 + 17) / 2, 46 / 2);

    houseXRangeLabel.innerText = `X: ${houseParams.x.toFixed(0)}`;
    houseYRangeLabel.innerText = `Y: ${houseParams.y.toFixed(0)}`;
    houseRotateRangeLabel.innerText = `θ: ${houseParams.theta.toFixed(0)}`;

    localforage.setItem(HOUSE_PARAMS_KEY, houseParams);
}


updateWindow(null, true);
updateHouse(null, true);