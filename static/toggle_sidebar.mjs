var sidebar_active = false;


function sidebarToggle() {
    document.getElementById("sidebar").setAttribute("style", `width: ${sidebar_active ? 0 : 18}%;`);
    sidebar_active = !sidebar_active;
}