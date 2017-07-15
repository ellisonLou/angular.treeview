(function() {

    //angular module
    var myApp = angular.module('myApp', ['angularTreeview']);

    //test controller
    myApp.controller('myController', function($scope) {

        //test tree model 1
        $scope.roleList1 = [{
            "roleName": "全网",
            "roleId": "a1",
            "children": [
                { "roleName": "研发一组", "roleId": "a2", "parentIds": ['a1'], "children": [] },
                {
                    "roleName": "研发二组",
                    "roleId": "a3",
                    "parentIds": ['a1'],
                    "children": [{
                        "roleName": "研发二组-资产部",
                        "roleId": "a4",
                        "parentIds": ["a3", "a1"],
                        "children": [
                            { "roleName": "研发二组-资产部-第一区", "roleId": "a5", "parentIds": ['a1', 'a3', 'a4'], "children": [] },
                            { "roleName": "研发二组-资产部-第二区", "roleId": "a6", "parentIds": ['a1', 'a3', 'a4'], "children": [] }
                        ]
                    }]
                }
            ]
        }];

        //test tree model 2
        $scope.roleList2 = [{
                "roleName": "User",
                "roleId": "role1",
                "children": [
                    { "roleName": "subUser1", "roleId": "role11", "collapsed": true, "children": [] },
                    {
                        "roleName": "subUser2",
                        "roleId": "role12",
                        "collapsed": true,
                        "children": [{
                            "roleName": "subUser2-1",
                            "roleId": "role121",
                            "children": [
                                { "roleName": "subUser2-1-1", "roleId": "role1211", "children": [] },
                                { "roleName": "subUser2-1-2", "roleId": "role1212", "children": [] }
                            ]
                        }]
                    }
                ]
            },

            {
                "roleName": "Admin",
                "roleId": "role2",
                "children": [
                    { "roleName": "subAdmin1", "roleId": "role11", "collapsed": true, "children": [] },
                    {
                        "roleName": "subAdmin2",
                        "roleId": "role12",
                        "children": [{
                            "roleName": "subAdmin2-1",
                            "roleId": "role121",
                            "children": [
                                { "roleName": "subAdmin2-1-1", "roleId": "role1211", "children": [] },
                                { "roleName": "subAdmin2-1-2", "roleId": "role1212", "children": [] }
                            ]
                        }]
                    }
                ]
            },

            {
                "roleName": "Guest",
                "roleId": "role3",
                "children": [
                    { "roleName": "subGuest1", "roleId": "role11", "children": [] },
                    {
                        "roleName": "subGuest2",
                        "roleId": "role12",
                        "collapsed": true,
                        "children": [{
                            "roleName": "subGuest2-1",
                            "roleId": "role121",
                            "children": [
                                { "roleName": "subGuest2-1-1", "roleId": "role1211", "children": [] },
                                { "roleName": "subGuest2-1-2", "roleId": "role1212", "children": [] }
                            ]
                        }]
                    }
                ]
            }
        ];

    });

})();