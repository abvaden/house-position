
export class Logger {

    constructor() {
    }

    log(message: string): void {
        const node = document.getElementById("LogMessages");
        node.appendChild(this.makeLogMessageNode(message))l
    }

    private makeLogMessageNode(message: string) {
        const node = new HTMLDivElement();
        node.innerText = message;
        return node;
    }
}