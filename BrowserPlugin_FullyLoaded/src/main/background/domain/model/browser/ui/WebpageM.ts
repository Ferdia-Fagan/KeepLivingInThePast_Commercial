
export interface WebpageMData {
    id: Number
    title: String
    url: String
}

export class WebpageM implements WebpageMData{

    // id: Number
    // title: String
    // url: String

    constructor(
        public id: Number,
        public url: String,
        public title: String = ""
    ) {
        // this.id = id
        // this.url = url
        // this.title = title
    }

    toString(): String {
        return `{
            id: ${this.id},\n
            url: ${this.url}\n
        }`
    }

}




