interface Point {
    x: number;
    y: number;
}

export function HousePath(svg: SVGSVGElement) {


    const houseWidth = 35;
    const houseLength = 45;
    const garagePrimaryWidth = 25;
    const garageSecondaryWidth = 17;
    const garageSecondaryLength = 9;
    const garagePrimaryLength = 22;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    // Corner theta1 is origin
    const polygon: SVGPolygonElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');


    const p1 = svg.createSVGPoint();
    p1.x = 0;
    p1.y = 0;

    const p2 = svg.createSVGPoint();
    p2.x = p1.x + garagePrimaryWidth + houseWidth + garageSecondaryWidth;
    p2.y = p1.y + 0;

    const p3 = svg.createSVGPoint();
    p3.x = p2.x;
    p3.y = p2.y + houseLength;

    const p4 = svg.createSVGPoint();
    p4.x = p3.x - houseWidth;
    p4.y = p3.y + 0;

    const p5 = svg.createSVGPoint();
    p5.x = p4.x + 0;
    p5.y = p4.y - houseLength + garagePrimaryLength;

    const p6 = svg.createSVGPoint();
    p6.x = p5.x - garagePrimaryWidth;
    p6.y = p5.y + 0;

    const p7 = svg.createSVGPoint();
    p7.x = p6.x + 0;
    p7.y = p6.y + garageSecondaryLength;

    const p8 = svg.createSVGPoint();
    p8.x = p7.x - garageSecondaryWidth;
    p8.y = p7.y + 0;

    polygon.points.appendItem(p1);
    polygon.points.appendItem(p2);
    polygon.points.appendItem(p3);
    polygon.points.appendItem(p4);
    polygon.points.appendItem(p5);
    polygon.points.appendItem(p6);
    polygon.points.appendItem(p7);
    polygon.points.appendItem(p8);

    polygon.style.fill = 'var(--warning)';
    polygon.style.strokeWidth = '2';
    polygon.style.stroke = 'black';
    polygon.style.fillOpacity = '.5';


    g.appendChild(polygon);

    return g;
}