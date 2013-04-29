function(doc) {
    if (doc.recType) {
        if (doc.recType === "location") {
            if (doc.created_at){
                emit(doc.created_at,doc);
            }
        }
    }
};
