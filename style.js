const wrapBtn = document.querySelectorAll(".wrap-btn");
const button = document.querySelectorAll('input[type = "button"]');
let display = document.querySelector('.display-content');
const result = document.querySelector('.calculated');

let contentStr = '';
let calculated = '';
let clickEqual = false;


const handleFocusBtn = (event) => {
    const target = event.currentTarget; // currentTarget luôn là phần tử được gán addEventListener
    target.style.transform = 'scale(.9)';
}

const handleOverBtn = (event) => {
    const target = event.currentTarget;
    target.style.transform = 'scale(1)';
}

if(wrapBtn.length > 0) {
    wrapBtn.forEach((item) => {
        item.addEventListener('mousedown', handleFocusBtn);    
        item.addEventListener('mouseup', handleOverBtn)    
    })
}

const handleCalcClick = (event) => {
    if(event.target.value === "AC"){
        display.value = '';
        result.value = '';
        clickEqual = false;
    }else if(event.target.value === 'DEL'){
        display.value = display.value.slice(0, -1);
        clickEqual = false;
    }else if(event.target.value === '='){
        Object.assign(display.style, {
            height: '40%',
            fontSize: '1.6rem'
        })
        const proccessPercent = contentStr.replace(/%/g, '/100');// sử dụng biểu thức chính quy để tìm tất cả các kí tự % và thay thế bằng /100
        try {
            if(proccessPercent !== ''){
                display.value = proccessPercent;
                result.style.display = 'block';
                calculated = eval(proccessPercent)
                result.value = calculated;
                clickEqual = true;
            }
            
        } catch (error) {
            display.value = ''
        }
        contentStr = '';
    }else{
        
        
        if(clickEqual){
            contentStr = calculated + event.target.value;
            display.value = calculated + event.target.value;
            clickEqual = false;
        }else{
            result.style.display = 'none'
            Object.assign(display.style, {
                height: '100%',
                fontSize: '6rem'
            })
            display.value += event.target.value; 
            contentStr += event.target.value;
        }
    }

}

const handleCalulator = () => {
    if(button.length > 0){
        button.forEach((item) => {
            item.addEventListener('click', handleCalcClick);
        })
    }
}
handleCalulator();


