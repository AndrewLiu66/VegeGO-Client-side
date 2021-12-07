import Vuex from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocaCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  // 用JSON parse最好用try,catch因为如果把cartList在local Storage中删除，
  // 这里直接调用JSON.parse就会报错
  try
  {
    return JSON.parse(localStorage.cartList);
  } catch (e)
  {
    return {}
  }
}

export default Vuex.createStore({
  state: {
    cartList: getLocaCartList()
  },
  mutations: {
    // payload stores all the parameter passed into mutation methods
    changeCartItemInfo(state, payload) {
      console.log("check payload", payload)
      const { shopId, productId, productInfo } = payload
      // get all items users add to cart for the shop
      let shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }

      let product = shopInfo.productList[productId]
      // if cart doesn't have this item, add it
      if (!product)
      {
        productInfo.count = 0
        product = productInfo
      }

      product.count = product.count + payload.num
      if (payload.num > 0) { product.check = true }
      if (product.count < 0) { product.count = 0 }

      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      console.log("check cartList", state)
      setLocalCartList(state)
    },

    changeShopName(state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts(state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemsChecked(state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products)
      {
        for (let key in products)
        {
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    // 提交购物车后清空购物车
    clearCartData(state, shopId) {
      state.cartList[shopId].productList = {}
    }
  }
})
