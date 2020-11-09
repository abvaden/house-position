
export function ConvertToDecimalDegrees(degrees: number, minutes: number, seconds: number): number {
    return degrees + (minutes / 60) + (seconds / 60);
}

export function DegToRad(val: number) {
    return val * Math.PI / 180;
}