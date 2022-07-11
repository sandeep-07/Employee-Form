const form=document.getElementById('employee-form')
const fname=document.getElementById('fname') //first name
const lname=document.getElementById('lname') //last name
const male=document.getElementById("male")   //Male
const female=document.getElementById("female")  //Female
const married=document.getElementById("married")    //Married
const unmarried=document.getElementById("unmarried")    //Unmarried
const spname=document.getElementById('spname')      //spouse name
let foccussed=false;

//we are using generic names everywhere but in error we should display corresponding names
const mapping={
    lname:"Last Name",
    spname:'Spouse Name',
    fname:'First Name'
}


married.addEventListener('change',(e)=>{
    //if not married spouse name field should be disabled
    spname.disabled=false
})
unmarried.addEventListener('change',(e)=>{
    spname.disabled=true
    const spname_error=document.querySelector('.spname_error')
    spname.value=""
    spname_error.classList.remove('display-error')
})

function showError(errorElement,errorMessage){
    document.querySelector("."+errorElement).classList.add("display-error");
    document.querySelector("."+errorElement).innerHTML=errorMessage;
}
function clearError(){
    let errors=document.querySelectorAll('.error')
    for(let error of errors){
        error.classList.remove('display-error');
    }
}
function checkError(field){
    
    if(field.value===""){
        if(!foccussed)
        {
            field.focus();
        }
        showError(`${field.name}_error`,`Please enter ${mapping[field.name]}`)
        foccussed=true
    }

}

function removeErrorIfValueIsNotNull(field){
    const field_error=document.getElementsByClassName(`${field}_error`)[0]
    if(field.value!=="")
    {
        field_error.classList.remove('display-error')
    }
}
fname.addEventListener('input',(e)=>{ 
    removeErrorIfValueIsNotNull('fname')
})
lname.addEventListener('input',(e)=>{
    removeErrorIfValueIsNotNull('lname')
})
if(married.checked){
    spname.addEventListener('input',(e)=>{
        
        removeErrorIfValueIsNotNull('spname')
    })
}
form.addEventListener('submit',(event)=>{
    //on submission no field should be focussed if all is well
    foccussed=false
    event.preventDefault()

    //all errors should be cleared
    clearError()
    
    //push all fields in an array to check errors
    //this is done to increase code reusability
    const fields=[fname,lname]
    if(married.checked)
    fields.push(spname)

    for(let field of fields){
        //checking error of each field
        checkError(field)
    }
    
    //if we get no errors a thankyou message is shown
    if(!foccussed){
        document.querySelector(".success").classList.add('display-success');
        document.querySelector(".success").innerHTML="Thank You"

        setTimeout(()=>{
            document.querySelector(".success").classList.remove('display-success');
            document.querySelector(".success").innerHTML=""
        },2500)
    }

})
form.addEventListener('reset',(e)=>{
    form.reset();
    document.querySelector(".success").classList.remove('display-success');
    document.querySelector(".success").innerHTML=""
    clearError()
})