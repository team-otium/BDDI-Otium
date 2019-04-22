class Result{
    constructor (code) {
        this.code = code
        this.questions = {
            q1: {},
            q2: {},
            q3: {},
            q4: {},
            q5: {},
            q6: {},
            q7: {},
            q8: {}
        }
    }

    setResult(question, result){
        this[question] = result
    }

    getResult(question) {
        return this[question]
    }
}