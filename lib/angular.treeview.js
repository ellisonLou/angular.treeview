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

(function ( angular ) {
	'use strict';

	angular.module( 'angularTreeview', [] ).directive( 'treeModel', ['$compile', function( $compile ) {
		return {
			restrict: 'A',
			link: function ( scope, element, attrs ) {
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
							'<input data-ng-model="'+ treeId +'.checkBoxModel[node.'+ nodeId +']" style="float: right" type="checkbox" data-ng-click="' + treeId + '.selectNodeLabel(node)">' +
							'<p>{{treeId}}</p>' +
							'<div data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' +
						'</li>' +
					'</ul>';


				//check tree id, tree model
				if( treeId && treeModel ) {

					//root node
					if( attrs.angularTreeview ) {
					
						//create tree object if not exists
						scope[treeId] = scope[treeId] || {};

						scope[treeId].checkedList = []

						scope[treeId].checkBoxModel = {}

						//if node head clicks,
						scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function( selectedNode ){
							
							//Collapse or Expand
							selectedNode.collapsed = !selectedNode.collapsed;
						};

						//if node label clicks,
						
						scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function( selectedNode ){

							console.log('selectnod.roleid--->', selectedNode);

							if ( !scope[treeId].checkBoxModel[selectedNode.roleId] ) {
								var index = scope[treeId].checkedList.indexOf(selectedNode.roleId)
								scope[treeId].checkedList.splice(index, 1)
								console.log(selectedNode.children)
								console.log('1111===>', scope[treeId].checkBoxModel);
							} else {
								scope[treeId].checkedList.push(selectedNode.roleId);
								scope[treeId].selectAllChk(selectedNode.children)
								console.log('222===>', scope[treeId].checkBoxModel);
							}
							
							console.log(scope[treeId].checkedList);
						};

						scope[treeId].selectAllChk = scope[treeId].selectNodeLabel || function( children ){
							for (child in children) {
								console.log('child--->', children);
								checkBoxModel[child.roleId] = true
								scope[treeId].selectAllChk(children)
							}
						}

					}

					//Rendering template.
					element.html('').append( $compile( template )( scope ) );
				}
			}
		};
	}]);
})( angular );
