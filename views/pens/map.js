function(doc) {
    if (doc.recType) {
        if (doc.recType == "Pen") {
            if (doc.Name){
                emit(doc.Name,doc);
            }
        }
    }
};