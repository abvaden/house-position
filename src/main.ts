import { Logger } from "./greeter"

const logger = new Logger();

const s1= 110
const s2 = 269
const s3 = 250


const thetaA = 68 + (32/60) + (59 / 3600)
const thetaB = 21 + (47/60) + (56 / 3600)
const thetaC = 71 + (39/60) + (53 / 3600)
const thetaD = 10 + (34.9/60)

const theta1 = thetaB + thetaC
const theta2 = 180 - (thetaA + thetaB)
const theta3 = thetaA + thetaD
const theta4 = 360 - (theta1 + theta2 + theta3)

logger.log(`Theta1 = ${theta1}`);
logger.log(`Theta2 = ${theta2}`);
logger.log(`Theta3 = ${theta3}`);
logger.log(`Theta4 = ${theta4}`);


// Solve for S4 by using law of cosins to solve to the diganal length
// S3^2 + S1^2 - 2*S3*S1*cos(theta1)=s5^2

const theta1Rad = theta1 * (Math.PI / 180.0)
const s5Sqr = Math.pow(s3, 2) + Math.pow(s1, 2) - (2 * s3 * s1 * Math.cos(theta1Rad))
const s5 = Math.sqrt(s5Sqr)
logger.log(`S5 = ${s5}`);

// Then use law of cosines to solve for theta2*x 
//                s1^2 + s5^2 - s3^2
// cos(theta2X) = ------------------
//                   2 * s1 * s5
//
// then use law of sines to solve for s4
// s4 / sin(theta2X) = s5 / sin(theta3)

const cosTheta2X = (Math.pow(s1, 2) + Math.pow(s5, 2) - Math.pow(s3, 2)) / (2 * s1 * s5)
const theta2xRad = Math.acos(cosTheta2X)
const theta2x = theta2xRad * 180 / Math.PI
const x = theta2x / theta2

const theta3Rad = theta3 * Math.PI / 180 
const s5sintheta3 = s5 / Math.sin(theta3Rad)

const theta21_x = theta2 * (1 - x)
const theta2Rad1_x = theta21_x * Math.PI / 180

const s4 = s5sintheta3 * Math.sin(theta2Rad1_x)
logger.log(`S4 = ${s4}`);
