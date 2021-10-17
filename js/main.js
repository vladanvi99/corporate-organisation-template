

//---------------------------HEADER-FIXED-ELEMENT-START----------------------------------------
let headerFixed = document.querySelector('#header-bottom');
let sticky = headerFixed.offsetTop;
window.addEventListener('scroll', () => {
    if (window.pageYOffset > sticky) {
        headerFixed.classList.add("sticky");
      } else {
        headerFixed.classList.remove("sticky");
      }
})
//---------------------------HEADER-FIXED-ELEMENT-END----------------------------------------
//---------------------PAGINATION - START----------------------
let pngRows = 9;
//---------------------PAGINATION: CREATE PAGINATION NUMBERS - START-----------------
let pngArrowLeftWrap = document.querySelector(".service-section-2-pagination-arrow-left")
let pngArrowRightWrap = document.querySelector(".service-section-2-pagination-arrow-right")
let pngNumbersWrap = document.querySelector(".service-section-2-pagination-numbers")

window.addEventListener('load', () => {
    fetch('service.json')
    .then(resp => resp.json())
    .then(data => {
        if(Math.ceil(data.length / pngRows) > 1){
            let pngArrowLeft = document.createElement('a');
            pngArrowLeft.setAttribute('href',"#service-section-2-text-top")
            pngArrowLeft.innerHTML = '<i class="fas fa-arrow-left"></i>';
            pngArrowLeftWrap.appendChild(pngArrowLeft)

            let pngArrowRight = document.createElement('a');
            pngArrowRight.setAttribute('href',"#service-section-2-text-top")
            pngArrowRight.innerHTML = '<i class="fas fa-arrow-right"></i>';
            pngArrowRightWrap.appendChild(pngArrowRight)

            for(let i = 1; i <= Math.ceil(data.length/pngRows); i++){
                let pngNumber = document.createElement('a');
                pngNumber.classList.add('pngClass')
                if(i >= 1 && i <= 9){
                    pngNumber.innerHTML = `0${i}`;
                }else{
                    pngNumber.innerHTML = i;
                }
                if(i==1){
                    pngNumber.classList.add('active');
                }
                pngNumber.setAttribute("href","#service-section-2-text-top");
                pngNumbersWrap.appendChild(pngNumber);
            }
        }
    })
})
//---------------------PAGINATION: CREATE PAGINATION NUMBERS - END-----------------

//---------------------PAGINATION: IMPORT ELEMENTS FROM JSON - START-----------------
let pngElementsRow = document.querySelector('.service-section-2-cards');


let startPngElement = 0;
let pngStartNumber = 1;
//---------------------PAGINATION: IMPORT ELEMENTS FROM JSON ON LOAD - START-----------------
    function addPngOnLoad(){
    fetch('service.json')
    .then(resp => resp.json())
    .then(data => {
        for(let i = startPngElement; i < pngRows * pngStartNumber; i++){
            if(i==data.length){
                break;
            }else{
                let {img,name,txt} = data[i];
                let pngElementsWrap = document.createElement('div');
                let pngElementsWrapClasses = [ "col-lg-4", "col-sm-6", "d-flex", "justify-content-center"];
                pngElementsWrap.classList.add(...pngElementsWrapClasses);
                let pngElementWrap = document.createElement('div');
                let pngElementWrapClasses = ["service-section-2-card", "mt-3"]
                pngElementWrap.classList.add(...pngElementWrapClasses)
                let pngElementImg = document.createElement('img')
                pngElementImg.setAttribute("src", img);
                pngElementImg.setAttribute('alt','"');
                pngElementWrap.appendChild(pngElementImg);
                let pngElementFirstP = document.createElement('p');
                pngElementFirstP.innerHTML = name;
                pngElementWrap.appendChild(pngElementFirstP);
                let pngElementSecondP = document.createElement('p');
                pngElementSecondP.innerHTML = txt;
                pngElementWrap.appendChild(pngElementSecondP);
                pngElementsWrap.appendChild(pngElementWrap);
                pngElementsRow.appendChild(pngElementsWrap);
            }
        };
        
    })
}
window.addEventListener('load', () => addPngOnLoad())
//---------------------PAGINATION: IMPORT ELEMENTS FROM JSON ON LOAD - END-----------------

