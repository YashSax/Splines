let splinePoints = [];
let points = [];
let numPoints;
let t = 0;
let max_t = 300;

function mouseClicked() {
  fill(0, 0, 0)
  if (points.length < numPoints) {
    ellipse(mouseX, mouseY, 3, 3)
    points.push([mouseX, mouseY])
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight - 10);
  background(200, 200, 200)

  numPoints = prompt("How many points do you want on the spline? Must be >1.")
}

function interpolate(s, e, p) {
  let x = s[0] + p * (e[0] - s[0])
  let y = s[1] + p * (e[1] - s[1])
  return [x, y]
}

function interpPoints(vertices) {
  vertices.map((p) => ellipse(p[0], p[1], 5, 5, 127))
  let midpoints = []
  for (let i = 0; i < vertices.length - 1; i++) {
    let fp = vertices[i];
    let sp = vertices[i + 1]
    
    fill(127, 127, 127)
    line(fp[0], fp[1], sp[0], sp[1])
    let midpoint = interpolate(fp, sp, t / max_t);
    midpoints.push(midpoint);
  }
  
  if (midpoints.length == 1) {
    splinePoints.push(midpoints[0])
  }
  
  if (midpoints.length > 0) {
    interpPoints(midpoints)
  }
}

function updateSpline() {
  background(200, 200, 200)
  if (t > max_t) {
    t = max_t;
  }
  interpPoints(points)
}

function draw() {
  if (points.length >= numPoints) {
    updateSpline()

    for (let i = 0; i < splinePoints.length - 1; i++) {
        strokeWeight(5)
        line(
            splinePoints[i][0],
            splinePoints[i][1],
            splinePoints[i + 1][0],
            splinePoints[i + 1][1],
        )
        strokeWeight(1)
    }
    t++;
  }
}