class ENTITY_NAME_REPLACE {
    static dataModel () {
        return 'dataModelExample'
    }

    dataModel () {
        return ENTITY_NAME_REPLACE.dataModel()
    }
}