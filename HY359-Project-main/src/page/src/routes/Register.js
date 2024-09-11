import React from "react";
import {Link} from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    var name;
    var password;
    var email;
    var fname;
    var lname;
    var bday;
    var gender;
    var country;
    var city;
    var address;
    var student_type;
    var student_id;
    var student_id_from_date;
    var student_id_to_date;
    var university;
    var department;
    var telephone;
    var personalpage;

    //Getting the information of each user
    function get(){
        name = document.getElementById("username").value;
        password = document.getElementById("password1").value;
        email = document.getElementById("email").value;
        fname = document.getElementById("name").value;
        lname = document.getElementById("surname").value;
        bday = document.getElementById("start").value;
        gender = document.getElementsByName("gender").value;
        country = document.getElementById("country").value;
        city = document.getElementById("town").value;
        address = document.getElementById("address").value;
        student_type = document.getElementsByName("student_type").value;
        student_id = document.getElementById("pass").value;
        student_id_from_date = document.getElementById("start1").value;
        student_id_to_date = document.getElementById("start2").value;
        university = document.getElementsByName("university").value;
        department = document.getElementById("institution").value;
        telephone = document.getElementById("phonenumber").value;
        personalpage = document.getElementById("url").value;

        //window.alert(telephone);
        //window.alert(password);
        
    } 



    //Validate the Passwords
    function validate(){
        var temp = 0;//Medium Password

        //Collect Data from input
        var pw1 = document.getElementById("password1").value;
        var pw2 = document.getElementById("password2").value;

        //Check if password1 != password2
        if(pw1 != pw2){
            document.getElementById("message2").innerHTML = "Passwords don't match!";
            return false;
        }
        //Check if password != "helmepa","uoc","tuc"
        var text = document.getElementById("password1").value;
        //Not valid inputs
        var nvalid1 = text.search("helmepa");
        var nvalid2 = text.search("uoc");
        var nvalid3 = text.search("tuc");

        if(nvalid1 != -1 || nvalid2 != -1 ||nvalid3 != -1){
            document.getElementById("message2").innerHTML = "You can't use 'uoc' 'helmepa' nor 'tuc' in your password!";
            return false;
        }

        //Check if the password is weak
        var count=0;
        for(var i=0;i<text.length;i++){
            for(var j=0;j<10;j++){
                if(text.charAt(i)==j){
                    count = count + 1;
                }
            }
        }
        if(count >= text.length/2){
            document.getElementById("message2").innerHTML = "Weak Password";
            temp = 1;
            return false;
        }
        temp = 0;
        //Check if the password is strong 
        count =0;
        var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
        if (pattern.test(text)) {
            temp = 1;
            document.getElementById("message2").innerHTML = "Strong Password";
        }
       for(i=0;i<text.length;i++){
            if(text.charAt(i) === "!" || text.charAt(i) === "@" || text.charAt(i) === "#" || text.charAt(i) === "$" || text.charAt(i) === "%" || text.charAt(i) === "^" || text.charAt(i) === "&" || text.charAt(i) === "*"){
                count = count + 1;
            }
       }
       if(count >=2){
        document.getElementById("message2").innerHTML = "Strong Password";
        temp = 1;
       }
       if(temp == 0){
        document.getElementById("message2").innerHTML = "Medium Password";
       }
    }
    //Checkbox "show password"
    
    function ShowPassword(){
        var x = document.getElementById("password1");
        var y = document.getElementById("password2");
        if(x.type === "password" || y.type === "password"){
            x.type = "text";
            y.type = "text";
        }else{
            x.type = "password";
            y.type = "password";
        }  
         
    }
    //Changing the email format
    function StudentShow(id){
        if(id === "helmepa"){
            document.getElementById("email").pattern="[a-z0-9._%+-]+@helmepa.gr";
            document.getElementById("message3").innerHTML = "Please change your e-mail to @helmepa.gr";
            return false;
        }else if(id === "uoc"){
            document.getElementById("email").pattern="[a-z0-9._%+-]+@uoc.gr";
            document.getElementById("message3").innerHTML = "Please change your e-mail to @uoc.gr";
            return false;
        }else if(id === "tuc"){
            document.getElementById("email").pattern="[a-z0-9._%+-]+@tuc.gr";
            document.getElementById("message3").innerHTML = "Please change your e-mail to @tuc.gr";
            return false;
        }
    }
