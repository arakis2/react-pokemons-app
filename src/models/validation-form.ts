import Form from "../helpers/form-form-property";

export default class ValidationForm{
    form: Form;
    isValid: boolean | undefined

    constructor(form: Form, isValid: boolean | undefined){
        this.form = form;
        this.isValid = isValid
    }
}