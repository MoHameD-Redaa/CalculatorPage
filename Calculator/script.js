class Calculator {
    constructor(Previous_Operand, Current_Operand) {
        this.Previous_Operand = Previous_Operand
        this.Current_Operand = Current_Operand
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

  

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calc()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calc() {
        let answer
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                answer = prev + current
                break
            case '-':
                answer = prev - current
                break
            case '*':
                answer = prev * current
                break
            case '/':
                answer = prev / current
                break
            default:
                return
        }
        this.currentOperand = answer
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.Current_Operand.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.Previous_Operand.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.Previous_Operand.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearAllButton = document.querySelector('[data-all-clear]')
const Previous_Operand = document.querySelector('[data-previous-operand]')
const Current_Operand = document.querySelector('[data-current-operand]')

const calculator = new Calculator(Previous_Operand, Current_Operand)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.calc()
    calculator.updateDisplay()
})

clearAllButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

