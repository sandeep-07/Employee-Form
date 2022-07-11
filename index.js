const form=document.getElementById('employee-form')
const formElements=document.querySelectorAll('#employee-form input')
const fname=document.getElementById('fname') //first name
const lname=document.getElementById('lname') //last name
const male=document.getElementById("male")   //Male
const female=document.getElementById("female")  //Female
const married=document.getElementById("married")    //Married
const unmarried=document.getElementById("unmarried")    //Unmarried
const spname=document.getElementById('spname')      //sppuse name

let foccussed=false;
const mapping={
    lname:"Last Name",
    spname:'Spouse Name',
    fname:'First Name'

}
married.addEventListener('change',(e)=>{
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

form.addEventListener('submit',(event)=>{
    foccussed=false
    event.preventDefault()
    clearError()
    const fields=[fname,lname]
    if(married.checked)
    fields.push(spname)

    for(let field of fields){
        checkError(field)
    }
    
    if(!foccussed){
        document.querySelector(".success").classList.add('display-success');
        document.querySelector(".success").innerHTML="Thank You"
    }

})
form.addEventListener('reset',(e)=>{
    form.reset();
    document.querySelector(".success").classList.remove('display-success');
    document.querySelector(".success").innerHTML=""
    clearError()
})