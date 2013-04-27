function(doc) {
    if (doc.recType) {
        if (doc.recType === "Hatch_detail") {
            if (doc.Stage !=="Set"){
                if (doc.created_at){
                    emit(doc.Hatch,doc);
                }
            }
        }
    }
};


// {
//    "_id": "509f3eda419c35f8b0cd57f8ae1149f5",
//    "_rev": "1-6472ac61cdcd7209392dc9df8d2117cd",
//    "recType": "Hatch_detail",
//    "Stage": "Set",
//    "Hatch": "1",
//    "Pen": "Big House",
//    "Count": "99",
//    "Comment": "",
//    "created_at": "2013-03-11T03:39:29.743Z"
// }