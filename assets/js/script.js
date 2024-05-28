

document.addEventListener("DOMContentLoaded", function () {

    const headers = document.querySelector("header");
    function handleScroll() {
        if (window.scrollY > 0) {
            headers.classList.add("sticky-header");
        } else {
            headers.classList.remove("sticky-header");
        }
    }

    window.addEventListener("scroll", handleScroll);




    // mobile menu code ============ start =====>
    let searchIcon = document.querySelector(".mob-search-btn");
    let searchForm = document.querySelector(".search-form");
    let svg1 =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    let svg2 =
        '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
    let isSvg1 = true;
    searchIcon.addEventListener("click", function () {
        searchIcon.innerHTML = isSvg1 ? svg2 : svg1;
        isSvg1 = !isSvg1;

        searchForm.classList.toggle("search-bar-show");
    });

    const toggleslideBtn = document.querySelector(".toggle-slide-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    const headerUl = document.querySelector("header ul");

    function toggleButtons(cancelBtn, headerUl) {
        headerUl.classList.toggle("show-ul");
        cancelBtn.style.display = cancelBtn.style.display === "block" ? "none" : "block";
    }

    toggleslideBtn.addEventListener("click", function () {
        toggleButtons(cancelBtn, headerUl);
    });

    cancelBtn.addEventListener("click", function () {
        toggleButtons(cancelBtn, headerUl);
    });



    // mobile Dropdown  ============ start =====>
    const navDropdowns = document.querySelectorAll(".dropdown");
    navDropdowns.forEach((parentDropdown) => {

        parentDropdown.addEventListener("click", function (e) {
            this.classList.toggle("showMenu");
        });

        const subDropdowns = parentDropdown.querySelectorAll(".dropdown ul");
        subDropdowns.forEach((subDropdown) => {
            subDropdown.addEventListener("click", function (event) {
                event.stopPropagation(); // Prevents the click event from reaching the parent dropdown
            });
        });

    });

    // Add a click event listener to the document to close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
        navDropdowns.forEach((dropdown) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("showMenu");
            }
        });
    });



    // Scroll to top   ============ start =====>
    let mybutton = document.getElementById("myBtn");
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    mybutton.addEventListener("click", topFunction);




    // Table Of Content   ============ start =====>
    const tableHeader = document.querySelector(".toc-header");
    const tableCrossBtn = document.querySelector(".arrow");
    const tableOfcontentBody = document.querySelector(".tableofcontent .toc-body");
    // Function to check if it's a mobile device
    function isMobileDevice() {
        return window.innerWidth <= 768; // Adjust the width as needed
    }
    // Function to hide table of content on mobile devices
    function hideTableOfContentOnMobile() {
        if (isMobileDevice()) {
            tableOfcontentBody.classList.add("hidden");
        }
    }
    // Initial check to hide on page load if it's a mobile device
    if (tableHeader) {
        hideTableOfContentOnMobile();
        tableHeader.addEventListener("click", function () {
            if (tableOfcontentBody.classList.contains("hidden")) {
                tableOfcontentBody.classList.remove("hidden");
                tableCrossBtn.style.transform = "rotate(0deg)";
            } else {
                tableOfcontentBody.classList.add("hidden");
                tableCrossBtn.style.transform = "rotate(270deg)";
            }
        });
    }
    // Check on window resize to adjust visibility
    window.addEventListener("resize", hideTableOfContentOnMobile);

    const tableOfContentItems = document.querySelectorAll(".tableofcontent ul li a");
    tableOfContentItems.forEach((link) => {
        link.addEventListener("click", scrollToSection);
    });

    function scrollToSection(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = targetElement.offsetTop - 100;
            const top = offset > 0 ? offset : 0;
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        }
    }
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const targetId = entry.target.getAttribute("id");
                const link = document.querySelector(`.tableofcontent ul li a[href="#${targetId}"]`);
                if (entry.isIntersecting) {
                    link?.parentElement.classList.add("active");
                } else {
                    link?.parentElement.classList.remove("active");
                }
            });
        },
        {
            threshold: 0.5,
        }
    );
    document.querySelectorAll("h2, h3, h4, h5, h6").forEach((element) => {
        observer.observe(element);
    });




    // accordion code  ============ start =====>
    const detailsElements = document.querySelectorAll("details");
    const summaryElements = document.querySelectorAll("summary");
    summaryElements.forEach((summary, index) => {
        summary.addEventListener("click", () => {
            // Close other open details elements and remove 'active' class
            detailsElements.forEach((details, i) => {
                if (i !== index) {
                    details.open = false;
                }
            });
        });
    });



});




