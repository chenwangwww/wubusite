function showLangs() {
  document.getElementById('langDropMenu').style.display =
    document.getElementById('langDropMenu').style.display === 'none'
      ? 'block'
      : 'none'
}

function choiceEnglish() {
  document.getElementById('langDropMenu').style.display = 'none'
}


function showMenu() {
  let menu = document.getElementById('mobileMenu')
  if (menu) {
    if (menu.style.display === 'none') {
      menu.style.display = 'block'
      document.getElementById('logo').style.display = 'none'
      document.getElementById('login').style.display = 'block'
    } else {
      menu.style.display = 'none'
      document.getElementById('logo').style.display = 'block'
      document.getElementById('login').style.display = 'none'
    }
  }
}

function showMobileLangs() {
  let langs = document.getElementById('mobileLangs')
  if (langs) {
    langs.style.display = langs.style.display === 'none' ? 'block' : 'none'
  }
}

function hideMobileLangs() {
  document.getElementById('mobileLangs').style.display = 'none'
}