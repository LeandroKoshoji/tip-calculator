const billInput = document.querySelector('[data-js="bill_input"]')
const tipsButtons = document.querySelector('[data-js="tips_buttons"]')
const customPercentageInput = document.querySelector('[data-js="custom_percentage"]')
const peopleInput = document.querySelector('[data-js="people_input"]')
const tipAmountContainer = document.querySelector('[data-js="tip_amount"]')
const totalAmountContainer = document.querySelector('[data-js="total_amount"]')
const resetButton = document.querySelector('[data-js="reset_button"]')

const percentageButtons = Array.from(tipsButtons.children).filter(item => item.nodeName === 'INPUT')

const calculateTip = percentage => {
  const billAmount = Number(billInput.value)
  const peopleAmount = Number(peopleInput.value)

  const tipAmount = (((billAmount * percentage) / peopleAmount)).toFixed(2)
  const totalAmount = ((billAmount + billAmount * percentage) / peopleAmount).toFixed(2)

  return [tipAmount, totalAmount]
}

const insertDataIntoDom = ([tipAmount, totalAmount]) => {
    tipAmountContainer.textContent = tipAmount
    totalAmountContainer.textContent = totalAmount
}

const listenToBillAndPeopleInputs = percentage => {
    billInput.addEventListener('input', () => {
        insertDataIntoDom(calculateTip(percentage))
    })
    peopleInput.addEventListener('input', () => {
        insertDataIntoDom(calculateTip(percentage))
    })
}

const uncheckRadio = ()=> {
    percentageButtons.forEach(input => {
        input.checked = false
      })
}

const resetDOM = ()=> {
    billInput.parentElement.style.border = 'none'
    billInput.value = ''
    customPercentageInput.value = ''
    peopleInput.value = '1'
    tipAmountContainer.textContent = '0'
    totalAmountContainer.textContent = '0'
  
    uncheckRadio()
}

percentageButtons.forEach(input => {
    input.addEventListener('click', () => {
        const isChecked = input.checked
        const billContainer = billInput.parentElement

        if (billInput.value === '') {
            billContainer.style.border = '1px solid #ff0000'
            uncheckRadio()
            return
        }

        // if(peopleInput.value <= 0) {
        //     peopleInput.style.border = '1px solid #ff0000'
        //     uncheckRadio()
        //     return
        // }

        if (isChecked) {
        const percentage = Number(input.value) / 100

        customPercentageInput.value = ''
        billContainer.style.border = '1px solid #00ff00'

        insertDataIntoDom(calculateTip(percentage))

        listenToBillAndPeopleInputs(percentage)
        }
    })
})

customPercentageInput.addEventListener('input', e => {
  const percentage = e.target.valueAsNumber / 100

  if (customPercentageInput.value) {
    uncheckRadio()
  }

  insertDataIntoDom(calculateTip(percentage))
  listenToBillAndPeopleInputs(percentage)
})
peopleInput.addEventListener('input', e => {
    

})
resetButton.addEventListener('click', resetDOM)
