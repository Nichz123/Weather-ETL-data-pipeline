import './form.css'

export default function Form() {
    return (
        <form id="city-form">
            <label>City:<br/>
            <input type="text" id="fcity" name="fcity" /></label><br/>
            <label>State Code:<br/>
            <input type="text" id="fstate" name="fstate" /></label><br/>
            <label>Country Code:<br/>
            <input type="text" id="fcountry" name="fcountry" /></label><br/>
        </form>
    )
}