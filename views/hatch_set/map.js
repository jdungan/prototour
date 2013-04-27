function(doc) {




    if (doc.recType) {
        if (doc.recType === "Hatch_detail") {
            if (doc.Stage ==="Set"){
                if (doc.created_at){
                    emit(doc.created_at,doc);
                }
            }
        }
    }
};

