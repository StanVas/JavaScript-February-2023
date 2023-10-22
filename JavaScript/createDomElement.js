// Example
function createElement( type, content, parentNode, id, classes, attributes ) {
    const htmlElement = document.createElement(type);

    if (content && type !== 'input') {
        htmlElement.textContent = content;
    };

    if (content && type === 'input') {
        htmlElement.value = content;
    };

    if (parentNode) {
        parentNode.appendChild(htmlElement);
    };

    if (id) {
        htmlElement.id = id;
    };

    // ['list', 'item'] => Arr
    if (classes) {
        htmlElement.classList.add(...classes);
    };

    // {src: 'link to image', href: 'link to site', type: 'checkbox' ...} => Obj
    if (attributes) {
        for (const key in attributes) {
            htmlElement.setAttribute(key, attributes[key]);
        };
    };

    return htmlElement;
}
