var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    debugger;
    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {
            $scope.Employe = {};
            $scope.Employe.FirstName = $scope.EmpFirstName;
            $scope.Employe.LastName = $scope.EmpLastName;
            $scope.Employe.Gender = $scope.EmpGender;
            $scope.Employe.Salary = $scope.EmpSalary;
            $http({
                method: "post",
                url: "https://localhost:44391/Employee/Insert_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.EmpFirstName = "";
                $scope.EmpLastName = "";
                $scope.EmpGender = "";
                $scope.EmpSalary = "";
            })
        } else {
            $scope.Employe = {};
            $scope.Employe.FirstName = $scope.EmpFirstName;
            $scope.Employe.LastName = $scope.EmpLastName;
            $scope.Employe.Gender = $scope.EmpGender;
            $scope.Employe.Salary = $scope.EmpSalary;
            $scope.Employe.ID = document.getElementById("EmpID_").value;
            $http({
                method: "post",
                url: "https://localhost:44391/Employee/Update_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.EmpFirstName = "";
                $scope.EmpLastName = "";
                $scope.EmpGender = "";
                $scope.EmpSalary = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Employee";
            })
        }
    }
    $scope.GetAllData = function () {
        $http({
            method: "get",
            url: "https://localhost:44391/Employee/Get_AllEmployee"
        }).then(function (response) {
            $scope.employees = response.data;
        }, function () {
            alert("Error Occur");
        })
    };
    $scope.DeleteEmp = function (Emp) {
        $http({
            method: "post",
            url: "https://localhost:44391/Employee/Delete_Employee",
            datatype: "json",
            data: JSON.stringify(Emp)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };
    $scope.UpdateEmp = function (Emp) {
        document.getElementById("EmpID_").value = Emp.ID;
        $scope.EmpFirstName = Emp.FirstName;
        $scope.EmpLastName = Emp.LastName;
        $scope.EmpGender = Emp.Gender;
        $scope.EmpSalary = Emp.Salary;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
        document.getElementById("spn").innerHTML = "Update Employee Information";
    }
})  