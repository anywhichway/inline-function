function makeWorker(script) {
    const URL = window.URL || window.webkitURL,
        Blob = window.Blob,
        Worker = window.Worker;

    if (!URL || !Blob || !Worker || !script) {
        return null;
    }

    const blob = new Blob([script]);
    return new Worker(URL.createObjectURL(blob));
}

self.reactive({attributes:["showfunction"]});

self.properties({
    render() {
        // dummy, gets redefined on initialize
    },
    initialize() {
        this.style.width = "fit-content";
        this.style.maxWidth = "fit-content";
        this.style.fontStyle = "italic";
        let worker;
        this.render = function() {
            if(!worker) {
                const {imports,inline} = [...this.querySelectorAll("script")].reduce(({imports,inline},script) => {
                    const src = script.getAttribute("src");
                    if(src) {
                        imports.push(new URL(src,document.baseURI).href);
                    } else {
                        inline = script.textContent.trim()||inline;
                    }
                    return {imports,inline};
                },{imports:[],inline:"()=>{}"});
                worker = makeWorker(
                    `importScripts(...${JSON.stringify(imports)});
            self.addEventListener('message',(event) => {
                postMessage(JSON.stringify((${inline})(event.data)));
            });`
                );
                worker.onmessage = (event) => {
                    const text = this.querySelector('expression')?.textContent.trim() || "undefined",
                        result = cleaner(event.data);
                    this.shadowRoot.innerHTML = `<span style="width:fit-content;white-space: nowrap;">${this.getAttribute("showfunction")==="true" ? text + " = " : ""}${result}</span>`
                }
            }
            let f = this.querySelector('expression')?.textContent.trim() || "undefined";
            if(f) {
                this.setAttribute("title",f);
                if(f.startsWith("{") && f.endsWith("}") && f.includes("return ")) {
                    f = `(() => { return ${f.replaceAll("\n","")}})()`;
                }
                worker.postMessage(f);
            }
        }
    }
})

