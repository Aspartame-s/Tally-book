export const commonYear  = 2022

export const autoFill = (month) => {
  return  month < 10 ? '0' + month : month
}

export const range = (size, startAt) => {
    var arr = []
    for(let i = 0; i < size; i++) {
        arr[i] = startAt + i
    }
    return arr
}

export const judgeActive = (active, date) => {
    return (active === date) ? "dropdown-item active" : "dropdown-item"
}

export const parseYearAndMonth = (str) => {
    const date = str ? new Date(str) : new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1
    }
}

//数据接口扁平化
export const flattenArr = (arr) => {
    return arr.reduce((map, item) => {
        map[item.id] = item
        return map
    }, {})
}

export const ID = () => {
    return '_' + Math.random().toString(36).substr(2,9)
}

//改造piechart所需要的数据结构算法
export const getPieChartData = (data, type) => {
    var pieChartData = {}
    data.filter(res => res.category.type === type).forEach(item => {
        if(pieChartData[item.cid]) {
            //当前的pieChartData不为空
            pieChartData[item.cid].value += item.price
            pieChartData[item.cid].items.push(item.id)
        }else {
            // 如果pieChartData为obj类型不用做去重，可通过id作为对象的key值
            pieChartData[item.cid] = {
                name: item.category.category,
                value: item.price * 1,
                items: [item.id]
            }
        }
    })
    pieChartData = Object.keys(pieChartData).map(id => {
        return pieChartData[id]
    })
    return pieChartData
}

export const Colors = {
    blue: '#347eff',
    deepBlue: '#61dafb',
    green: '#28a745',
    red: '#dc3545',
    gray: '#555',
    lightGray: '#efefef',
    white: '#fff',
  }