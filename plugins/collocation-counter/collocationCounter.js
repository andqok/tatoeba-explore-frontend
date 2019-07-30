const collocationCounter = {
    render: function (i) {
        var wordFreq = {}
        var y = { 2: {}, 3: {}, 4: {} }
        const words = this.wordArray(i)
        words.map(word => {
            return word.toLowerCase()
        }).forEach(word => {
            this.addWord(wordFreq, word)
        })
        this.reverse(wordFreq)

        for (let index = 0; index < words.length; index += 1) {
            this.recourse(words.slice(index, index + 4), y, 4)
        }
        console.log(this.reverse(y['3']))
    },
    wordArray: function (str) {
        return str.match(/\S+/g).map(word => {
            return this.clearPunctuation(word)
        }).filter(word => {
            if (word !== '') return word
        })
    },
    addWord: function (wordFreq, word) {
        if (!wordFreq.hasOwnProperty(word)) {
            wordFreq[word]  = 1 } else {
            wordFreq[word] += 1
        }
    },
    reverse: function (wordFreq) {
        var reversed = {}
        for (let word in wordFreq) {
            let freq = wordFreq[word]
            if (reversed[freq]) {
                reversed[freq].push(word) } else {
                reversed[freq] = [word]
            }
        }
        return reversed
    },
    recourse: function (sequence, y, level) {
        if (level === 1) return false
        let key = sequence.join(' ')
        if (y[level][key]) {
            y[level][key] += 1 } else {
            y[level][key]  = 1
        }
        return this.recourse(sequence.slice(0, sequence.length - 1), y, level - 1)
    },
    clearPunctuation: function(word) {
        if (typeof word === 'string') {
            word = word.replace(/[\n,.?!:;()¿¡"«»\\%—–…]/g, "")
            word = word.replace(/\`/g, "\'") // kinda special case
            return word
        }
    }
}