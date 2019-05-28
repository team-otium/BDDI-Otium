class Result{
    constructor (code) {
        this.code = code
        this.questions = {
            q1: {
                rep: 2
            },
            q2: {
                rep: 2
            },
            q3: {
                amp: 15,
                freq: 60
            },
            q4: {
                rep1: 0,
                rep2: 0
            },
            q5: {
                rep: 1
            },
            q6: {
                rep: 2
            },
            q7: {
                rep: 0
            },
            q8: {
                rep: 0
            }
        }
    }

    setResult(question, result){
        this[question] = result
    }

    getResult(question) {
        return this[question]
    }
}