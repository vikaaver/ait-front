// объявление переменных с элементами

const formItems = document.querySelector("#formItems")
const contentContainer = document.querySelector("#contentContainer")
const productList = document.querySelector("#productList")
const loader = document.querySelector("#loader")

// вешаем слушатель событий на форму

formItems.addEventListener("submit", (e) => {
  // предотвращаем перезагрузку по умолчанию
  e.preventDefault()
  //   while (productList.firstChild) {
  //     productList.removeChild(productList.firstChild)
  //   }
  // спрятали контейнер, если он не спрятан
  contentContainer.style.display = "none"
  // очистили контейнер
  productList.innerHTML = ""
  // положили в переменную пользовательское значение из input
  const amount = e.target["form-amount"].value
  //   e.target["form-amount"].value = ""
  // очистили форму
  formItems.reset()
  // включили лоадер
  loader.style.display = "inline-block"

  // кидаем фетч с динамическими данными из формы
  fetch(`https://fakestoreapi.com/products?limit=${amount}`)
    .then((response) => response.json())
    .then((data) => {
      // убрали loader
      loader.style.display = "none"
      // показали div контейнер
      contentContainer.style.display = "block"
      data.map((el) => {
        // действия ниже совершаются столько раз, сколько элементов будет в массиве
        // в виде el мы представляем один элемент массива
        // на каждом этапе прохождения по элементу вместо el будут разные данные
        // (сначала из первого элемента, второго ... итд) до последнего элемента
        const newItem = document.createElement("li")
        newItem.textContent = el.title
        productList.append(newItem)

        // const newImage = document.createElement("img")
        // newImage.src = el.image
        // newImage.width = "200"
        // productList.append(newImage)
      })
    })
})
