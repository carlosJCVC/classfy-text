import BrainJSClassifier from 'natural-brain'
import natural from 'natural';

let classifier = new natural.BayesClassifier();

const train = (request, response) => {
    let { name, description } = request.body

    classifier.addDocument(description, name)

    console.log("name => ",  name, "desc => ",  description)
    
    classifier.train()
    //classifier.save('./test/brain_classifier.json', function () {});

    response.status(200).json([{'trained' : "OK"}])
}

const ClassifyAreas = (request, response) => {
    let { content } = request.body
    
    let category =  classifyText(content)

    response.status(200).json(category)
}

const classifyText = (text) => {
    let res = classifier.classify(text)
    console.log('salida', res)

    return res;
}



module.exports = {
    ClassifyAreas,
    train,
}