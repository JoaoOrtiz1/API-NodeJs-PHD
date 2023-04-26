'use stric'

let errors =[];

function ValidationContract(){
    errors = [];
}

ValidationContract.prototype.isRequired = (value, message) =>{
    if(!value || value.length <= 0)
        errors.push({message: message});
}

ValidationContract.prototype.hasMinLen = (value, min, message) =>{
    if(!value || value.length < min)
        errors.push({message: message});
}

ValidationContract.prototype.hasMinValue = (value, min, message) =>{
    if(value < min)
        errors.push({message: message});
}

ValidationContract.prototype.hasMaxLen = (value, max, message) =>{
    if(!value || value.length > max)
        errors.push({message: message});
}

ValidationContract.prototype.isFixedLen = (value, len, message) =>{
    if(value.length != len)
        errors.push({message: message });
}

ValidationContract.prototype.errors = () =>{
    return errors;
}

ValidationContract.prototype.clear = () =>{
    errors = [];
}

ValidationContract.prototype.isValid = () =>{
    return errors.length == 0;
}

ValidationContract.prototype.isEmail =(value, message) =>{
    var reg = new RegExp(/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if(!reg.test(value)){
        errors.push({ message: message});
    }
}

ValidationContract.prototype.validationsProduct= (val,res)=>{
    let contract = new ValidationContract;
    contract.hasMinLen(val.title, 3, "O titulo deve conter pelo menos 3 caracteres"); // serve so para o titulo
    contract.hasMinLen(val.slug, 3, "O slug deve conter pelo menos 3 caracteres");
    contract.hasMinLen(val.description, 3, "O a descrição deve conter pelo menos 3 caracteres")
    contract.hasMinValue(val.price, 1, "O preço não pode ser 0"); 
    // verif dos dados
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return 1;
    }
    return 0;
}

ValidationContract.prototype.validationsCustomer= (val,res)=>{
    let contract = new ValidationContract;
    contract.hasMinLen(val.name, 3, "O nome deve conter pelo menos 3 caracteres"); // serve so para o titulo
    contract.isEmail(val.email, "E-mail invalido");
    contract.hasMinLen(val.password, 6, "A senha deve conter pelo menos 6 caracteres");
    // verif dos dados
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return 1;
    }
    return 0;
}

ValidationContract.prototype.validationsOrder= (val,res, data)=>{
    let contract = new ValidationContract;
    contract.isRequired(data.id,"O nome do cliente é obrigatório");
    // verif dos dados
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return 1;
    }
    return 0;
}

ValidationContract.prototype.validationsCustomerAuth= (val,res)=>{
    let contract = new ValidationContract;
    contract.isEmail(val.email, "E-mail invalido");
    contract.hasMinLen(val.password, 6, "A senha deve conter pelo menos 6 caracteres");
    // verif dos dados
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return 1;
    }
    return 0;
}

module.exports = ValidationContract;