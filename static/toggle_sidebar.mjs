var sidebar_active = false;


function sidebarToggle() {
    sidebar_active = !sidebar_active;

    document.getElementById("sidebar").setAttribute("style", `width: ${sidebar_active ? 18 : 0}%;`);
    document.getElementById("sidebar_closer").setAttribute("style", `opacity: ${sidebar_active ? 1 : 0};`);
    document.getElementById("sidebar_opener").setAttribute("style", `opacity: ${sidebar_active ? 0 : 1};`);
    document.getElementById("modelSelector").setAttribute("style", `left: ${sidebar_active ? 1 : 5}%;`);
}