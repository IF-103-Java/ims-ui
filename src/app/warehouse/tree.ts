import {Component, Input, Output, EventEmitter} from 'angular2/core';

export interface ITreeNode {
  id: number;
  name: string;
  children: Array<ITreeNode>;
}

@Component({
  selector: "tree-view",
  templateUrl: "/app/components/treeview/treeview.html",
  directives: [TreeViewComponent]
})
export class TreeViewComponent {

  @Input() Nodes: Array<ITreeNode>;
  @Input() SelectedNode: ITreeNode;

  @Output() onSelectedChanged: EventEmitter<ITreeNode> = new EventEmitter();
  @Output() onRequestNodes: EventEmitter<ITreeNode> = new EventEmitter();

  constructor() { }

  onSelectNode(node: ITreeNode) {
    this.onSelectedChanged.emit(node);
  }

  onExpand(li: HTMLLIElement, node: ITreeNode) {
    if (this.isExpanden(li)) {
      li.classList.remove('expanded');
    }
    else {
      li.classList.add('expanded');

      if (node.children.length == 0) {
        this.onRequest(node);
      }
    }
  }

  onRequest(parent: ITreeNode) {
    this.onRequestNodes.emit(parent);
  }

  isExpanden(li: HTMLLIElement) {
    return li.classList.contains('expanded');
  }
}
