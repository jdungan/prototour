function(doc) {
    if (doc.recType) {
        if (doc.recType == "Flock") {
            if (doc.created_at){
                emit(doc.created_at,doc);
            }
        }
    }
};
