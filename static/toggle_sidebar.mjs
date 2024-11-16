var sidebar_active = false;


/**
 * Toggles the sidebar menu, and changes any style properties to any affected elements.
 */
function sidebarToggle() {
    sidebar_active = !sidebar_active;

    if (sidebar_active) {
        setElementAttrs(18, 1, 0, 10, "collapse");
        return;
    }

    setElementAttrs(0, 0, 1, 0, "visible");
}


/**
 * Sets the properties of particular elements that will be affected when toggling the sidebar menu.
 * @param {Number} sidebar_width The % width that the sidebar will take up on the screen.
 * @param {Number} closer_opacity The opacity of the sidebar closer button on this given toggle.
 * @param {Number} opener_opacity The opacity of the sidebar opener button on this given toggle.
 * @param {Number} model_sel_right How much the modelDropdown will move to the right by, (should be the column gap property of the <ul> tag).
 * @param {String} opener_vis Whether the sidebar opener will collapse or be visible.
 */
function setElementAttrs(sidebar_width, closer_opacity, opener_opacity, model_sel_right, opener_vis) {
    document.getElementById("sidebar").setAttribute("style", `width: ${sidebar_width}%;`);
    document.getElementById("sidebar_closer").setAttribute("style", `opacity: ${closer_opacity};`);
    document.getElementById("sidebar_opener").setAttribute("style", `opacity: ${opener_opacity};`);
    document.getElementById("modelSelector").setAttribute("style", `right: ${model_sel_right}px;`);  // move right by the column gap amount
    document.getElementById("sidebar_opener").parentElement.setAttribute("style", `visibility: ${opener_vis};`);  // remove the sidebar opener from the layout if necessary.
}