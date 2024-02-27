window.addEventListener('DOMContentLoaded', e => {
  if (e.target.readyState === 'interactive') {
    initApp();
  }
});

function initApp() {
  /* Clear search input button functionality */
  const searchAppleInput = document.querySelectorAll('.searchBox > input');

  searchAppleInput.forEach(input => {
    input.addEventListener('input', e => {
      const clearButton = input.parentElement.querySelector('.clearSearchApple');
      if (input.value.trim().length) {
        clearButton.classList.remove('d-none');

        /* clear the search input */
        clearButton.addEventListener('click', e => {
          input.value = '';
          clearButton.classList.add('d-none');
        });
      } else {
        clearButton.classList.add('d-none');
      }
    });
  });

  /* add the settings svg toggler function to toggle between the stacked and crossed svg */
  const navbarToggler = document.querySelector('.navbar-toggler');

  navbarToggler.addEventListener('click', e => {
    if (navbarToggler.getAttribute('data-shown') === 'false') {
      navbarToggler.setAttribute('data-shown', 'true');
    } else if (navbarToggler.getAttribute('data-shown') === 'true') {
      navbarToggler.setAttribute('data-shown', 'false')
    }
    
    if (navbarToggler.getAttribute('data-shown') === 'true') {
      navbarToggler.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="close-svg svg-opacity-hover" viewBox="0 0 16 16" fill="rgba(255, 255, 255, 0.8)"><path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"/></svg>
      `;
    } else if (navbarToggler.getAttribute('data-shown') === 'false') {
      navbarToggler.innerHTML = `
      <svg width="18" style="color: rgba(255, 255, 255, 0.8)" stroke="rgba(255, 255, 255, 0.8)" height="18" viewBox="0 0 18 18"><polyline id="globalnav-menutrigger-bread-bottom" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="2 12, 16 12" class="globalnav-menutrigger-bread globalnav-menutrigger-bread-bottom"><animate id="globalnav-anim-menutrigger-bread-bottom-open" attributeName="points" keyTimes="0;0.5;1" dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values=" 2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5"></animate><animate id="globalnav-anim-menutrigger-bread-bottom-close" attributeName="points" keyTimes="0;0.5;1" dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values=" 3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12"></animate></polyline><polyline id="globalnav-menutrigger-bread-top" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="2 5, 16 5" class="globalnav-menutrigger-bread globalnav-menutrigger-bread-top"><animate id="globalnav-anim-menutrigger-bread-top-open" attributeName="points" keyTimes="0;0.5;1" dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values=" 2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15"></animate><animate id="globalnav-anim-menutrigger-bread-top-close" attributeName="points" keyTimes="0;0.5;1" dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values=" 3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5"></animate></polyline></svg>
      `;
    }
  });


    /* Mobile search and bag layout */
    const navLinksMobile = document.querySelectorAll('.nv-link-click-mobile');
    navLinksMobile.forEach(link => {
      link.addEventListener('click', e => {
        link.parentElement.parentElement.querySelectorAll('.main-nav-submenu-mobile').forEach(ln => ln.classList.add('d-none'));
        navbarToggler.classList.add('d-none');

        link.parentElement.querySelector('.main-nav-submenu-mobile').classList.remove('d-none');

        const closeNav = link.parentElement.querySelector('.close-nav-item');

        closeNav.addEventListener('click', e => {
          navbarToggler.classList.remove('d-none');
          link.parentElement.querySelector('.main-nav-submenu-mobile').classList.add('d-none');
        });
      })
    });

  maxWidth768px();
}

function maxWidth768px () {
  const navLinks = document.querySelectorAll('.main-nav .nav-item .nv-link');
  const mainNav = document.querySelector('.main-nav');
  const subMenus =  document.querySelectorAll('.main-nav-submenu');
  const clickableLinks = document.querySelectorAll('.nv-link-click');
  const globalNav = document.querySelector('.global-nav');
  const bodyMain = document.querySelector('header + main');
  
  checkDimension();

  window.addEventListener('resize', checkDimension);

  function checkDimension() {
    if (window.innerWidth > 765) {    
      navLinks.forEach(link => {
        link.addEventListener('mouseenter', e => {
          subMenus.forEach(mn => mn.classList.add('d-none'));
          link.parentElement.querySelector('.main-nav-submenu').classList.remove('d-none');
          globalNav.classList.add('dark-global-header');
          bodyMain.classList.add('focusRemoved');

          mainNav.addEventListener('mouseleave', e => {
            link.parentElement.querySelector('.main-nav-submenu').classList.add('d-none');
            link.parentElement.querySelector('.main-nav-submenu').classList.add('d-none');
            subMenus.forEach(mn => mn.classList.add('d-none'));
            globalNav.classList.remove('dark-global-header');
            bodyMain.classList.remove('focusRemoved');
          });
        });
      });
      
      clickableLinks.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          globalNav.classList.add('dark-global-header');
          subMenus.forEach(mn => mn.classList.add('d-none'));
          clickableLinks.forEach(ln => ln.parentElement.querySelector('.main-nav-submenu').classList.add('d-none'));
          link.parentElement.querySelector('.main-nav-submenu').classList.remove('d-none');
          bodyMain.classList.add('focusRemoved');
        });
      });
    } else {
      navLinks.forEach(link => {
        link.addEventListener('mouseenter', e => {
          subMenus.forEach(mn => mn.classList.add('d-none'));
          link.parentElement.querySelector('.main-nav-submenu').classList.add('d-none');
        });
      });
      
      clickableLinks.forEach(link => {
        link.addEventListener('click', e => {
          globalNav.classList.add('dark-global-header');
          subMenus.forEach(mn => mn.classList.add('d-none'));
          clickableLinks.forEach(ln => ln.parentElement.querySelector('.main-nav-submenu').classList.add('d-none'));
          link.parentElement.querySelector('.main-nav-submenu').classList.remove('d-none');
        });
      });
    }
    
  }
}
