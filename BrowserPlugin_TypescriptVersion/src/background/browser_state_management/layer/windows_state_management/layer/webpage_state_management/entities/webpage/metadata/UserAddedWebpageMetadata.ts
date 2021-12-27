export default interface UserAddedWebpageMetadata {
    tags?: Set<number>

    bookmarks?: Set<number>
}

export function createUserAddedWebpageMetadata(
    tags?: Set<number>,
    bookmarks?: Set<number>
){
    return {
        tags,
        bookmarks
    }
}