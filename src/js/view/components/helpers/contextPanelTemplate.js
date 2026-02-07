import {version} from "version";
export default (uiText, items=[]) => {
    let index = 1;
    const contextEl = (item) => {
        const id = item.id ?? `context-item-${index}`;
        return (
            `<div id="${id}" class="op-context-item" tabindex="${index++}">` +
              `<span class="op-context-item-text">${item.label}</span>` +
            `</div>`
        );
    };
    return (
        `<div class="op-context-panel animated fadeIn">` +
          `<div id="context-player-about" class="op-context-item" tabindex="1">` +
            `<span class="op-context-item-text">${uiText.context} ${version}</span>` +
          `</div>` +
          items.map(contextEl).join('') +
        `</div>`
    );
};