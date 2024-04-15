class BoxShadowGenerator {
    constructor(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, previewBox, rule, webkitRule, mozRule, color, colorRef, opacity, opacityRef, inset) {
        this.horizontal = horizontal;
        this.horizontalRef = horizontalRef;
        this.vertical = vertical;
        this.verticalRef = verticalRef;
        this.blur = blur;
        this.blurRef = blurRef;
        this.spread = spread;
        this.spreadRef = spreadRef;
        this.previewBox = previewBox;
        this.rule = rule;
        this.webkitRule = webkitRule;
        this.mozRule = mozRule;
        this.color = color;
        this.colorRef = colorRef;
        this.opacity = opacity;
        this.opacityRef = opacityRef;
        this.inset = inset;
    }

    initialize() {
        this.horizontalRef.value = this.horizontal.value;
        this.verticalRef.value = this.vertical.value;
        this.blurRef.value = this.blur.value;
        this.spreadRef.value = this.spread.value;
        this.colorRef.value = this.color.value;
        this.opacityRef.value = this.opacity.value;
        
        this.applyRule();
        this.showRule();
    }

    applyRule() {
        const rgbaValue = this.hexToRgb(this.colorRef.value);

        const shadowRule = `${this.insetRef ? "inset" : ""} ${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px rgba(${rgbaValue}, ${this.opacityRef.value})`;

        this.previewBox.style.boxShadow = shadowRule;
        this.currentRule = shadowRule;
    }

    showRule() {
        this.rule.innerText = this.currentRule;
        this.webkitRule.innerText = this.currentRule;
        this.mozRule.innerText = this.currentRule;
    }

    updateValue(type, value) {
        switch(type) {
            case "horizontal":
                this.horizontalRef.value = value;
                break;
            case "vertical":
                this.verticalRef.value = value;
                break;
            case "blur":
                this.blurRef.value = value;
                break;
            case "spread":
                this.spreadRef.value = value;
                break;
            case "color":
                this.colorRef.value = value;
                break;
            case "opacity":
                this.opacityRef.value = value;
                break;
            case "inset":
                this.insetRef = value;
                break;
        }

        this.applyRule();
        this.showRule();
    }

    enterUpdate(type) {
        switch(type) {
            case "horizontal-value":
                if (this.horizontalRef.value < -100 || this.horizontalRef.value > 100) {
                    return;
                }
                this.horizontal.value = this.horizontalRef.value;
                break;
            case "vertical-value":
                if (this.verticalRef.value < -100 || this.verticalRef.value > 100) {
                    return;
                }
                this.vertical.value = this.verticalRef.value;
                break;
            case "blur-value":
                if (this.blurRef.value < 0 || this.blurRef.value > 100) {
                    return;
                }
                this.blur.value = this.blurRef.value;
                break;
            case "spread-value":
                if (this.spreadRef.value < -100 || this.spreadRef.value > 100) {
                    return;
                }
                this.spread.value = this.spreadRef.value;
                break;
            case "opacity-value":
                if (this.opacityRef.value < 0 || this.opacityRef.value > 1) {
                    return;
                }
                this.opacity.value = this.opacityRef.value;
                break;
            
        }
        
        this.applyRule();
        this.showRule();
    }

    hexToRgb(hex) {
        return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
            ("0x" + hex[5] + hex[6]) | 0
        }`;
    }
}


// Elementos
const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");

const color = document.querySelector("#color")
const colorRef = document.querySelector("#color-value")
const opacity = document.querySelector("#opacity")
const opacityRef = document.querySelector("#opacity-value")
const inset = document.querySelector("#inset")

const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const boxShadow = new BoxShadowGenerator(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, previewBox, rule, webkitRule, mozRule, color, colorRef, opacity, opacityRef, inset);

boxShadow.initialize();


// Eventos
[horizontal, vertical, blur, spread].forEach((elemento) => {
    elemento.addEventListener("input", (e) => {
        const value = e.target.value;

        boxShadow.updateValue(e.target.id, value);
    });
});

[horizontalRef, verticalRef, blurRef, spreadRef, opacityRef].forEach((elemento) => {
    elemento.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            boxShadow.enterUpdate(e.target.id);
        }
    });
});

color.addEventListener("input", (e) => {
    const value = e.target.value;

    boxShadow.updateValue(e.target.id, value);
});

opacity.addEventListener("input", (e) => {
    const value = e.target.value;

    boxShadow.updateValue(e.target.id, value);
});

inset.addEventListener("input", (e) => {
    const value = e.target.checked;

    boxShadow.updateValue(e.target.id, value);
});


// Copiar regra
const rulesArea = document.querySelector("#rules-area");
const copyInstructions = document.querySelector("#copy-instructions");

rulesArea.addEventListener("click", () => {
    const rules = rulesArea.innerText.replace(/^\s*\n/gm, "");

    navigator.clipboard.writeText(rules).then(() => {
        copyInstructions.innerText = "Copiado com sucesso!";

        setTimeout(() => {
            copyInstructions.innerText = "Clique no quadro acima para copiar as regras";
        }, 1000);
    });
});