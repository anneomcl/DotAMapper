'use strict';

/* Controllers */
var result = []
var matchAPI = "http://limitless-falls-1957.herokuapp.com/match/";

angular.module('myApp.controllers', []).
controller('VisualCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
        $scope.data = [
            ['Vote']
        ]
        addMatch($rootScope.matchID);
        $scope.matchID = "";

        $scope.addMacth = function() {
            if ($scope.matchID == "") {
                return;
            } else {
                addMatch($scope.matchID);
                $scope.matchID = "";
            }
        }

        function addMatch(id) {
            $http.get(matchAPI + id)
                .then(function(res) {
                    var result = res.data.result;
                    var votes = result.positive_votes - result.negative_votes;
                    var players = result.players;

                    $scope.data[0].push("" + id);
                    for (var i = 1; i < $scope.data.length; i++) {
                        $scope.data[i].push(null);
                    }

                    for (var i in players) {
                        var temp = [votes]
                        for (var j = 0; j < $scope.data[0].length - 2; j++) {
                            temp.push(null);
                        }
                        temp.push(players[i].kills - players[i].deaths);
                        $scope.data.push(temp)
                    }

                    var d = google.visualization.arrayToDataTable($scope.data);
                    var options = {
                        hAxis: {
                            title: 'Votes',
                            minValue: -15,
                            maxValue: 15,
                            gridlines: {
                                color: 'transparent'
                            }
                        },
                        vAxis: {
                            title: 'Kill/Death',
                            minValue: -15,
                            maxValue: 15,
                            gridlines: {
                                color: 'transparent'
                            }
                        },
                        height: 600
                    };

                    var chart = new google.visualization.ScatterChart(document.getElementById('visualization'));

                    chart.draw(d, options);
                });
        }
    }
])
    .controller('MainCtrl', ['$scope', '$rootScope', '$location',
        function($scope, $rootScope, $location) {
            $scope.visualize = function() {
                $rootScope.matchID = $scope.matchID;
                $location.path("visualization");
            }
        }
    ]);