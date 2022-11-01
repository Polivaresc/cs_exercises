// LINKED LISTS

function node(value = null) {
    return { value: value, next: null}
}

function linkedList() {
    let start = null
    return {
        prepend: function (value) {
            const newNode = node(value)
            newNode.next = start
            start = newNode
        },
        append: function (value) {
            if (start === null) {
                this.prepend(value)
                return
            }
            let tmpNode = start
            while (tmpNode.next !== null) {
                tmpNode = tmpNode.next
            }
            tmpNode.next = node(value)
        },
        size: function () {
            if (start === null) {
                return 0
            }
            let totalNodes = 1
            let tmpNode = start
            while (tmpNode.next !== null) {
                tmpNode = tmpNode.next
                totalNodes++
            }
            return totalNodes
        },
        head: function () {
            return start
        },
        tail: function () {
            let tmpNode = start
            while (tmpNode.next !== null) {
                tmpNode = tmpNode.next
            }
            return tmpNode
        },
        at: function (index) {
            let tmpNode = start
            for (let i = 0; i < index; i++) {
                tmpNode = tmpNode.next
            }
            return tmpNode
        },
        pop: function () {
            let tmpNode = start
            let prevNode
            while (tmpNode.next !== null) {
                prevNode = tmpNode
                tmpNode = tmpNode.next
            }
            prevNode.next = null
        },
        shift: function () {
            start = start ? start.next : null
        },
        contains: function (value) {
            let tmpNode = start
            while (tmpNode.next !== null) {
                if (tmpNode.value === value) {
                    return true
                }
                tmpNode = tmpNode.next
            }
            return tmpNode.value === value;
        },
        find: function (value) {
            let index = 0
            let tmpNode = start
            while (tmpNode.next !== null) {
                if (tmpNode.value === value) {
                    return index
                }
                tmpNode = tmpNode.next
                index++
            }
            return tmpNode.value === value ? index : null
        },
        toString: function () {
            let str = ''
            let tmpNode = start
            while (tmpNode.next !== null) {
                str += '( ' + tmpNode.value + ' ) -> '
                tmpNode = tmpNode.next
            }
            str += '( ' + tmpNode.value + ' ) -> null'
            return str
        },
        insertAt: function (value, index) {
            const len = this.size()
            if (index >= len - 1) {
                return this.append(value)
            } else if (index === 0) {
                return this.prepend(value)
            }
            let tmpNode = start
            let prevNode = start
            for (let i = 0; i < index; i++) {
                prevNode = tmpNode
                tmpNode = tmpNode.next
            }
            const newNode = node(value)
            newNode.next = tmpNode
            prevNode.next = newNode
        },
        removeAt: function (index) {
            const len = this.size()
            if (index >= len - 1) {
                return this.pop()
            } else if (index === 0) {
                return this.shift()
            }
            let tmpNode = start
            let prevNode = start
            for (let i = 0; i < index; i++) {
                prevNode = tmpNode
                tmpNode = tmpNode.next
            }
            prevNode.next = tmpNode ? tmpNode.next : null
        }
    }
}
const linkedLi = linkedList()
linkedLi.prepend(1)
linkedLi.prepend(6)
linkedLi.append(2)
linkedLi.append(3)

// console.log(linkedLi.size())
// console.log(linkedLi.head())
// console.log(linkedLi.tail())
// linkedLi.pop()
// console.log(linkedLi.tail())
// console.log(linkedLi.at(2))
// console.log(linkedLi.contains(5))
// console.log(linkedLi.find(1))
// console.log(linkedLi.toString())
// linkedLi.insertAt('AQUI', 99)
// console.log(linkedLi.tail())
// console.log(linkedLi.toString())
// linkedLi.removeAt(3)
// console.log(linkedLi.toString())
