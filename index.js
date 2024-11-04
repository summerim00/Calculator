document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("inputField"); // 계산기 입력 필드
    const historyList = document.getElementById("historyList"); // 계산 기록 리스트
    let newInput = false; // 새로운 입력 여부를 확인하기 위한 변수

    function setInputValue(newValue) {
        inputField.value = newValue;
        newInput = false;
    }

    function appendNumber(number) {
        // 숫자 버튼 클릭 시 입력 필드에 추가
        if (newInput) {
            setInputValue(number);
        } else {
            setInputValue(inputField.value + number);
        }
        newInput = false;
    }

    function appendOperator(operator) {
        // 연산자 버튼 클릭 시 입력 필드에 추가
        if (newInput) {
            newInput = false;
        }
        setInputValue(inputField.value + ` ${operator} `);
    }

    function appendDecimal() {
        // 소수점 버튼 클릭 시 입력 필드에 추가
        if (newInput) {
            setInputValue("0.");
        } else {
            setInputValue(inputField.value + '.');
        }
        newInput = false;
    }

    function clearAll() {
        // 모든 입력 초기화
        setInputValue("");
    }

    function deleteLast() {
        // 마지막 입력 삭제
        setInputValue(inputField.value.slice(0, -1));
    }

    function toggleSign() {
        // 입력 값의 부호 변경
        if (inputField.value.startsWith('-')) {
            setInputValue(inputField.value.substring(1));
        } else {
            setInputValue('-' + inputField.value);
        }
    }

    function calculate() {
        // 입력된 식 계산
        try {
            let result = eval(inputField.value.replace(/mod/g, '%').replace(/\^/g, '**'));
            if (!isFinite(result)) {
                throw new Error("Cannot divide by zero");
            }
            addHistory(`${inputField.value} = ${result}`);
            animateResultChange(result);
            newInput = true;
        } catch (error) {
            alert(error.message);
            setInputValue("");
        }
    }

    function addHistory(entry) {
        // 계산 기록 추가
        const listItem = document.createElement("li");
        listItem.classList.add("history-item");
        listItem.textContent = entry;
        historyList.appendChild(listItem);
    }

    function clearHistory() {
        // 계산 기록 모두 삭제
        historyList.innerHTML = "";
    }

    function calculateTrigFunction(func) {
        // 삼각 함수 계산
        try {
            const value = parseFloat(inputField.value);
            if (isNaN(value)) {
                throw new Error("Invalid input for trigonometric function");
            }
            let result;
            switch (func) {
                case 'sin':
                    result = Math.sin(value);
                    break;
                case 'cos':
                    result = Math.cos(value);
                    break;
                case 'tan':
                    result = Math.tan(value);
                    break;
            }
            addHistory(`${func}(${value}) = ${result}`);
            animateResultChange(result);
            newInput = true;
        } catch (error) {
            alert(error.message);
            setInputValue("");
        }
    }

    function calculateHyperbolicFunction(func) {
        // 쌍곡선 함수 계산
        try {
            const value = parseFloat(inputField.value);
            if (isNaN(value)) {
                throw new Error("Invalid input for hyperbolic function");
            }
            let result;
            switch (func) {
                case 'sinh':
                    result = Math.sinh(value);
                    break;
                case 'cosh':
                    result = Math.cosh(value);
                    break;
                case 'tanh':
                    result = Math.tanh(value);
                    break;
            }
            addHistory(`${func}(${value}) = ${result}`);
            animateResultChange(result);
            newInput = true;
        } catch (error) {
            alert(error.message);
            setInputValue("");
        }
    }

    function calculateSquareRoot() {
        // 제곱근 계산
        try {
            const value = parseFloat(inputField.value);
            if (value < 0) {
                throw new Error("Cannot calculate square root of a negative number");
            }
            let result = Math.sqrt(value);
            addHistory(`√(${value}) = ${result}`);
            animateResultChange(result);
            newInput = true;
        } catch (error) {
            alert(error.message);
            setInputValue("");
        }
    }

    function calculateFactorial() {
        // 팩토리얼 계산
        try {
            let value = parseInt(inputField.value);
            if (isNaN(value) || value < 0) {
                throw new Error("Invalid input for factorial");
            }
            let result = 1;
            for (let i = 2; i <= value; i++) {
                result *= i;
            }
            addHistory(`${value}! = ${result}`);
            animateResultChange(result);
            newInput = true;
        } catch (error) {
            alert(error.message);
            setInputValue("");
        }
    }

    function animateResultChange(newValue) {
        // 결과 변경 시 애니메이션
        inputField.classList.add("fade-out");
        setTimeout(() => {
            inputField.value = newValue;
            inputField.classList.remove("fade-out");
            inputField.classList.add("fade-in");
        }, 200);
        setTimeout(() => {
            inputField.classList.remove("fade-in");
        }, 400);
    }

    function handleKeyboardInput(event) {
        // 키보드 입력 처리
        const key = event.key;
        if (!isNaN(key)) {
            appendNumber(key);
        } else if (key === '+') {
            appendOperator('+');
        } else if (key === '-') {
            appendOperator('-');
        } else if (key === '*') {
            appendOperator('*');
        } else if (key === '/') {
            appendOperator('/');
        } else if (key === '.') {
            appendDecimal();
        } else if (key === 'Enter') {
            event.preventDefault(); // 기본 동작 방지
            if (!newInput) {
                calculate();
            }
        } else if (key === 'Backspace') {
            deleteLast();
        } else if (key === 'Escape') {
            clearAll();
        }
    }

    window.appendNumber = appendNumber;
    window.appendOperator = appendOperator;
    window.appendDecimal = appendDecimal;
    window.clearAll = clearAll;
    window.deleteLast = deleteLast;
    window.toggleSign = toggleSign;
    window.calculate = calculate;
    window.calculateTrigFunction = calculateTrigFunction;
    window.calculateHyperbolicFunction = calculateHyperbolicFunction;
    window.calculateSquareRoot = calculateSquareRoot;
    window.calculateFactorial = calculateFactorial;
    window.clearHistory = clearHistory;

    document.addEventListener('keydown', handleKeyboardInput);
});

/* CSS Animations */
const style = document.createElement('style');
style.innerHTML = `
    body {
        background-color: #F8E0DC; /* 배경색 */
    }
    #inputField {
        background-color: transparent; /* 입력창 투명 */
        border: none;
        color: #647979; /* 입력 텍스트 색 */
    }
    .fade-out {
        opacity: 0;
        transition: opacity 0.2s ease-out;
    }
    .fade-in {
        opacity: 1;
        transition: opacity 0.2s ease-in;
    }
    button {
        background-color: #a4c9e5; /* 버튼 색 */
        color: #003366; /* 터치 시 버튼 색 */
        border: none;
        padding: 10px;
        font-size: 16px;
        margin: 5px;
        border-radius: 8px;
        transition: background-color 0.3s ease;
    }
    button.operator, button.trig, button.hyperbolic, button.misc {
        background-color: #800080; /* 보라색 */
        color: #FFFFFF; /* 흰색 글자 */
    }

    button:hover {
        background-color: #8fbcd4; /* Slightly darker shade on hover */
    }
`;
document.head.appendChild(style);
