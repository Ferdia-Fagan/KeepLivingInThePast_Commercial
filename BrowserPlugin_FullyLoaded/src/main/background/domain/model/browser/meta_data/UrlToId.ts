class UrlToId {

    urlIdCurrentIndex = 0
    urlToId: Map<string, number> = new Map()

    setAndGetIndex(url: string): number {
        this.urlToId.set(url, this.urlIdCurrentIndex)
        return this.urlIdCurrentIndex++
    }

    get(url: string) {
        return this.urlToId.get(url)
    }

    has(url: string) {
        return this.urlToId.has(url)
    }


}

export type UrlToIdT = UrlToId
const urlToIdInst = new UrlToId()

export const urlToIdDependency = (): UrlToIdT => urlToIdInst