/*
    ,function Pass(id){
        if(id === "undergraduate"){
            if(document.getElementById("start2").value - document.getElementById("start1").value <= 6){
                document.getElementById("message4").innerHTML = "Invalid pass information (6 years max)"
                return false;
            }else{
                document.getElementById("message4").innerHTML = "BAE"
                return false;
            }
        }else if(id === "postgraduate"){

        }else if(id === "PHD"){

        }
        
    }
*/
    function Cstudent(){
        //Requirements for Cstudent
        document.getElementById("pass").required = true;
        document.getElementById("undergraduate").required = true;
        document.getElementById("institution").required = true;
        document.getElementById("start1").required = true;
        document.getElementById("start2").required = true;
        document.getElementById("uoc").required = true;

        document.getElementById("undergraduate").style.visibility="visible";
        document.getElementById("postgraduate").style.visibility="visible";
        document.getElementById("PHD").style.visibility="visible";
        document.getElementById("typeofstudent").style.visibility="visible";
        document.getElementById("typeofstudentu").style.visibility="visible";
        document.getElementById("typeofstudentp").style.visibility="visible";
        document.getElementById("typeofstudentP").style.visibility="visible";
        
        document.getElementById("pass").style.visibility="visible";
        document.getElementById("passn").style.visibility="visible";
        document.getElementById("dop").style.visibility="visible";
        document.getElementById("start1").style.visibility="visible";
        document.getElementById("ped").style.visibility="visible";
        document.getElementById("start2").style.visibility="visible";

        document.getElementById("univ").style.visibility="visible";
        document.getElementById("uoc").style.visibility="visible";
        document.getElementById("helmepa").style.visibility="visible";
        document.getElementById("tuc").style.visibility="visible";
        document.getElementById("univh").style.visibility="visible";
        document.getElementById("univu").style.visibility="visible";
        document.getElementById("univt").style.visibility="visible";

        document.getElementById("Cs").style.visibility="visible";

        document.getElementById("inst").style.visibility="visible";
        document.getElementById("institution").style.visibility="visible";
    }

    function Librarian(){
        //The required fields of College Students are not required anymore
        document.getElementById("pass").required = false;
        document.getElementById("undergraduate").required = false;
        document.getElementById("institution").required = false;
        document.getElementById("start1").required = false;
        document.getElementById("start2").required = false;
        document.getElementById("uoc").required = false;
        //Hide the Cs fields
        document.getElementById("undergraduate").style.visibility="hidden";
        document.getElementById("postgraduate").style.visibility="hidden";
        document.getElementById("PHD").style.visibility="hidden";
        document.getElementById("typeofstudent").style.visibility="hidden";
        document.getElementById("typeofstudentu").style.visibility="hidden";
        document.getElementById("typeofstudentp").style.visibility="hidden";
        document.getElementById("typeofstudentP").style.visibility="hidden";
        
        document.getElementById("pass").style.visibility="hidden";
        document.getElementById("passn").style.visibility="hidden";
        document.getElementById("dop").style.visibility="hidden";
        document.getElementById("start1").style.visibility="hidden";
        document.getElementById("ped").style.visibility="hidden";
        document.getElementById("start2").style.visibility="hidden";

        document.getElementById("univ").style.visibility="hidden";
        document.getElementById("uoc").style.visibility="hidden";
        document.getElementById("helmepa").style.visibility="hidden";
        document.getElementById("tuc").style.visibility="hidden";
        document.getElementById("univh").style.visibility="hidden";
        document.getElementById("univu").style.visibility="hidden";
        document.getElementById("univt").style.visibility="hidden";

        document.getElementById("Cs").style.visibility="hidden";

        document.getElementById("inst").style.visibility="hidden";
        document.getElementById("institution").style.visibility="hidden";
    }
