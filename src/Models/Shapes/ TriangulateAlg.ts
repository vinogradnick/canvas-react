
export function TriangulateAlgo(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,//определяем есть ли отверстия
        outerLen = hasHoles ? holeIndices[0] * dim : data.length, //определяем внешнюю длину
        outerNode = linkedList(data, 0, outerLen, dim, true), //определяем внешние узлы
        triangles = [];//список треугольников

    if (!outerNode || outerNode.next === outerNode.prev) return triangles;

    earcutLinked(outerNode, triangles, dim);

    return triangles;
}

function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
        for (i = start; i < end; i += dim)
            last = insertNode(i, data[i], data[i + 1], last);
    } else {
        for (i = end - dim; i >= start; i -= dim)
            last = insertNode(i, data[i], data[i + 1], last);
    }

    if (last && equals(last, last.next)) {
        console.log(last.i);
        removeNode(last);
        last = last.next;
    }

    return last;
}
function earcutLinked(ear, triangles, dim) {
    if (!ear) return;



    var stop = ear,
        prev, next;

    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (isEar(ear)) {
            console.log(ear.i);
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);
            console.log(triangles);
            removeNode(ear);

            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        if (ear === stop) {


            break;
        }
    }
}
function isEar(ear) {

    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; 

    var p = ear.next.next;

    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;

    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}
export class Node {
    public prev: Node = null;
    public next: Node = null;
    constructor(public i: number, public x: number, public y: number) {

    }
}


function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
        (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
        (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}
// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}
function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}