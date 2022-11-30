function createId(tagList: Tag[]) {
    let id = tagList[tagList.length - 1].id;
    id++;
    return id;
}
export default createId;