// User Class
var User = function (name, mobile, email, gender) {
    this.name = name;
    this.mobile = mobile;
    this.email = email;
    this.gender = gender;
}
function adduser(name, mobile, email, gender) {
    var u = new User(name, mobile, email, gender)
    users.push(u);
    return u;
}

User.prototype.displayName = function () {
    return this.name;
}
User.prototype.displayGender = function () {
    return this.gender;
}

User.prototype.displayPhone = function () {
    return this.mobile;
}
User.prototype.displayEmail = function () {
    return this.email;
}

// Global Variables
var mode;
var viewIndex;
var users = [];

// Adding User
function addNewUser() {
    var name1 = $("#name").val();
    var mobile1 = $("#mobile").val();
    var email1 = $("#email").val();
    var gender1;
    if (document.getElementById("genderMale").checked) {
        gender1 = "Male";
    } else {
        gender1 = "Female";
    }
    return adduser(name1, mobile1, email1, gender1);

}
function addContact(){
    mode="newContact";
    displayList();
    reset();
    $.mobile.changePage('#homepage');
    return false;
}
// Reseting Input Fields on Submitting New User
function reset() {

    $("#name").val("");
    $("#email").val("");
    $("#mobile").val("");
    $("#genderFemale").removeAttr("checked");
    $("#genderMale").removeAttr("checked");
    document.getElementById("genderMale").checked=true;
    $("input[type='radio']").checkboxradio("refresh");
}
// Displaying List in Home Page
function displayList() {
    $("#ListElement").html(userList()).listview().listview('refresh');
       return $("#ListElement");

}
// Updating User List (Add/Edit/Delete)
function userList() {
    if (mode=="newContact") {
        addNewUser();    
    }
    
    var i=0, list = "";
    for (i = 0; i < users.length; i++) {
        if (users[i].displayGender() == "Female") { list += "<li onclick='viewContact("+i+")'><a href='#thirdpage'><img src='img/female.png' alt=''>" + users[i].displayName() + "<a href='tel:"+users[i].mobile+"'data-rel='popup' data-position-to='window' data-transition='pop'>Call</a></a></li>"; }
        else { list += "<li onclick='viewContact("+i+")'><a href='#thirdpage'><img src='img/male.png' alt=''>" + users[i].displayName() +"<a href='tel:"+users[i].mobile+"'data-rel='popup' data-position-to='window' data-transition='pop'>Call</a></a></li>"; }
    }

    return list;
}
// Filling The Contact Profile Page
function viewContact(i){    
   var viewPage = document.getElementById("viewContactImage");
   viewIndex = i;

   if (users[i].displayGender()=="Female") {
          
            viewPage.innerHTML = "<img src='img/female.png' style='height: 50%; ; width: 50%;'>"
    
   } else {
    viewPage.innerHTML = "<img src='img/male.png' style='height: 50%; ; width: 50%;'>"
   }

   $("#viewName").val(users[i].displayName());
   $("#viewPhone").val(users[i].displayPhone());
   $("#viewEmail").val(users[i].displayEmail())
   $("#viewGender").val(users[i].displayGender());
   // Adding Number To Phone Button In Contact Profile Page
   $("#viewPhoneButton").attr("href","tel:"+users[i].displayPhone());
}
// Editing Function To Edit Button In Contact Profile Page
function removeRead(){
    $("#viewName").removeAttr("readOnly");
    $("#viewPhone").removeAttr("readOnly");
    $("#viewEmail").removeAttr("readOnly");
    $("#editSubmit").attr("type","submit");
    $("#editCancel").attr("type","button");
}
function editContact(){
    removeRead();
}
// Adding Function To Hidden (Save/Cancel) Button In Contact Profile Page
// Save Button Function On Submit
function addRead(){
    $("#viewName").attr("readOnly",true);
    $("#viewPhone").attr("readOnly",true);
    $("#viewEmail").attr("readOnly",true);
}
$("#editForm").submit(function(){
    users[viewIndex].name =$("#viewName").val();
    users[viewIndex].mobile =$("#viewPhone").val();
    users[viewIndex].email =$("#viewEmail").val();
    addRead();
    mode='editContact';
    $("#editSubmit").attr("type","hidden");
    $("#editCancel").attr("type","hidden");
    viewContact(viewIndex);
    displayList();
    
});
// Cancel Button Function On Click
$("#editCancel").click(function(){
    addRead();
    $("#editSubmit").attr("type","hidden");
    $("#editCancel").attr("type","hidden");
    viewContact(viewIndex);
});
// Side Function For Deleting Object For Current Index For Delte Button
function arrayObjectDelete(index){
    let temp = [];
    for(let i = 0; i<users.length;i++)
    {
        if (users[i]==users[index]) {
            
        } else {
            temp.push(users[i]);
        }
    }
    users = new Array();
    users = temp;
}
// Delete Function On Click Delete Button
function deleteContact(){
    var name = users[viewIndex].name;
    if(confirm("Do You Want To Delete "+name+"?")){
        mode="deleteUser";
        
        arrayObjectDelete(viewIndex);
        displayList();
        
        $.mobile.changePage('#homepage');
        alert(name+ " Got Deleted Sucessfully.");
    }else{
        alert("Deletion Was Canceled.");
    }
}