return(
    
    <div>
        <h1>Please SignUp</h1>
        <Link to="/">
            <button>Home</button><br></br><br></br>
        </Link>
    <form onSubmit={(data) =>{
        console.log(data)
            validate();Cstudent();get();
            console.log("hello")
            axios.post('http://localhost:3000/signup', {
              username: name,
              password: password
            })
            .then(function (response) {
              console.log(response.data);
              //if signed in redirect to home page,else back to sign up
            })
            .catch(function (error) {
              console.log(error.response);
            });}} action="http://localhost:3000/">
        <div class="fix">
            
            {/*Username*/}
            
            <label for="username">Username:</label><br></br>
            <input type="text" id="username" name="username"required
            pattern="[A-Za-z].{7,}" title="The username must contain at least 8 characters"/><br></br><br></br>

            {/*E-mail*/}
            <label for="email">E-mail:</label><br></br>
            <input type="email" id="email" name="email"required placeholder="example@gmail.com" 
            pattern="[a-z0-9._%+-]+@gmail.com" title="Example@gmail.com"/>
            <span id = "message3"></span><br></br><br></br>

            {/*Password*/}
            <label for="password">Password:</label><br></br>
            <input type="password" id="password1" name="password"required  onChange={() =>{validate()}}
            pattern="(?=.*\d)(?=.*[A-Za-z])(?=.*[.!@#$%^&*]).{8,12}" title="Must contain at least one number, one letter, one symbol (!@#$%^&*) and at least 8 to 12 characters."/><br></br><br></br>

            {/*Confirm Password*/}
            <label for="password">Confirm Password:</label><br></br>
            <input type="password" id="password2" name="password"required  onChange={() =>{validate()}}
            pattern="(?=.*\d)(?=.*[A-Za-z])(?=.*[.!@#$%^&*]).{8,12}" title="Must contain at least one number, one letter, one symbol (!@#$%^&*) and at least 8 to 12 characters."/>
            <span id = "message2"></span><br></br><br></br>

            <input type="checkbox" onClick={() =>{ShowPassword()}}/>Show Password<br></br><br></br>
        
            {/*Name*/}
            <label for="name">Name:</label><br></br>
            <input type="text" id="name" name="firstname"required placeholder="3-30 characters"
            pattern=".{3,30}" title="3-30 characters"/><br></br><br></br>
        
            {/*Surname*/}
            <label for="surname">Surname:</label><br></br>
            <input type="text" id="surname" name="lastname"required placeholder="3-30 characters"
            pattern=".{3,30}" title="3-30 characters"/><br></br><br></br>

            {/*Date Of Birth*/}
            <label for="start">Date Of Birth:</label><br></br>
            <input type="date" id="start" name="birthdate"required
                
                min="1920-01-01" max="2006-12-31"/>
                <br></br>
                <br></br>

            {/*Gender*/}
            <label for="gender">Gender:</label><br></br>
            <input type="radio" id="male" name="gender" value="male"required/>
            <label for="male">Male</label><br></br>
            <input type="radio" id="female" name="gender" value="female"required/>
            <label for="female">Female</label><br></br>
            <input type="radio" id="other" name="gender" value="other"required/>
            <label for="other">Other</label>
            <br></br>
            <br></br>
            
           {/*Type Of User*/}
           <label for="type">Type of user:</label><br></br>
            <input type="radio" id="student" name="type" value="student"required onClick={() =>{Cstudent()}}/>
            <label for="student">College Student</label><br></br>
            <input type="radio" id="librarian" name="type" value="librarian"required onClick={() =>{Librarian()}}/>
            <label for="librarian">Librarian</label>
            <br></br>
            <br></br>
            
            <p id ="Cs">If you answered "College Student" above<br></br>please answer the following:</p><br></br>
            
            {/*Type Of Student*/}
            <label id="typeofstudent" for="typeofstudent">Type of College Student:</label><br></br>
            <input type="radio" id="undergraduate" name="student_type" value="undergraduate" onchange="Pass(id)"/>
            <label id="typeofstudentu" for="undergraduate">Undergraduate</label><br></br>
            <input type="radio" id="postgraduate" name="student_type" value="postgraduate" onchange="Pass(id)"/>
            <label id="typeofstudentp" for="postgraduate">Postgraduate</label><br></br>
            <input type="radio" id="PHD" name="student_type" value="PHD" onchange="Pass(id)"/>
            <label id="typeofstudentP" for="PHD">PHD</label>
            <br></br>
            <br></br>

            {/*Number Of Pass*/}
            <label id = "passn" for="pass">Pass Number:</label><br></br>
            <input type="text" id="pass" name="student_id" placeholder="12 digit number"
            pattern="[0-9].{11}" title="12-digit number"/><br></br>

            {/*Date Of Pass*/}
            <label id = "dop" for="start">Pass valid from:</label><br></br>
            <input type="date" id="start1" name="student_id_from_date" />
                <br></br>
                <br></br>

            {/*Pass Expiration Date*/}
            <label id ="ped" for="start">Pass Expiration Date:</label><br></br>
            <input type="date" id="start2" name="student_id_to_date"
                min="2023-01-01" max="2030-01-01"/>
                <span id = "message4"></span>
                <br></br>
                <br></br>
        
            {/*University*/}
            <label id = "univ" for="university">University:</label><br></br>
            <input type="radio" id="uoc" name="university" value="uoc" onchange="StudentShow(id)"/>
            <label id ="univu"for="uoc">UOC</label><br></br>
            <input type="radio" id="helmepa" name="university" value="helmepa" onchange="StudentShow(id)"/>
            <label id = "univh" for="helmepa">HELMEPA</label><br></br>
            <input type="radio" id="tuc" name="university" value="tuc" onchange="StudentShow(id)"/>
            <label id = "univt" for="tuc">TUC</label>
            <br></br>
            <br></br>
        
            {/*Institution*/}
            <label id = "inst" for="institution">Institution:</label><br></br>
            <input type="text" id="institution" name="department"
            pattern="[A-Za-z].{2,50}" title="3-50 characters(alphabetical)"/><br></br><br></br>
            {/*Account*/}
            <label for="url">Personal Page:</label><br></br>
            <input type="url" id="url" name="personalpage"/><br></br><br></br>
            {/*Country*/}
            <p>Country:</p>
            <select id="country" name="country">
                <option>Greece</option>
                <option value="AF">Afghanistan</option>
                <option value="AX">Aland Islands</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">American Samoa</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AI">Anguilla</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BM">Bermuda</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia</option>
                <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BV">Bouvet Island</option>
                <option value="BR">Brazil</option>
                <option value="IO">British Indian Ocean Territory</option>
                <option value="BN">Brunei Darussalam</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon</option>
                <option value="CA">Canada</option>
                <option value="CV">Cape Verde</option>
                <option value="KY">Cayman Islands</option>
                <option value="CF">Central African Republic</option>
                <option value="TD">Chad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Christmas Island</option>
                <option value="CC">Cocos (Keeling) Islands</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CG">Congo</option>
                <option value="CD">Congo, Democratic Republic of the Congo</option>
                <option value="CK">Cook Islands</option>
                <option value="CR">Costa Rica</option>
                <option value="CI">Cote D'Ivoire</option>
                <option value="HR">Croatia</option>
                <option value="CU">Cuba</option>
                <option value="CW">Curacao</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="ET">Ethiopia</option>
                <option value="FK">Falkland Islands (Malvinas)</option>
                <option value="FO">Faroe Islands</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="GF">French Guiana</option>
                <option value="PF">French Polynesia</option>
                <option value="TF">French Southern Territories</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GR">Greece</option>
                <option value="GL">Greenland</option>
                <option value="GD">Grenada</option>
                <option value="GP">Guadeloupe</option>
                <option value="GU">Guam</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HM">Heard Island and Mcdonald Islands</option>
                <option value="VA">Holy See (Vatican City State)</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IR">Iran, Islamic Republic of</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IM">Isle of Man</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JE">Jersey</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="KP">Korea, Democratic People's Republic of</option>
                <option value="KR">Korea, Republic of</option>
                <option value="XK">Kosovo</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Lao People's Democratic Republic</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libyan Arab Jamahiriya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MO">Macao</option>
                <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MQ">Martinique</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia, Federated States of</option>
                <option value="MD">Moldova, Republic of</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="AN">Netherlands Antilles</option>
                <option value="NC">New Caledonia</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NU">Niue</option>
                <option value="NF">Norfolk Island</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Palestinian Territory, Occupied</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PN">Pitcairn</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="RE">Reunion</option>
                <option value="RO">Romania</option>
                <option value="RU">Russian Federation</option>
                <option value="RW">Rwanda</option>
                <option value="BL">Saint Barthelemy</option>
                <option value="SH">Saint Helena</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="MF">Saint Martin</option>
                <option value="PM">Saint Pierre and Miquelon</option>
                <option value="VC">Saint Vincent and the Grenadines</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">Sao Tome and Principe</option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="CS">Serbia and Montenegro</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SX">Sint Maarten</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="GS">South Georgia and the South Sandwich Islands</option>
                <option value="SS">South Sudan</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="SD">Sudan</option>
                <option value="SR">Suriname</option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SZ">Swaziland</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="SY">Syrian Arab Republic</option>
                <option value="TW">Taiwan, Province of China</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania, United Republic of</option>
                <option value="TH">Thailand</option>
                <option value="TL">Timor-Leste</option>
                <option value="TG">Togo</option>
                <option value="TK">Tokelau</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UM">United States Minor Outlying Islands</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VE">Venezuela</option>
                <option value="VN">Viet Nam</option>
                <option value="VG">Virgin Islands, British</option>
                <option value="VI">Virgin Islands, U.s.</option>
                <option value="WF">Wallis and Futuna</option>
                <option value="EH">Western Sahara</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
            </select><br></br><br></br>
            {/*Town*/}
            <label for="town">Town:</label><br></br>
            <input type="text" id="town" name="city"
            pattern=".{3,50}" title="Limited to 3-50 characters"/><br></br><br></br>

            {/*Address*/}
            <label id = "Address" for="address">Address:</label><br></br>
            <input type="text" id="address" name="address" 
            pattern="[A-Za-z0-9].{4,50}" title="Limited to 5-50 characters"/><br></br><br></br>
            {/*Telephone*/}
            <label for="phonenumber">Phone Number:</label><br></br>
            <input type="text" id="phonenumber" name="telephone"
            pattern="[0-9].{9,14}" title="Limited to 10-14 digits"/><br></br><br></br>
        
            {/*Terms And Conditions*/}
            <label for="terms">I agree to the terms and conditions</label>
            <input type="checkbox" id="terms" name="terms"required/><br></br>
            
            <input type="submit"  value="Register"/><br></br>
    
        </div>
        
    </form>
    </div>
    
);  
}


