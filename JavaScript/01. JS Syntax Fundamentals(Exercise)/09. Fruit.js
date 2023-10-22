function moneyToBuy(fruit, grams, pricePerKilo){
    let kg = grams / 1000
    let price = kg * pricePerKilo
    console.log(`I need $${price.toFixed(2)} to buy ${kg.toFixed(2)} kilograms ${fruit}.`)
}

moneyToBuy('orange', 2500, 1.80)