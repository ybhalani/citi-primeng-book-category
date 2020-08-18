export class CommonUtil {

  /**
    * Function: transformToTree()
    *
    * @description flat data convert to compatible with primeng tree.
    * @param data flat data.
    * @param childKey unique key per record
    * @param parentKey parent key for record
    * @param parent parent item
    * @returns unflattern data compatible with primeng tree.
    */
  static transformToTree(data, childKey: string, parentKey: string, parent = undefined) {
    parent = typeof parent !== 'undefined' ? parent : { [childKey]: 0 };
    const children = data.filter(child => child[parentKey] === parent[childKey]);
    children.forEach(item => {
      item.label = item.categoryName;
      item.data = item;
      item.expandedIcon = 'fa fa-folder-open';
      item.collapsedIcon = 'fa fa-folder';
      item.expanded = true;
      item.children = this.transformToTree(data, childKey, parentKey, item);
    });
    return children;
  }
}