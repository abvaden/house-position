import { ConvertToDecimalDegrees, DegToRad } from './functions';

interface Point {
    x: number;
    y: number;
}

export function LotPath(svg: SVGSVGElement) {
    const s1 = 110;
    const s2 = 269;
    const s3 = 250;


    const thetaA = ConvertToDecimalDegrees(68, 32, 59);
    const thetaB = ConvertToDecimalDegrees(21, 47, 56);
    const thetaC = ConvertToDecimalDegrees(71, 39, 53);
    const thetaD = ConvertToDecimalDegrees(10, 34.9, 0);
    // const thetaD = ConvertToDecimalDegrees(12, 38.9, 0);

    const theta1 = thetaB + thetaC;
    const theta2 = 180 - (thetaA + thetaB);
    const theta3 = thetaA + thetaD;
    const theta4 = 360 - (theta1 + theta2 + theta3);

    // Solve for S4 by using law of cosins to solve to the diganal length
    // S3^2 + S1^2 - 2*S3*S1*cos(theta1)=s5^2

    const theta1Rad = theta1 * (Math.PI / 180.0);
    const s5Sqr = Math.pow(s3, 2) + Math.pow(s1, 2) - (2 * s3 * s1 * Math.cos(theta1Rad));
    const s5 = Math.sqrt(s5Sqr);

    // Then use law of cosines to solve for theta2*x
    //                s1^2 + s5^2 - s3^2
    // cos(theta2X) = ------------------
    //                   2 * s1 * s5
    //
    // then use law of sines to solve for s4
    // s4 / sin(theta2X) = s5 / sin(theta3)

    const cosTheta2X = (Math.pow(s1, 2) + Math.pow(s5, 2) - Math.pow(s3, 2)) / (2 * s1 * s5);
    const theta2xRad = Math.acos(cosTheta2X);
    const theta2x = theta2xRad * 180 / Math.PI;
    const x = theta2x / theta2;

    const theta3Rad = theta3 * Math.PI / 180;
    const s5sintheta3 = s5 / Math.sin(theta3Rad);

    const theta21_x = theta2 * (1 - x);
    const theta2Rad1_x = theta21_x * Math.PI / 180;

    const s4 = s5sintheta3 * Math.sin(theta2Rad1_x);


    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    // Corner theta1 is origin
    const polygon: SVGPolygonElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const p1X = 0;
    const p1Y = 0;

    const p2X = p1X - Math.sin(DegToRad(thetaB)) * s1;
    const p2Y = p1Y + Math.cos(DegToRad(thetaB)) * s1;

    const p3X = p2X + Math.sin(DegToRad(thetaA)) * s2;
    const p3Y = p2Y + Math.cos(DegToRad(thetaA)) * s2;

    const p4X = p3X - Math.sin(DegToRad(thetaD)) * s4;
    const p4Y = p3Y - Math.cos(DegToRad(thetaD)) * s4;

    console.log(s4);

    const p1 = svg.createSVGPoint();
    p1.x = p1X;
    p1.y = p1Y;

    const p2 = svg.createSVGPoint();
    p2.x = p2X;
    p2.y = p2Y;

    const p3 = svg.createSVGPoint();
    p3.x = p3X;
    p3.y = p3Y;

    const p4 = svg.createSVGPoint();
    p4.x = p4X;
    p4.y = p4Y;

    polygon.points.appendItem(p1);
    polygon.points.appendItem(p2);
    polygon.points.appendItem(p3);
    polygon.points.appendItem(p4);

    polygon.style.fill = 'var(--primary)';
    polygon.style.strokeWidth = '2';
    polygon.style.stroke = 'black';
    polygon.style.fillOpacity = '.5';

    console.log(`S1 : ${(s1 - d(p1, p2)).toFixed(1)}`);
    console.log(`S2 : ${(s2 - d(p2, p3)).toFixed(1)}`);
    console.log(`S3 : ${(s3 - d(p1, p4)).toFixed(1)}`);
    console.log(`S4 : ${(s4 - d(p3, p4)).toFixed(1)}`);



    g.appendChild(polygon);
    g.appendChild(makePointGroup(svg, p1X, p1Y, 'P1'));
    g.appendChild(makePointGroup(svg, p2X, p2Y, 'P2'));
    g.appendChild(makePointGroup(svg, p3X, p3Y, 'P3'));
    g.appendChild(makePointGroup(svg, p4X, p4Y, 'P4'));

    return g;
}

function makePointGroup(svg: SVGSVGElement, x: number, y: number, label: string) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const t = svg.createSVGTransform();
    t.setTranslate(x, y);

    g.transform.baseVal.appendItem(t);
    const p1Circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    p1Circle.style.fill = 'red';
    p1Circle.r.baseVal.value = 5;

    const p1CircleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    p1CircleText.textContent = label;

    g.appendChild(p1Circle);
    g.appendChild(p1CircleText);

    return g;
}


function d(a: DOMPoint, b: DOMPoint): number {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(a.y - b.y, 2));
}