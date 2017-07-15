/*
	@license Angular Treeview version 0.1.6
	ⓒ 2013 AHN JAE-HA http://github.com/eu81273/angular.treeview
	License: MIT


	[TREE attribute]
	angular-treeview: the treeview directive
	tree-id : each tree's unique id.
	tree-model : the tree model on $scope.
	node-id : each node's id
	node-label : each node's label
	node-children: each node's children

	<div
		data-angular-treeview="true"
		data-tree-id="tree"
		data-tree-model="roleList"
		data-node-id="roleId"
		data-node-label="roleName"
		data-node-children="children" >
	</div>
*/

(function(angular) {
    'use strict';

    angular.module('angularTreeview', []).directive('treeModel', ['$compile', function($compile) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                //tree id
                var treeId = attrs.treeId;
                //tree model
                var treeModel = attrs.treeModel;

                //node id
                var nodeId = attrs.nodeId || 'id';

                //node label
                var nodeLabel = attrs.nodeLabel || 'label';

                //children
                var nodeChildren = attrs.nodeChildren || 'children';

                //tree template
                var template =
                    '<ul>' +
                    '<li data-ng-repeat="node in ' + treeModel + '">' +
                    '<i class="fa fa-caret-right" data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
                    '<i class="fa fa-caret-down" data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
                    '<i data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
                    '<span>{{node.' + nodeLabel + '}}</span>' +
                    '<input data-ng-model="' + treeId + '.checkBoxModel[node.' + nodeId + ']" style="float: right" type="checkbox" data-ng-click="' + treeId + '.selectNodeLabel(node);$event.stopPropagation()">' +
                    '<p>{{treeId}}</p>' +
                    '<div data-angular-treeview="true"  data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' +
                    '</li>' +
                    '</ul>';


                //check tree id, tree model
                if (treeId && treeModel) {

                    //root node
                    if (attrs.angularTreeview) {

                        //create tree object if not exists
                        scope[treeId] = scope[treeId] || {};

                        scope[treeId].checkedList = []

                        scope[treeId].checkBoxModel = {}

                        //if node head clicks,
                        scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function(selectedNode) {

                            //Collapse or Expand
                            selectedNode.collapsed = !selectedNode.collapsed;
                        };

                        //if node label clicks,

                        scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function(selectedNode) {

                            console.log('selectnod.roleid--->', selectedNode);

                            if (!scope[treeId].checkBoxModel[selectedNode.roleId]) {
                                var index = scope[treeId].checkedList.indexOf(selectedNode.roleId)
                                scope[treeId].checkedList.splice(index, 1)
                                console.log(selectedNode.children)
                                scope[treeId].disSelectAllChk(selectedNode.children)

                                // 当某一分组全选，取消子组选项的同时，取消全选
                                scope[treeId].cancelAllSelect(selectedNode)
                            } else {
                                scope[treeId].checkedList.push(selectedNode.roleId);
                                scope[treeId].selectAllChk(selectedNode.children);

                                // 当子分组全部选中时，父分组选中
                                scope[treeId].selectFather(selectedNode)
                                console.log('222===>', scope[treeId].checkBoxModel);
                            }

                            console.log(scope[treeId].checkedList);
                        };

                        // 全选本分组下面的所有分组
                        scope[treeId].selectAllChk = scope[treeId].selectAllChk || function(children) {
                            for (var child of children) {
                                console.log('child--->', child);
                                if (!scope[treeId].checkedList.includes(child.roleId)) {
                                    scope[treeId].checkedList.push(child.roleId)
                                }
                                scope[treeId].checkBoxModel[child.roleId] = true
                                scope[treeId].selectAllChk(child.children)
                            }
                        }

                        // 取消本分组下的所有分组
                        scope[treeId].disSelectAllChk = scope[treeId].disSelectAllChk || function(children) {
                            for (var child of children) {
                                console.log('child--->', child);
                                var index = scope[treeId].checkedList.indexOf(child.roleId)
                                if (index != -1) {
                                    scope[treeId].checkedList.splice(index, 1)
                                }
                                scope[treeId].checkBoxModel[child.roleId] = false
                                scope[treeId].disSelectAllChk(child.children)
                            }
                        }


                        scope[treeId].cancelAllSelect = scope[treeId].cancelAllSelect || function(selectedNode) {
                            console.log('123123123--->', selectedNode);
                            if (selectedNode.parentIds) {
                                for (var id of selectedNode.parentIds) {
                                    scope[treeId].checkBoxModel[id] = false
                                    var index = scope[treeId].checkedList.indexOf(id)
                                    if (index != -1) {
                                        scope[treeId].checkedList.splice(index, 1)
                                    }
                                }
                            }
                        }

                        scope[treeId].selectFather = scope[treeId].selectFather || function(selectedNode) {

                            //递归向上检查
                            if
                        }


                    }

                    //Rendering template.
                    element.html('').append($compile(template)(scope));
                }
            }
        };
    }]);
})(angular);