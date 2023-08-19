class ENTITY_NAME {
    private fakeProperty?: string

    get fakeproperty () : string | undefined {
        return this.fakeProperty;
    }
    
    set fakeproperty (property: string) {
        this.fakeProperty = property
    }
}