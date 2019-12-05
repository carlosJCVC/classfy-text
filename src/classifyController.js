import BrainJSClassifier from 'natural-brain'
import natural from 'natural';

//var classifier = new BrainJSClassifier();

var classifier = new natural.BayesClassifier();

const train = (request, response) => {
    let { name, description } = request.body

    if (!description || /^\s*$/.test(description)) {
        response.status(400).json({'error' : "OK"})        
    }
    classifier.addDocument(description, name)

    console.log("name => ",  name, "desc => ",  description)
    
    classifier.train()
    classifier.save('test/brain_classifier.json', function () {});

    response.status(200).json({'trained' : "OK"})
}

const ClassifyAreas = (request, response) => {
    let { content } = request.body
    
    let classifications = classifier.getClassifications(content);
    
    if (classifications.length == 0) {
        response.status(204).json({'trained' : "NOT TRAINED"})        
    }

    let category =  classifyText(content)

    response.status(200).json(category)
}

const ClassifyAreasTest = (request, response) => {
 
 BrainJSClassifier.load('brain_classifier.json', function (err, classifier) {})
    //classifier.addDocument("Mostrar nuestro sentimiento a una persona , llevarle serenatas es romance", "Amor")
    //classifier.addDocument("Tu eres mi alma genemela por eso te quiero", "Amor")
    classifier.addDocument("Tu eres el amor de mi vida", "Amor")
    classifier.addDocument("El futbol es uno de los deportes mas practicados del mundo", "Deportes")
    classifier.addDocument("La economia es la ciencia que estudia los recursos, la creación de riqueza y la producción, distribución y consumo de bienes y servicios, para satisfacer las necesidades humanas", "Economia")
    classifier.addDocument("Los filosofos hacen que nuestro cebrero se confunda", "Filosofia")
    classifier.train()

    let text = "messi es el mejor jugador , tiene una velocidad impresionante y un regate espectacular."
    let text2 = "todos lo pobres sufren por la falta de dinero."
    let text3 = "Aristoteles fue un pensador que colaboro con frases locas."
    let text4 = "Federer es un buen tenista."

    //classifier.save('brain_classifier.json', function (err, classifier) {});
    let category =  classifyText(text)
    let category2 =  classifyText(text2)
    let category3 =  classifyText(text3)
    let category4 =  classifyText(text4)

    response.status(200).json([{text: category, text2: category2, text3: category3, text4: category4}])
}

const classifyText = (text) => {
    let res = classifier.classify(text)
    console.log('salida', res)

    return res;
}



module.exports = {
    ClassifyAreas,
    train,
    ClassifyAreasTest
}