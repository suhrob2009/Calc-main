const numbers = [...document.querySelectorAll('.num')]
const display = document.querySelector('input')
const signs = [...document.querySelectorAll('.sign')]
const clear = document.querySelector('.c')
const remove = document.querySelector('.r')
const dot = document.querySelector('.dot')
const equal = document.querySelector('.equal')


class Calculator {
    display
    signView
    singOperatori
    operators = ['x', '+', '-', '÷']
    get lastValue() {
        return display.value[display.value.length - 1]
    }
    get fristValue() {
        return display.value[0]
    }
    setDisplay(value) {
        display.value = display.value + value
    }

    numbers(event) {
        // console.log(event.target.textContent)

        const num = event.target.textContent.trim()
        if (this.lastValue == 0 && display.value.length == 1) {
            return display.value = num
        }
        if (this.signView && this.lastValue == 0) {
            return display.value = display.value.slice(0, -1) + num
        }
        this.setDisplay(num)

    }

    signs(event) {
        // console.log(event.target.textContent)
        const signView = event.target.textContent.trim()
        const singOperatori = event.target.dataset.sign
        if (this.operators.includes(this.lastValue)) {
            return display.value = display.value.slice(0, -1) + singView
        }
        if (!display.value || this.lastValue == this.signView || this.lastValue == '.') {
            return
        }
        this.signView = signView
        this.singOperatori = singOperatori
        this.setDisplay(event.target.textContent)
    }

    dot() {
        if (!display.value || this.operators.includes(this.lastValue)) {
            display.value = display.value + '0'
        }
        if (!display.value || this.lastValue == '.' || this.operators.includes(this.lastValue)) {
            return
        }
        this.setDisplay('.')
    }

    calculate() {
        const [num1, num2] = display.value.split(this.signView)
        display.value = eval(num1 + this.singOperatori + num2)
    }

    clear() {
        display.value = null

    }

    remove() {
        let deleted = display.value.split('');
        let newValue = display.value.split('').slice(0, -1).join('')
        display.value = newValue
    }

}

const calculator = new Calculator();

for (const number of numbers) {
    // console.log(number)

    number.addEventListener('click', (event) => {
        calculator.numbers(event)
    })
}


for (const sign of signs) {
    // console.log(number)

    sign.addEventListener('click', (event) => {
        calculator.signs(event)
    })
}


dot.addEventListener('click', () => {
    calculator.dot();
})
clear.addEventListener('click', () => {
    calculator.clear()
})
remove.addEventListener('click', () => {
    calculator.remove();
})
equal.addEventListener('click', () => {
    calculator.calculate()
})