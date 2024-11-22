const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')

 
const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === 'add') return firstNum + secondNum
    if (operator === 'subtract') return firstNum - secondNum
    if (operator === 'multiply') return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum
}

keys.addEventListener('click', e => {
        if (e.target.matches('button')) {
            const key = e.target
            const action = key.dataset.action
            const keyContent = key.textContent
            const displayContent = display.textContent
            const previousKeyType = calculator.dataset.previousKeyType
            if (!action) {
                console.log('number key')
                if (displayContent === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                    display.textContent = keyContent;
                } else {
                    display.textContent = displayContent + keyContent; 
                }
                calculator.dataset.previousKeyType = 'number'
            }

            if (action === 'add' || 
                action === 'subtract' || 
                action === 'multiply' ||
                action === 'divide'
            ) {
                console.log('operator key')
                Array.from (key.parentNode.children)
            .forEach (k => k.classList.remove('is-depressed'))
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayContent
            if (firstValue && operator && previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate') {
              const calcNum = calculate(firstValue, operator, secondValue)
              display.textContent = calcNum
              calculator.dataset.firstValue = calcNum
            }
            else {
                calculator.dataset.firstValue = displayContent
            }
          
          key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
            }
            
            if (action === 'calculate') {
                let secondValue = displayContent 
                let firstValue = calculator.dataset.firstValue
                const operator = calculator.dataset.operator
                console.log('equal key')
                if (firstValue) {
                    if (previousKeyType === 'calculate') {
                        firstValue = displayContent
                        secondValue = calculator.dataset.modValue
                    }
                    display.textContent = calculate(firstValue, operator, secondValue)
                }
                calculator.dataset.modValue = secondValue

                calculator.dataset.previousKeyType = 'calculate'
            }

            if (action === 'decimal') {
                if (previousKeyType === 'calculate' || previousKeyType === 'operator') {
                    display.textContent = '0.';
                } else if (!displayContent.includes('.')) {
                    display.textContent = displayContent + '.';
                }
                calculator.dataset.previousKeyType = 'decimal'
            }

            if (action !== 'clear') {
                const clearButton = calculator.querySelector('[data-action=clear]')
                clearButton.textContent = 'CE'
            }

            if (action === 'clear') {
                console.log('clear key')
                display.textContent = 0
                key.textContent = 'AC'
                if (key.textContent === 'AC') {
                    calculator.dataset.firstValue = ''
                    calculator.dataset.modValue = ''
                    calculator.dataset.operator = ''
                    calculator.dataset.previousKeyType = ''
                }
                else {
                    key.textContent = 'AC'
                }
                display.textContent = 0
                calculator.dataset.previousKeyType = 'clear'
            }
            
        }
    }
)