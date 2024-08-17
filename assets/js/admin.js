// Setup module
// ------------------------------

const App = function () {

    //
    // Detect OS to apply custom scrollbars
    //

    // Custom scrollbar style is controlled by CSS. This function is needed to keep default
    // scrollbars on MacOS and avoid usage of extra JS libraries
    const detectOS = function () {
        const platform = window.navigator.platform,
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            customScrollbarsClass = 'custom-scrollbars';

        // Add class if OS is windows
        windowsPlatforms.indexOf(platform) != -1 && document.documentElement.classList.add(customScrollbarsClass);
    };


    // Navigations
    // -------------------------

    // Sidebar navigation
    const navigationSidebar = function () {

        // Elements
        const navContainerClass = 'nav-sidebar',
            navItemOpenClass = 'nav-item-open',
            navLinkClass = 'nav-link',
            navLinkDisabledClass = 'disabled',
            navSubmenuContainerClass = 'nav-item-submenu',
            navSubmenuClass = 'nav-group-sub',
            navScrollSpyClass = 'nav-scrollspy',
            sidebarNavElement = document.querySelectorAll(`.${navContainerClass}:not(.${navScrollSpyClass})`);

        // Setup
        sidebarNavElement.forEach(function (nav) {
            nav.querySelectorAll(`.${navSubmenuContainerClass} > .${navLinkClass}:not(.${navLinkDisabledClass})`).forEach(function (link) {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const submenuContainer = link.closest(`.${navSubmenuContainerClass}`);
                    const submenu = link.closest(`.${navSubmenuContainerClass}`).querySelector(`:scope > .${navSubmenuClass}`);

                    // Collapsible
                    if (submenuContainer.classList.contains(navItemOpenClass)) {
                        new bootstrap.Collapse(submenu).hide();
                        submenuContainer.classList.remove(navItemOpenClass);
                    }
                    else {
                        new bootstrap.Collapse(submenu).show();
                        submenuContainer.classList.add(navItemOpenClass);
                    }

                    // Accordion
                    if (link.closest(`.${navContainerClass}`).getAttribute('data-nav-type') == 'accordion') {
                        for (let sibling of link.parentNode.parentNode.children) {
                            if (sibling != link.parentNode && sibling.classList.contains(navItemOpenClass)) {
                                sibling.querySelectorAll(`:scope > .${navSubmenuClass}`).forEach(function (submenu) {
                                    new bootstrap.Collapse(submenu).hide();
                                    sibling.classList.remove(navItemOpenClass);
                                });
                            }
                        }
                    }
                });
            });
        });
    };

    //
    // Return objects assigned to module
    //

    return {
        // Disable transitions before page is fully loaded
        initBeforeLoad: function() {
            detectOS();
        },

        // Initialize all navigations
        initNavigations: function () {
            navigationSidebar();
        },

        // Initialize core
        initCore: function () {
            App.initBeforeLoad();
            App.initNavigations();
        }
    };
}();

// Initialize module
// ------------------------------

// When content is loaded
document.addEventListener('DOMContentLoaded', function () {
    App.initCore();
});