//---------------------PAGINATION: UPDATE ELEMENTS FROM JSON ON CLICK - START-----------------
window.addEventListener('click', (e) => {
    if(e.target.className.includes('pngClass')){
        let pngButtons = document.querySelectorAll('.service-section-2-pagination-numbers a');
        pngButtons.forEach(item => {
            item.classList.remove('active')
        })
        e.target.classList.add('active')
        pngElementsRow.innerHTML = "";
        pngStartNumber = Number(e.target.textContent)
        startPngElement = (pngStartNumber - 1) * pngRows;
        addPngOnLoad()
    }
})
//---------------------PAGINATION: UPDATE ELEMENTS FROM JSON ON CLICK - END-----------------

//---------------------PAGINATION: UPDATE ELEMENTS FROM JSON ON CLICK ON LEFT ARROW - START-----------------
window.addEventListener('click', (e) => {
    let pngLeftArrow = document.querySelector('.service-section-2-pagination-arrow-left a i');
    let pngButtons = document.querySelectorAll('.service-section-2-pagination-numbers a');
    let pngFirstButton = [...pngButtons].shift();
    if(e.target == pngLeftArrow && !pngFirstButton.className.includes('active')){
        let pngButton = [...pngButtons].filter(item => item.className.includes("active"))
        pngButtons.forEach(item => {
        item.classList.remove('active')
        })
        pngButton[0].previousElementSibling.classList.add('active')
        pngElementsRow.innerHTML = "";
        pngStartNumber = Number(pngButton[0].innerHTML) - 1;
        startPngElement = (pngStartNumber - 1) * pngRows;
        addPngOnLoad()
    }
})
//---------------------PAGINATION: UPDATE ELEMENTS FROM JSON ON CLICK ON LEFT ARROW - END-----------------

//---------------------PAGINATION: UPDATE ELEMENTS FROM JSON ON CLICK ON RIGHT ARROW - START-----------------
window.addEventListener('click', (e) => {
    let pngRightArrow = document.querySelector('.service-section-2-pagination-arrow-right a i');
    let pngButtons = document.querySelectorAll('.service-section-2-pagination-numbers a');
    let pngLastButton = [...pngButtons].pop();
    if(e.target == pngRightArrow && !pngLastButton.className.includes('active')){
        let pngButton = [...pngButtons].filter(item => item.className.includes("active"))
        pngButtons.forEach(item => {
        item.classList.remove('active')
        })
        pngButton[0].nextElementSibling.classList.add('active')
        pngElementsRow.innerHTML = "";
        pngStartNumber = Number(pngButton[0].innerHTML) + 1;
        startPngElement = (pngStartNumber - 1) * pngRows;
        addPngOnLoad()
    }
})
//---------------------PAGINATION: UPDATE ELEMENTS FROM JSON ON CLICK ON RIGHT ARROW - END-----------------


//---------------------PAGINATION: IMPORT ELEMENTS FROM JSON - END-----------------
//---------------------PAGINATION - END----------------------

//---------------------------CONTACT-ELEMENT-START----------------------------------------
let contactSection2 = document.querySelector('#contact-section-2');
let contactWrap = document.querySelector('#contact-section-2 .container-fluid');
window.addEventListener('resize', () => {
    if(document.body.offsetWidth >= 992){
        contactSection2.style.height = "66.5vw";
    }else if(document.body.offsetWidth < 576){
        contactSection2.style.height = "1300px";
    }
    else{
        contactSection2.style.height = "1400px";
    }
})
window.addEventListener('load', () => {
    if(document.body.offsetWidth >= 992){
        contactSection2.style.height = "66.5vw";
    }else if(document.body.offsetWidth < 576){
        contactSection2.style.height = "1300px";
    }
    else{
        contactSection2.style.height = "1400px";
    }
})
//---------------------------CONTACT-ELEMENT-END----------------------------------------