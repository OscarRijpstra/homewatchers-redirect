// window.onload = footer;
// window.addEventListener('resize', footer);
// document.addEventListener('resize', footer);

// function footer(){
//     const navigation = document.getElementsByTagName('header')[0];
//     const main = document.getElementsByTagName('main')[0];
//     const footer = document.getElementsByTagName('footer')[0];
//     if(navigation.clientHeight + main.clientHeight + footer.clientHeight > window.innerHeight) footer.style.position = 'relative';
//     else footer.style.position = 'absolute';
// }

document.getElementById('currentyear').innerText = new Date().getFullYear();